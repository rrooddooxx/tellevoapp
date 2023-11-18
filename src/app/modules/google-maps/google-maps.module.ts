import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsService } from './google-maps.service';
import { GoogleMapsMappers } from './mappers/google-map.mappers';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GoogleMapsService, GoogleMapsMappers],
})
export class GoogleMapsModule {}
