import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabnavComponent } from '../../../components/tabnav/tabnav.component';
import { ITripCardType } from 'src/app/shared/enums/trip-card.enum';
import { ITripCardState, ITripStatus } from 'src/app/components/trip-card/trip-card.interfaces';
import { TripCardComponent } from 'src/app/components/trip-card/trip-card.component';

@Component({
  selector: 'my-trips-app',
  templateUrl: './my-trips.page.html',
  styleUrls: ['./my-trips.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent, TripCardComponent],
})
export class DriverTripsPage implements OnInit {
  public openCard: boolean = false;
  tripCardType = ITripCardType;

  trips: ITripCardState[] = [
    {
      passengers: ['Sebastián Kravetz', 'Natanael Pino', 'Ángelo Sepúlveda', 'Sebastián Parraguez'],
      stops: ['xxx', 'yyy'],
      tripDate: '21/10',
      tripTime: '16:35',
      tripSeatsStatus: ITripStatus.CLOSED,
    },
    {
      passengers: ['Nicolás Pino'],
      stops: ['xxx', 'yyy'],
      tripDate: '24/10',
      tripTime: '21:35',
      tripSeatsStatus: ITripStatus.OPEN,
    }
  ]

  constructor(private readonly router: Router) { }

  toggleCard() {
    this.openCard = !this.openCard;
  }

  ngOnInit() {
  }
}