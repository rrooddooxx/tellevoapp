import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateTime } from 'luxon';
import { IRequestTripCard } from 'src/app/components/request-trip-card/domain/request-trip-card.interfaces';
import { RequestTripCardComponent } from 'src/app/components/request-trip-card/request-trip-card.component';
import { TripCardComponent } from 'src/app/components/trip-card/trip-card.component';
import { ITripCardState } from 'src/app/components/trip-card/trip-card.interfaces';
import { DbModule } from 'src/app/providers/db-api/db.module';
import { RequestTripMappers } from 'src/app/providers/db-api/mappers/request-trips.mappers';
import { TripMappers } from 'src/app/providers/db-api/mappers/trips.mappers';
import { TripsAgreementRepository } from 'src/app/providers/db-api/repositories/trips-agreement.repository';
import { TripsRepository } from 'src/app/providers/db-api/repositories/trips.repository';
import { ITripCardType } from 'src/app/shared/enums/trip-card.enum';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';

@Component({
  selector: 'driver-app-homepage',
  templateUrl: './driver.home.page.html',
  styleUrls: ['./driver.home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, 
    TripCardComponent,
    RequestTripCardComponent,
    DbModule
  ],
})
export class DriverHomePage implements OnInit {
  public currentState: IDriverState;
  tripCardType = ITripCardType;
  dateNow = new Date().toISOString()
  trips: ITripCardState[] = [];
  todayTrip: ITripCardState[] = [];
  showTodayTrip: boolean = false;
  public tripRequests: IRequestTripCard[] = [];

  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly tripsAgreementRepository: TripsAgreementRepository,
    private readonly mapper: TripMappers,
    private readonly requestTripMapper: RequestTripMappers,
    private readonly driverStore: DriverStoreService
  ) { }

  ngOnInit() {
    this.currentState = this.driverStore.getState();
    this.getTodayTrip();
    this.getTripRequests();
    this.getTripRequests = this.getTripRequests.bind(this);
  }

  ionViewDidEnter() {
    this.getTodayTrip();
    this.getTripRequests();
  }

  getTodayTrip() {
    return this.tripsRepository.getTripsByDriverIdRPC(this.currentState.userProfile.user_id).subscribe((trips) => {
      this.trips = this.mapper.mapActiveTripsToDomain(trips)
      
      const allTrips: ITripCardState[] = []

      const todayTripExists = this.trips.find((trip) => {
        return trip.tripDate === DateTime.fromISO(this.dateNow).toFormat('dd/MM/yyyy')
      })

      todayTripExists ? allTrips.push(todayTripExists) : null
        
      this.todayTrip = allTrips;

      this.todayTrip.length > 0 ? this.showTodayTrip = true : this.showTodayTrip = false;
    })
  }

  getTripRequests() {
    return this.tripsAgreementRepository.getActiveRequestsByDriverId(this.currentState.userProfile.user_id).subscribe((trips) => {
      this.tripRequests = this.requestTripMapper.mapActiveRequestTripsToDomain(trips)
    })
  }
}
