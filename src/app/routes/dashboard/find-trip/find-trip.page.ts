import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';
import { DbModule } from '../../../providers/db-api/db.module';
import { TripModel } from '../../../providers/db-api/model/trips.model';
import { TripsRepository } from '../../../providers/db-api/repositories/trips.repository';

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
    DbModule,
  ],
})
export class FindTripPage implements OnInit {
  public availableTrips: TripModel[];
  constructor(private readonly tripsRepository: TripsRepository) {
    this.tripsRepository.getTrips().subscribe((trips) => {
      this.availableTrips = trips;
    });
  }

  ngOnInit() {}
}
