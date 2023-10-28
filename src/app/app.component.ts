import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from './modules/auth/auth.module';
import { RegisterMappers } from './routes/register/mappers/register.mapper';
import { StoresModule } from './stores/stores.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoresModule,
    AuthModule,
  ],
  providers: [RegisterMappers],
})
export class AppComponent {
  constructor() {}
}
