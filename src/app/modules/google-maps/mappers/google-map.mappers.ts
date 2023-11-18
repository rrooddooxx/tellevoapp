import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';

@Injectable()
export class GoogleMapsMappers {
  constructor() {}

  mapToLatLng(coord: string) {
    const [lat, lng] = coord.split(',').map((val) => Number(val.trim()));
    return Builder<google.maps.LatLngLiteral>().lat(lat).lng(lng).build();
  }

  mapEachWaypoint(
    location: google.maps.LatLngLiteral
  ): google.maps.DirectionsWaypoint {
    return Builder<google.maps.DirectionsWaypoint>()
      .location(location)
      .stopover(false)
      .build();
  }

  mapToWaypoints(
    locations: google.maps.LatLngLiteral[]
  ): google.maps.DirectionsWaypoint[] {
    return locations
      ? locations.map((location) => this.mapEachWaypoint(location))
      : ([] as google.maps.DirectionsWaypoint[]);
  }

  mapStops(coords: string[]): google.maps.LatLngLiteral[] {
    return coords
      ? coords.map((coord) => this.mapToLatLng(coord))
      : ([] as google.maps.LatLngLiteral[]);
  }
}
