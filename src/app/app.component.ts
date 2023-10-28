import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from './providers/db-api/api.service';
import { TripMappers } from './providers/db-api/mappers/trips.mappers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, HttpClientModule],
  providers: [ApiService, TripMappers],
})
export class AppComponent {
  constructor() {}
}
