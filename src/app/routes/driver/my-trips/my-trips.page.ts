import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { ITripCardType } from 'src/app/shared/enums/trip-card.enum';
import { ITripCardState } from 'src/app/components/trip-card/trip-card.interfaces';
import { TripCardComponent } from 'src/app/components/trip-card/trip-card.component';
import { TripMappers } from 'src/app/providers/db-api/mappers/trips.mappers';
import { TripsRepository } from 'src/app/providers/db-api/repositories/trips.repository';
import { DbModule } from 'src/app/providers/db-api/db.module';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { CreateTripInput } from './domain/create-trip-input.domain';
import { CreateTripRequest } from 'src/app/providers/db-api/domain/trips.domain';
import { TripFinalStatus, TripStatus } from 'src/app/providers/db-api/model/trips.model';

@Component({
  selector: 'my-trips-app',
  templateUrl: './my-trips.page.html',
  styleUrls: ['./my-trips.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TripCardComponent, DbModule],
})
export class DriverTripsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  
  tripCardType = ITripCardType;
  trips: ITripCardState[] = [];
  dateNow = new Date().toISOString()

  public currentState: IDriverState;

  public createTripInput: CreateTripInput = {
    pickup_ref: '',
    dropoff_ref: '',
    trip_datetime: this.dateNow
  }

  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly mapper: TripMappers,
    private readonly driverStore: DriverStoreService
  ) { }

  async ngOnInit() {
    this.currentState = this.driverStore.getState();
    this.getTrips()
  }

  async getTrips() {
    return this.tripsRepository.getTripsByDriverIdRPC(this.currentState.userProfile.user_id).subscribe((trips) => {
      this.trips = this.mapper.mapActiveTripsToDomain(trips)
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  showDate() {
    console.log(this.createTripInput.trip_datetime)
  }

  createTrip() {
    const newTrip: CreateTripRequest = {
      driver_id: this.currentState.userProfile.user_id,
      vehicle_id: 1,
      seats_offered: 4,
      pickup_ref: this.createTripInput.pickup_ref,
      pickup_coords: 'xx:00z',
      dropoff_ref: this.createTripInput.dropoff_ref,
      dropoff_coords: 'xx:zz0',
      trip_seats_status: TripStatus.OPEN,
      trip_final_status: TripFinalStatus.NOT_COMPLETED,
      trip_datetime: this.createTripInput.trip_datetime
    }

    try{
      this.tripsRepository.createNewTrip(newTrip).subscribe(() => {
        this.getTrips()
        this.cancel()
      })
    } catch (error) {
      console.log(error)
    }
  }
}