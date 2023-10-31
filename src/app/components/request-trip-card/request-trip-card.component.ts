import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripsAgreementRepository } from 'src/app/providers/db-api/repositories/trips-agreement.repository';
import { UserGenders } from '../../shared/domain/user-types.domain';
import {
  IPassengerGenderFormat,
  IRequestTripCard,
} from './domain/request-trip-card.interfaces';

@Component({
  standalone: true,
  selector: 'app-request-card',
  templateUrl: './request-trip-card.component.html',
  styleUrls: ['./request-trip-card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RequestTripCardComponent implements OnInit {
  @Input() tripRequests: IRequestTripCard[];

  public isOpenCard: boolean[];

  constructor(
    private readonly tripAgreementRepository: TripsAgreementRepository
  ) {}

  ngOnInit() {
    this.isOpenCard = new Array(this.tripRequests.length).fill(false);
  }

  toggleCard(index: number) {
    this.isOpenCard[index] = !this.isOpenCard[index];
  }

  acceptTrip(trip_id: number) {
    this.tripAgreementRepository.acceptTripRequest(trip_id).subscribe();
  }

  rejectTrip(trip_id: number) {
    this.tripAgreementRepository.rejectTripRequest(trip_id).subscribe();
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
}
