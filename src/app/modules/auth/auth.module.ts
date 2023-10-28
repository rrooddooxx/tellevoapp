import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PassengerModule } from '../../stores/passenger/passenger.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, PassengerModule],
  providers: [AuthService],
})
export class AuthModule {}
