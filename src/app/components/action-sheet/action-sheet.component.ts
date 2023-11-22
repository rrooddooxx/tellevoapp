/* eslint-disable no-case-declarations */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ActionSheetButton,
  AlertController,
  IonModal,
  IonicModule,
  NavController,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { GoogleMapsService } from '../../modules/google-maps/google-maps.service';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';
import { BookTripService } from './../../modules/book-trip/book-trip.service';

@Component({
  standalone: true,
  selector: 'app-action-sheet',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('destinationInput') destinationInputElement: ElementRef;
  @ViewChild('mapSearchView') mapSearchViewElement: ElementRef;

  public actionButtons: ActionSheetButton[] = [];
  public isAlertOpen = false;
  public destinationInput: string = '';

  @Input() userID: string;
  @Input() tripID: string;
  @Input() actionHeader: string;
  @Input() getActiveTripsReload: () => Promise<void>;
  constructor(
    private readonly bookTripService: BookTripService,
    private alertController: AlertController,
    private passengerStore: PassengerStoreService,
    private navCtrl: NavController,
    private router: Router,
    private googleMapsService: GoogleMapsService
  ) {}

  async ngOnInit() {
    this.actionButtons = await this.getActionSheet();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  destinationInputOnChangeHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.googleMapsService.autoCompletePlace(inputElement);
  }

  clickTest(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.googleMapsService.convertPlaceToCoordinates(inputElement.value);
  }

  reloadPage(): void {
    this.router
      .navigateByUrl('/passenger/find-trip', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([this.router.url]);
      });
  }

  async updateForceActiveTripsReload() {
    await this.getActiveTripsReload();
  }

  public async getActionSheet(): Promise<ActionSheetButton[]> {
    const showModal = () => {
      this.modal.present();
    };
    return [
      {
        text: 'Reservar',
        data: {
          action: 'book-trip',
        },
        handler: showModal,
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(userID: string, tripID: string) {
    const bookTrip = async () => {
      const bookingStatus = await this.bookTripService.makeTripBooking(
        tripID,
        userID
      );
      switch (bookingStatus) {
        case 0:
          console.log('Trip booked successfully');
          const alert1 = await this.alertController.create({
            header: 'Éxito en la operación',
            subHeader: 'Reserva realizada!',
            message: 'Espera a que el conductor confirme la reserva.',
            buttons: ['OK'],
          });
          alert1.present();
          await this.updateForceActiveTripsReload();
          this.reloadPage();
          break;
        case 1:
          console.log('Trip already booked');
          const alert2 = await this.alertController.create({
            header: 'Error en la operación',
            subHeader: 'Ya has reservado para este viaje',
            message: 'Sólo puedes hacer una reserva por viaje.',
            buttons: ['OK'],
          });
          alert2.present();
          await this.updateForceActiveTripsReload();
          this.reloadPage();
          break;
        case 2:
          console.log('ERROR: Trip booking failed');
          const alert3 = await this.alertController.create({
            header: 'Éxito en la operación',
            subHeader: 'Reserva realizada!',
            message: 'Espera a que el conductor confirme la reserva.',
            buttons: ['OK'],
          });
          alert3.present();
          await this.updateForceActiveTripsReload();
          this.reloadPage();
          break;
      }
    };
    bookTrip();
    console.log('Destino: ', this.destinationInput);
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('confirmado');
    }
  }
}
