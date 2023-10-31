import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IRequestTripCard } from './domain/request-trip-card.interfaces';
import { BookTripService } from 'src/app/modules/book-trip/book-trip.service';

@Component({
  standalone: true,
  selector: 'app-request-card',
  templateUrl: './request-trip-card.component.html',
  styleUrls: ['./request-trip-card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RequestTripCardComponent implements OnInit {
  @Input() tripRequests: IRequestTripCard[];

  public isOpenCard: boolean[];

  constructor(
    private readonly bookTripService: BookTripService
  ) {}

  ngOnInit() {
    this.isOpenCard = new Array(this.tripRequests.length).fill(false);
  }

  toggleCard(index: number) {
    this.isOpenCard[index] = !this.isOpenCard[index];
  }

  async acceptTrip(tripId: number) {
    const status = await this.bookTripService.acceptTripBooking(tripId);
    console.log(status)
  }

  async rejectTrip(tripId: number) {
    const status = await this.bookTripService.rejectTripBooking(tripId);
    console.log(status)
  }
}