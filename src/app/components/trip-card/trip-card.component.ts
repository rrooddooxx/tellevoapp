import { Component, Input, OnInit } from '@angular/core';
import { ITripCardType } from '../../shared/enums/trip-card.enum';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input() type: ITripCardType;
  TripCardType: ITripCardType;
  constructor() {}

  ngOnInit() {}
}
