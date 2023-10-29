import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ITripListItem } from './domain/trip-list-item.domain';

@Component({
  selector: 'app-trip-list-item',
  standalone: true,
  templateUrl: './trip-list-item.component.html',
  styleUrls: ['./trip-list-item.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class TripListItemComponent implements OnInit {
  public tripItemState: ITripListItem[] = [
    {
      driverName: 'seba',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
