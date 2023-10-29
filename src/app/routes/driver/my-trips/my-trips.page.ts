import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ITripCardType } from 'src/app/shared/enums/trip-card.enum';
import { ITripCardState, ITripStatus } from 'src/app/components/trip-card/trip-card.interfaces';
import { TripCardComponent } from 'src/app/components/trip-card/trip-card.component';
import { TripMappers } from 'src/app/providers/db-api/mappers/trips.mappers';
import { TripsRepository } from 'src/app/providers/db-api/repositories/trips.repository';
import { DbModule } from 'src/app/providers/db-api/db.module';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';

@Component({
  selector: 'my-trips-app',
  templateUrl: './my-trips.page.html',
  styleUrls: ['./my-trips.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TripCardComponent, DbModule],
})
export class DriverTripsPage implements OnInit {
  tripCardType = ITripCardType;
  trips: ITripCardState[] = []
  public currentState: IDriverState;

  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly mapper: TripMappers,
    private readonly driverStore: DriverStoreService
  ) { }

  ngOnInit() {
    this.currentState = this.driverStore.getState();
    this.getTrips()
  }

  getTrips() {
    return this.tripsRepository.getTripsByDriverIdRPC(this.currentState.userProfile.user_id).subscribe((trips) => {
      this.trips = this.mapper.mapActiveTripsToDomain(trips)
    })
  }
}