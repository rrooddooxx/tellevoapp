import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiDatabaseConfig } from './api.config';
import { TripsRepositoryConfig } from './config/trips.config';
import { CareerRepository } from './repositories/careers.repository';
import { TripsAgreementRepository } from './repositories/trips-agreement.repository';
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
    TripsAgreementRepository,
    ApiDatabaseConfig,
  ],
})
export class DbModule {}
