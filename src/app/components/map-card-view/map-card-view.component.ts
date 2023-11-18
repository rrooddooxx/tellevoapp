import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsService } from '../../modules/google-maps/google-maps.service';

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

  constructor(private readonly googleMapsService: GoogleMapsService) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    this.googleMapsService.createTripMap(
      this.startCoordinate,
      this.endCoordinate,
      this.mapView,
      this.stops
    );
  }
}
