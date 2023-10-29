import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DbModule } from '../../providers/db-api/db.module';
import { AuthService } from './auth.service';
import { AuthServiceMapper } from './mapper/auth.mapper';

@NgModule({
  declarations: [],
  imports: [CommonModule, DbModule],
  providers: [AuthService, AuthServiceMapper],
})
export class AuthModule {}
