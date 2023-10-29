import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DbModule } from '../../providers/db-api/db.module';
import { BookTripService } from './book-trip.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, DbModule],
  providers: [BookTripService],
})
export class BookTripModule {}
