import { ElementRef, Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsMappers } from './mappers/google-map.mappers';

@Injectable()
export class GoogleMapsService {
  private loader: Loader;
  private isLoaded: boolean = false;

  constructor(private readonly mapper: GoogleMapsMappers) {
    this.loader = new Loader({
      apiKey: 'AIzaSyCaQ0BkzROBMxoLHQZ8wYTMBa_vtp2QT5g',
      version: 'weekly',
      libraries: ['maps'],
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
      mapId: 'HOME_MAP_ID',
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
}
