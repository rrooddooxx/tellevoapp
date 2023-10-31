import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetButton, IonicModule } from '@ionic/angular';
import { TypeAgreementStatus } from '../../providers/db-api/model/trips-agreement.model';
import { ITripCardType } from '../../shared/enums/trip-card.enum';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';
import {
  ITripAgreementStatusField,
  ITripCardState,
  ITripStatusField,
} from './trip-card.interfaces';

@Component({
  standalone: true,
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
  imports: [CommonModule, IonicModule, ActionSheetComponent],
})
export class TripCardComponent implements OnInit {
  @Input() type: ITripCardType;
  tripCardType = ITripCardType;

  @Input() getActiveTripsReload: () => Promise<void>;

  @Input() actionButtons: ActionSheetButton[];
  @Input() actionHeader: string;
  @Input() showActionButtons: boolean = true;
  @Input() showConfirmationButtons: boolean = false;
  @Input() cancelAction: (tripID: string) => void;

  @Input() tripsInfo: ITripCardState[];
  @Input() userID: string;

  public isOpenCard: boolean[] = [];

  constructor() {}

  ngOnInit() {
    this.isOpenCard = new Array(this.tripsInfo.length).fill(false);
  }

  toggleCard(index: number) {
    this.isOpenCard[index] = !this.isOpenCard[index];
  }

  mapBookingStatus(status: string): ITripAgreementStatusField {
    const success = 'text-[var(--ion-color-success2)]';
    const waiting = 'text-[var(--ion-color-warning)]';
    const rejected = 'text-[var(--ion-color-danger)]';
    const not = 'text-[var(--ion-color-secondary)]';

    const dictionary: { [key: string]: ITripAgreementStatusField } = {
      [TypeAgreementStatus.NOT_BOOKED]: {
        color: not,
        name: 'No has reservado 👀',
      },
      [TypeAgreementStatus.ACCEPTED]: {
        color: success,
        name: 'Reserva Aceptada ✅',
      },
      [TypeAgreementStatus.REJECTED]: {
        color: rejected,
        name: 'Reserva rechazada ❌',
      },
      [TypeAgreementStatus.WAITING_FOR_APPROVAL]: {
        color: waiting,
        name: 'Esperando aprobación ⌛️',
      },
    };

    return dictionary[status] || { name: '', color: '' };
  }

  mapTripStatus(status: string): ITripStatusField {
    const objReturn: ITripStatusField = {} as ITripStatusField;
    const open = 'text-[var(--ion-color-success2)]';
    const closed = 'text-[var(--ion-color-danger)]';

    if (status === 'OPEN') {
      objReturn.color = open;
      objReturn.name = 'Abierto';
    }

    if (status === 'CLOSED') {
      objReturn.color = closed;
      objReturn.name = 'Lleno';
    }

    return objReturn;
  }
}
