import { ElementRef, Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';
import { GoogleMapsConstants } from './config/google-maps.config.constants';
import { GoogleMapsMappers } from './mappers/google-map.mappers';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';

@Injectable()
export class GoogleMapsService {
  private loader: Loader;
  private isLoaded: boolean = false;
  private autoCompleteRequest: google.maps.places.Autocomplete;
  private elementToFill: HTMLInputElement;
  private fillPredictionCompleted: boolean = false;
  private fillPredictionAddress: string = '';

  constructor(
    private readonly mapper: GoogleMapsMappers,
  ) {
    this.loader = new Loader({
      apiKey: environment.GCLOUD_API_KEY,
      version: 'weekly',
      libraries: ['maps', 'places'],
    });
  }

  async isLibraryLoaded() {
    if (!this.isLoaded) {
      await this.loader.importLibrary('maps');
      this.isLoaded = true;
    }
  }

  async addMarker(
    map: google.maps.Map,
    position: google.maps.LatLngLiteral,
    title = ''
  ) {
    await this.isLibraryLoaded();

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    return new AdvancedMarkerElement({
      map,
      position,
      title,
    });
  }

  private async createMap(
    center: google.maps.LatLngLiteral,
    domElement: HTMLElement,
    mapTypeControl: boolean = true
  ) {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 18,
      mapId: uuidv4(),
      mapTypeControl,
    };

    return new Map(domElement, mapOptions);
  }

  async createTripMap(
    startPosition: string,
    endPosition: string,
    domElement: ElementRef<HTMLElement>,
    stops?: string[]
  ) {
    await this.isLibraryLoaded();

    if (!startPosition || !endPosition)
      return Promise.reject('Must provide start and end position of the trip');

    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    const mapOptions: google.maps.MapOptions = {
      center: this.mapper.mapToLatLng(endPosition),
      zoom: 18,
      mapId: uuidv4(),
    };

    const map = new Map(domElement.nativeElement, mapOptions);

    this.addMarker(map, this.mapper.mapToLatLng(startPosition));
    this.addMarker(map, this.mapper.mapToLatLng(endPosition));
    const mappedStops = this.mapper.mapStops(stops);
    mappedStops.map((stop) => this.addMarker(map, stop));
    this.traceDirections(
      map,
      this.mapper.mapToLatLng(startPosition),
      this.mapper.mapToLatLng(endPosition),
      mappedStops
    );

    return map;
  }

  async createTripRequestMap(
    endPosition: string,
    domElement: ElementRef<HTMLElement>
  ) {
    await this.isLibraryLoaded();

    if (!endPosition)
      return Promise.reject('Must provide start and end position of the trip');

    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    const mapOptions: google.maps.MapOptions = {
      center: this.mapper.mapToLatLng(endPosition),
      zoom: 18,
      mapId: uuidv4(),
    };

    const map = new Map(domElement.nativeElement, mapOptions);

    this.addMarker(map, this.mapper.mapToLatLng(endPosition));

    return map;
  }

  async traceDirections(
    map: google.maps.Map,
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
    stops?: google.maps.LatLngLiteral[]
  ) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRender = new google.maps.DirectionsRenderer();

    const waypoints = this.mapper.mapToWaypoints(stops);

    const calcRoute = () => {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints,
        },
        (res, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            return directionsRender.setDirections(res);
          }

          console.log(status);
        }
      );
    };
    directionsRender.setMap(map);
    calcRoute();
  }

  createAutoCompleteRequest(
    inputElement: HTMLInputElement
  ): google.maps.places.Autocomplete {
    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: {
        country: 'CL',
      },
      fields: ['address_components', 'geometry', 'formatted_address'],
      types: ['address'],
      strictBounds: false,
    };
    return new google.maps.places.Autocomplete(inputElement, options);
  }

  async autoCompletePlace(inputElement: HTMLInputElement) {
    await this.isLibraryLoaded();
    this.autoCompleteRequest = this.createAutoCompleteRequest(inputElement);
    inputElement.focus();

    const fillAddress = async () => {
      const place = this.autoCompleteRequest.getPlace();

      const dictionary = {
        street_address: {
          value: '',
        },
        street_number: {
          value: '',
        },
        administrative_area_level_1: {
          value: '',
        },
      };

      place.address_components.forEach((component) => {
        const compName: string = component.types[0];
        const compValue = component.long_name;
        if (dictionary[compName as keyof typeof dictionary]) {
          dictionary[compName as keyof typeof dictionary].value = compValue;
        }
      });

      const finalAddress = `${dictionary.street_address.value || ''}${
        dictionary.street_number.value || ''
      }${dictionary.administrative_area_level_1.value || ''}`;
      inputElement.value = finalAddress;
      inputElement.focus();
    };

    inputElement.addEventListener('place_changed', fillAddress);
  }

  async convertPlaceToCoordinates(address: string) {
    if (address.length > 0) {
      console.log(address);
      const geocoder = new google.maps.Geocoder();
      const request = await geocoder.geocode({
        address,
      });
      //TODO: terminar
      request.results.forEach((result) => console.log(result));
    }
  }

  async createPredictionMap(
    mapDomElement: HTMLElement,
    inputDomElement: HTMLInputElement,
    cardDomElement: HTMLElement,
    infoWindowDomElement: HTMLElement,
    store: PassengerStoreService | DriverStoreService,
    tripType?: 'init' | 'end'
  ) {
    const map = await this.createMap(
      this.mapper.mapToLatLng(GoogleMapsConstants.DUOC_COORDS_PLACEHOLDER),
      mapDomElement,
      false
    );
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(cardDomElement);

    const autocomplete = this.createAutoCompleteRequest(inputDomElement);
    autocomplete.bindTo('bounds', map);
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(infoWindowDomElement);

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', () => {
      infoWindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        if(store instanceof PassengerStoreService) {
          store.updateState({
            mapsState: {
              tripBookingDropoff: this.formatCurrentLocation(
                place.geometry.location.lat(),
                place.geometry.location.lng()
              ),
            },
          });
        }
        if(store instanceof DriverStoreService && tripType === 'init') {
          store.updateState({
            ...store.currentState,
            tripBookingPickup: this.formatCurrentLocation(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            ),
          })
        }
        if(store instanceof DriverStoreService && tripType === 'end') {
          store.updateState({
            ...store.currentState,
            tripBookingDropoff: this.formatCurrentLocation(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            ),
          })
        }
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      infoWindowDomElement.children['place-name'].textContent = place.name;
      infoWindowDomElement.children['place-address'].textContent =
        place.formatted_address;
      infoWindow.open(map, marker);
    });
  }

  private formatCurrentLocation = (lat: number, lng: number) => {
    if (!lat && !lng && !isNaN(lat) && !isNaN(lng)) return '';
    return `${lat?.toString?.()},${lng?.toString?.()}` || '';
  };
}
