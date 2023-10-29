import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription, lastValueFrom } from 'rxjs';
import { TripCardComponent } from '../../../components/trip-card/trip-card.component';
import { ITripCardState } from '../../../components/trip-card/trip-card.interfaces';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';
import { DbModule } from '../../../providers/db-api/db.module';
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
  tripCardType = ITripCardType;
  tripsList: ITripCardState[] = [];
  private passengerStoreSub: Subscription;
  public storeState: IPassengerState;
  constructor(
    private readonly tripsAgreementRepository: TripsAgreementRepository,
    private readonly passengerStore: PassengerStoreService
  ) {}

  ngOnInit() {
    this.passengerStoreSub = this.passengerStore.state$.subscribe((state) => {
      this.storeState = state;
      console.log(this.passengerStore.getState());
    });
  }

  async getTakenTrips(userID: number) {
    console.log(this.storeState.userProfile.user_id);
    const tripsTaken = await lastValueFrom(
      this.tripsAgreementRepository.getTripsTakenByStudentID(
        this.storeState.userProfile.user_id
      )
    );
    console.log(tripsTaken);
  }

  ngOnDestroy(): void {
    this.passengerStoreSub && this.passengerStoreSub.unsubscribe();
  }
}
