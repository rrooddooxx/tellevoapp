import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DriverStoreService } from './driver/driver.service';
import { PassengerStoreService } from './passenger/passenger.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [PassengerStoreService, DriverStoreService],
})
export class StoresModule {}
