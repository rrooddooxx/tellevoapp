import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ITripCardType } from '../../shared/enums/trip-card.enum';

@Component({
  standalone: true,
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class TripCardComponent implements OnInit {
  @Input() type: ITripCardType;
  tripCardType = ITripCardType;
  constructor() {}

  ngOnInit() {}
}
