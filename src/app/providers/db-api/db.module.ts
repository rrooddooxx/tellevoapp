import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TripsRepositoryConfig } from './config/trips.config';
import { CareerRepository } from './repositories/careers.repository';
import { TripsRepository } from './repositories/trips.repository';
import { UsersRepository } from './repositories/users.repository';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UsersRepository,
    TripsRepository,
    CareerRepository,
    TripsRepositoryConfig,
  ],
})
export class DbModule {}
