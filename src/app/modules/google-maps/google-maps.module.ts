import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoresModule } from '../../stores/stores.module';
import { GoogleMapsService } from './google-maps.service';
import { GoogleMapsMappers } from './mappers/google-map.mappers';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoresModule],
  providers: [GoogleMapsService, GoogleMapsMappers],
})
export class GoogleMapsModule {}
