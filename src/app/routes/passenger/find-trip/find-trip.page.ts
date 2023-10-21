import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripCardComponent } from '../../../components/trip-card/trip-card.component';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';
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
  ],
})
export class FindTripPage implements OnInit {
  tripCardType = ITripCardType;
  constructor() {}

  ngOnInit() {}
}