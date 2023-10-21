import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { UserModel } from '../login/model/user.model';
import { ITripCardType } from 'src/app/shared/enums/trip-card.enum';
import { ITripCardState } from 'src/app/components/trip-card/trip-card.interfaces';
import { TripCardComponent } from 'src/app/components/trip-card/trip-card.component';

@Component({
  selector: 'driver-app-dashboard',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent, TripCardComponent],
})
export class DriverPage implements OnInit {
  public openCard: boolean = false;
  tripCardType = ITripCardType;

  trips: ITripCardState[] = [
    {
      passengers: ['Sebastián Kravetz', 'Natanael Pino', 'Ángelo Sepúlveda', 'Sebastián Parraguez'],
      stops: ['xxx', 'yyy'],
      tripDate: '21/10',
      tripTime: '16:35',
      tripSeatsStatus: 'Lleno',
    },
    {
      passengers: ['Nicolás Pino'],
      stops: ['xxx', 'yyy'],
      tripDate: '24/10',
      tripTime: '21:35',
      tripSeatsStatus: 'Abierto',
    }
  ]

  constructor(private readonly router: Router) {}

  toggleCard() {
    this.openCard = !this.openCard;
  }

  ngOnInit() {
  }
}