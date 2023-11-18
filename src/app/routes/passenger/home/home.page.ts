import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap, Polyline } from '@capacitor/google-maps';
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
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  public userInfo: UserModel = {} as UserModel;
  public currentState: IPassengerState;

  constructor(
    private readonly router: Router,
    private readonly passengerStore: PassengerStoreService,
    private readonly navCtrl: NavController
  ) {}

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyBXCBehWv7oDlFgnwwtN_AoQhM8u-QJ1RM',
      config: {
        center: {
          lat: -33.033672,
          lng: -71.533049,
        },
        zoom: 18,
      },
    });
    this.newMap.addMarker({
      coordinate: {
        lat: -33.033921,
        lng: -71.532663,
      },
    });
    this.newMap.addMarker({
      coordinate: {
        lat: -33.033333,
        lng: -71.531663,
      },
    });
    const lines: Polyline[] = [
      {
        path: [
          { lat: -33.033921, lng: -71.532663 },
          {
            lat: -33.033333,
            lng: -71.531663,
          },
        ],
      },
    ];
    this.newMap.addPolylines(lines);
  }

  async ngOnInit() {
    this.currentState = this.passengerStore.getState();
  }

  async ngAfterViewInit() {
    this.createMap();
  }

  goToAvailableTrips() {
    this.navCtrl.navigateForward(['/passenger/find-trip']);
  }
}
