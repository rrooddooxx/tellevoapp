import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthServiceMapper } from './mapper/auth.mapper';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, AuthServiceMapper],
})
export class AuthModule {}
