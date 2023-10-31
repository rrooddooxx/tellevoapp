import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetButton, AlertController, IonicModule } from '@ionic/angular';
import { TripsAgreementRepository } from 'src/app/providers/db-api/repositories/trips-agreement.repository';
import { UserGenders } from '../../shared/domain/user-types.domain';
import {
  IPassengerGenderFormat,
  IRequestTripCard,
} from './domain/request-trip-card.interfaces';
import { BookTripService } from 'src/app/modules/book-trip/book-trip.service';
import { IRequestTripStatus } from 'src/app/modules/book-trip/domain/book-trip.domain';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { Observable } from 'rxjs';

type IFinalStatus = {
  status?: keyof typeof IRequestTripStatus;
}

@Component({
  standalone: true,
  selector: 'app-request-card',
  templateUrl: './request-trip-card.component.html',
  styleUrls: ['./request-trip-card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RequestTripCardComponent implements OnInit {
  @Input() tripRequests: IRequestTripCard[];
  @Input() getTripRequests: () => void;

  public isOpenCard: boolean[];
  public actionButtons: ActionSheetButton[] = [];
  public isAlertOpen = false;
  public currentState$: Observable<IDriverState>;

  constructor(
    private readonly bookTripService: BookTripService,
    private alertController: AlertController,
    private driverStore: DriverStoreService
  ) {}

  async ngOnInit() {
    this.isOpenCard = new Array(this.tripRequests.length).fill(false);
    this.currentState$ = this.driverStore.state$;
  }

  toggleCard(index: number) {
    this.isOpenCard[index] = !this.isOpenCard[index];
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  async acceptTrip(tripId: number) {
    this.driverStore.updateState({
      ...this.driverStore.getState(),
      actionSheetTrigger: "open-action-sheet-accept",
      actionSheetHeader: "¿Aceptar Viaje?"
    })
    this.actionButtons = await this.getActionSheet("accept", tripId)
  }

  async rejectTrip(tripId: number) {
    this.driverStore.updateState({
      ...this.driverStore.getState(),
      actionSheetTrigger: "open-action-sheet-reject",
      actionSheetHeader: "¿Rechazar Viaje?"
    })
    this.actionButtons = await this.getActionSheet("reject", tripId)
  }

  mapPassengerGenderFormatting(gender: string) {
    const dictionary: { [key: string]: IPassengerGenderFormat } = {
      [UserGenders.NON_BINARY]: {
        name: 'No binario',
      },
      [UserGenders.NOT_INFORMED]: {
        name: 'No informado',
      },
      [UserGenders.FEMALE]: {
        name: 'Femenino',
      },
      [UserGenders.MALE]: {
        name: 'Masculino',
      },
    };
    return (
      dictionary[gender as UserGenders] || dictionary[UserGenders.NOT_INFORMED]
    );
  }

  public async getActionSheet(
    type: "accept" | "reject",
    tripId: number
  ): Promise<ActionSheetButton[]> {
    const handleRequestStatus = async () => {
      const status: IFinalStatus = {} as IFinalStatus;
      if(type === "accept") {
        status.status = await this.bookTripService.acceptTripBooking(tripId);
      }
      if(type === "reject") {
        status.status =  await this.bookTripService.rejectTripBooking(tripId);
      }

      switch (status.status) {
        case IRequestTripStatus.OK_ACCEPTED.toString():
          const alert1 = await this.alertController.create({
            header: 'Éxito en la operación',
            subHeader: 'Reserva aceptada!',
            message: 'El pasajero será notificado de su respuesta',
            buttons: ['OK'],
          });
          alert1.present();
          this.getTripRequests();
          break;
        case IRequestTripStatus.OK_REJECTED.toString():
          const alert2 = await this.alertController.create({
            header: 'Éxito en la operación',
            subHeader: 'Reserva rechazada!',
            message: 'El pasajero será notificado de su respuesta',
            buttons: ['OK'],
          });
          alert2.present();
          this.getTripRequests();
          break;
        case IRequestTripStatus.FAIL_ACCEPTED.toString() || IRequestTripStatus.FAIL_REJECTED.toString():
          const alert3 = await this.alertController.create({
            header: 'Error en la operación',
            subHeader: 'No se ha podido aceptar la reserva',
            message: 'Ha ocurrido un error inesperado. Inténtalo de nuevo.',
            buttons: ['OK'],
          });
          alert3.present();
         this.getTripRequests();
          break;
      }
    };
    return [
      {
        text: 'Confirmar',
        data: {
          action: 'book-trip',
        },
        handler: handleRequestStatus,
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
