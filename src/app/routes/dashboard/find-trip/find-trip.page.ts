import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.page.html',
  styleUrls: ['./find-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TripListItemComponent],
})
export class FindTripPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
