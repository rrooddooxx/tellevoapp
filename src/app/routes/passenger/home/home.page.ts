import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { IonicModule, NavController } from '@ionic/angular';
import { TabnavComponent } from '../../../components/tabnav/tabnav.component';
import { IPassengerState } from '../../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../../stores/passenger/passenger.service';
import { UserModel } from '../../login/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  public userInfo: UserModel = {} as UserModel;
  public currentState: IPassengerState;

  constructor(
    private readonly router: Router,
    private readonly passengerStore: PassengerStoreService,
    private readonly navCtrl: NavController
  ) {}

  async loadMap() {
    console.log('runs!');
    const loader = new Loader({
      apiKey: 'AIzaSyCaQ0BkzROBMxoLHQZ8wYTMBa_vtp2QT5g',
      version: 'weekly',
      libraries: ['maps'],
    });

    try {
      await loader.importLibrary('maps');

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      const directionsService = new google.maps.DirectionsService();
      const directionsRender = new google.maps.DirectionsRenderer();

      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: -33.033672,
          lng: -71.533049,
        },
        zoom: 18,
        mapId: 'HOME_MAP_ID',
      };

      const map = new Map(
        document.getElementById('mapRender') as HTMLElement,
        mapOptions
      );

      const positionOne: google.maps.LatLngLiteral = {
        lat: -33.033921,
        lng: -71.532663,
      };
      const positionTwo: google.maps.LatLngLiteral = {
        lat: -33.0351322,
        lng: -71.535644,
      };

      const positionThree: google.maps.LatLngLiteral = {
        lat: -33.032745,
        lng: -71.537533,
      };

      const positionFour: google.maps.LatLngLiteral = {
        lat: -33.030303,
        lng: -71.543879,
      };

      const marker = new AdvancedMarkerElement({
        map,
        position: positionOne,
        title: 'Marcadorsito',
      });

      const markerCasa = new AdvancedMarkerElement({
        map,
        position: positionTwo,
        title: 'Marcadorsito',
      });

      const markerParada = new AdvancedMarkerElement({
        map,
        position: positionThree,
        title: 'Parada 1',
      });

      const markerParadaTwo = new AdvancedMarkerElement({
        map,
        position: positionFour,
        title: 'Parada 1',
      });

      const paradaOne: google.maps.DirectionsWaypoint = {
        location: positionThree,
        stopover: false,
      };

      const paradaTwo: google.maps.DirectionsWaypoint = {
        location: positionFour,
        stopover: false,
      };

      const calcRoute = () => {
        directionsService.route(
          {
            origin: positionOne,
            destination: positionTwo,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: [paradaOne, paradaTwo],
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
    } catch (error) {
      console.log(' error loading gmaps api : ' + error);
    }
  }

  async ngOnInit() {
    this.currentState = this.passengerStore.getState();
  }

  async ngAfterViewInit() {
    await this.loadMap();
  }

  goToAvailableTrips() {
    this.navCtrl.navigateForward(['/passenger/find-trip']);
  }
}
