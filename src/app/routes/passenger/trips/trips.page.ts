import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription, lastValueFrom } from 'rxjs';
import { TripCardComponent } from '../../../components/trip-card/trip-card.component';
import { ITripCardState } from '../../../components/trip-card/trip-card.interfaces';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';
import { DbModule } from '../../../providers/db-api/db.module';
import { TripMappers } from '../../../providers/db-api/mappers/trips.mappers';
import { TripsRepository } from '../../../providers/db-api/repositories/trips.repository';
import { ITripCardType } from '../../../shared/enums/trip-card.enum';
import { IPassengerState } from '../../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../../stores/passenger/passenger.service';
import { TripsAgreementRepository } from './../../../providers/db-api/repositories/trips-agreement.repository';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripListItemComponent,
    TripCardComponent,
    DbModule,
  ],
})
export class TripsPage implements OnInit {
  public tripCardType = ITripCardType;
  public rejectedTripsList: ITripCardState[] = [];
  public waitingTripsList: ITripCardState[] = [];
  public acceptedTripsList: ITripCardState[] = [];
  public userID: string;
  public acceptedTripsIDs: number[] = [];
  public rejectedTripsIDs: number[] = [];
  public waitingTripsIDs: number[] = [];
  private passengerStoreSub: Subscription;
  public storeState: IPassengerState;
  public isCancelAlertOpen: boolean = false;
  public cancelAlertButtons = ['OK'];

  constructor(
    private readonly tripsAgreementRepository: TripsAgreementRepository,
    private readonly tripsRepository: TripsRepository,
    private readonly passengerStore: PassengerStoreService,
    private readonly tripsMapper: TripMappers
  ) {
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  setCancelAlertOpen(isOpen: boolean) {
    this.isCancelAlertOpen = isOpen;
  }

  async ngOnInit() {
    this.passengerStoreSub = this.passengerStore.state$.subscribe((state) => {
      this.storeState = state;
      this.userID = state.userProfile.user_id.toString();
    });
    await this.getAllTrips();
  }

  cancelBooking(tripID: string) {
    this.tripsAgreementRepository.rejectTripRequest(Number(tripID)).subscribe();
    this.setCancelAlertOpen(true);
    this.getAllTrips();
  }

  async getAllTrips() {
    await this.getAcceptedTripIDs(this.userID);
    await this.getWaitingTripIDs(this.userID);
    await this.getRejectedTripIDs(this.userID);
    await this.getAcceptedTrips(this.acceptedTripsIDs);
    await this.getWaitingTrips(this.waitingTripsIDs);
    await this.getRejectedTrips(this.rejectedTripsIDs);
  }

  async getAcceptedTripIDs(userID: string) {
    const tripsTaken = await lastValueFrom(
      this.tripsAgreementRepository.getAcceptedTripsByStudentID(userID)
    );
    this.acceptedTripsIDs = this.tripsMapper.mapTripsToIDList(tripsTaken);
  }

  async getWaitingTripIDs(userID: string) {
    const tripsTaken = await lastValueFrom(
      this.tripsAgreementRepository.getWaitingTripsByStudentID(userID)
    );
    this.waitingTripsIDs = this.tripsMapper.mapTripsToIDList(tripsTaken);
  }

  async getRejectedTripIDs(userID: string) {
    const tripsTaken = await lastValueFrom(
      this.tripsAgreementRepository.getRejectedTripsByStudentID(userID)
    );
    this.rejectedTripsIDs = this.tripsMapper.mapTripsToIDList(tripsTaken);
  }

  async getAcceptedTrips(tripIDs: number[]) {
    const acceptedTrips = await lastValueFrom(
      this.tripsRepository.getActiveTripsByTripIDsRPC(tripIDs)
    );
    this.acceptedTripsList =
      this.tripsMapper.mapActiveTripsToDomain(acceptedTrips);
  }

  async getWaitingTrips(tripIDs: number[]) {
    const waitingTrips = await lastValueFrom(
      this.tripsRepository.getActiveTripsByTripIDsRPC(tripIDs)
    );
    this.waitingTripsList =
      this.tripsMapper.mapActiveTripsToDomain(waitingTrips);
  }

  async getRejectedTrips(tripIDs: number[]) {
    const rejectedTrips = await lastValueFrom(
      this.tripsRepository.getActiveTripsByTripIDsRPC(tripIDs)
    );
    this.rejectedTripsList =
      this.tripsMapper.mapActiveTripsToDomain(rejectedTrips);
  }

  ngOnDestroy(): void {
    this.passengerStoreSub && this.passengerStoreSub.unsubscribe();
  }
}
