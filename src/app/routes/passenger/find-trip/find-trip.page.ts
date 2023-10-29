import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripCardComponent } from '../../../components/trip-card/trip-card.component';
import { ITripCardState, ITripStatus } from '../../../components/trip-card/trip-card.interfaces';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';
import { DbModule } from '../../../providers/db-api/db.module';
import { TripMappers } from '../../../providers/db-api/mappers/trips.mappers';
import { TripsRepository } from '../../../providers/db-api/repositories/trips.repository';
import { ITripCardType } from '../../../shared/enums/trip-card.enum';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.page.html',
  styleUrls: ['./find-trip.page.scss'],
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
export class FindTripPage implements OnInit {
  tripCardType = ITripCardType;

  tripsList: ITripCardState[] = [];

  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly mapper: TripMappers
  ) { }

  ngOnInit() {
    this.getActiveTrips();
  }

  getActiveTrips() {
    return this.tripsRepository.getActiveTripsRPC().subscribe((trips) => {
      this.tripsList = this.mapper.mapActiveTripsToDomain(trips);
    });
  }
}
