import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsService } from '../../modules/google-maps/google-maps.service';
import { ITripCardViewType } from './domain/map-card-view.interfaces';

@Component({
  selector: 'app-map-card-view',
  standalone: true,
  templateUrl: './map-card-view.component.html',
  styleUrls: ['./map-card-view.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class MapCardViewComponent implements OnInit {
  @ViewChild('asMapView')
  mapView: ElementRef<HTMLElement>;

  @Input() startCoordinate: string;
  @Input() endCoordinate: string;
  @Input() stops: string[];
  @Input() mapViewType: ITripCardViewType;

  constructor(private readonly googleMapsService: GoogleMapsService) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    if(this.mapViewType === ITripCardViewType.DEFAULT) {
      this.googleMapsService.createTripMap(
        this.startCoordinate,
        this.endCoordinate,
        this.mapView,
        this.stops
      );
    }
    if(this.mapViewType === ITripCardViewType.REQUEST_TRIP) {
      this.googleMapsService.createTripRequestMap(
        this.endCoordinate,
        this.mapView,
      )
    }
  }
}
