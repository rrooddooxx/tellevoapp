import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IRequestTripCard } from './domain/request-trip-card.interfaces';
import { TripsAgreementRepository } from 'src/app/providers/db-api/repositories/trips-agreement.repository';

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
    private readonly tripAgreementRepository: TripsAgreementRepository,
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

}