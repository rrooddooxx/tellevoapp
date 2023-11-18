import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from './modules/auth/auth.module';
import { BookTripModule } from './modules/book-trip/book-trip.module';
import { GoogleMapsModule } from './modules/google-maps/google-maps.module';
import { DbModule } from './providers/db-api/db.module';
import { ActionSheetFactory } from './routes/passenger/find-trip/factories/action-sheet-buttons.factory';
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
    BookTripModule,
    DbModule,
    GoogleMapsModule,
  ],
  providers: [RegisterMappers, ActionSheetFactory],
})
export class AppComponent {
  constructor() {}
}
