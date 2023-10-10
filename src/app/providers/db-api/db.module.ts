import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CareerRepository } from './repositories/careers.repository';
import { TripsRepository } from './repositories/trips.repository';
import { UsersRepository } from './repositories/users.repository';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UsersRepository, TripsRepository, CareerRepository],
})
export class DbModule {}
