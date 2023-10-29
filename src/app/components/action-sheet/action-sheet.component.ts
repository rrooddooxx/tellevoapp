import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ActionSheetButton,
  AlertController,
  IonicModule,
} from '@ionic/angular';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';
import { BookTripService } from './../../modules/book-trip/book-trip.service';

@Component({
  standalone: true,
  selector: 'app-action-sheet',
  imports: [CommonModule, IonicModule],
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent implements OnInit {
  public actionButtons: ActionSheetButton[] = [];
  public isAlertOpen = false;
  @Input() userID: string;
  @Input() tripID: string;
  @Input() actionHeader: string;
  constructor(
    private readonly bookTripService: BookTripService,
    private alertController: AlertController,
    private passengerStore: PassengerStoreService
  ) {}

  async ngOnInit() {
    this.actionButtons = await this.getActionSheet(this.userID, this.tripID);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  updateForceActiveTripsReload() {
    this.passengerStore.updateForceActiveTripsReload(true);
  }

  public async getActionSheet(
    userID: string,
    tripID: string
  ): Promise<ActionSheetButton[]> {
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
          this.passengerStore.updateForceActiveTripsReload(true);
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
          break;
      }
    };
    return [
      {
        text: 'Reservar',
        data: {
          action: 'book-trip',
        },
        handler: bookTrip,
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
}
