import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionSheetButton, IonicModule } from '@ionic/angular';
import { Observable, lastValueFrom } from 'rxjs';
import { TripCardComponent } from '../../../components/trip-card/trip-card.component';
import { ITripCardState } from '../../../components/trip-card/trip-card.interfaces';
import { TripListItemComponent } from '../../../components/trip-list-item/trip-list-item.component';
import { DbModule } from '../../../providers/db-api/db.module';
import { TripMappers } from '../../../providers/db-api/mappers/trips.mappers';
import { TripsAgreementRepository } from '../../../providers/db-api/repositories/trips-agreement.repository';
import { TripsRepository } from '../../../providers/db-api/repositories/trips.repository';
import { ITripCardType } from '../../../shared/enums/trip-card.enum';
import { IPassengerState } from '../../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../../stores/passenger/passenger.service';
import { ActionSheetFactory } from './factories/action-sheet-buttons.factory';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.page.html',
  styleUrls: ['./find-trip.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripListItemComponent,
    TripCardComponent,
    DbModule,
  ],
})
export class FindTripPage implements OnInit {
  tripCardType = ITripCardType;
  tripsList: ITripCardState[] = [];
  public actionHeader: string = 'Acciones de Viaje';
  public actionSheetButtons: ActionSheetButton[];
  public currentState$: Observable<IPassengerState>;
  public userID: string;
  public forceActiveTripsReload: boolean = false;

  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly tripsAgreementRepository: TripsAgreementRepository,
    private readonly mapper: TripMappers,
    private readonly actionSheetFactory: ActionSheetFactory,
    private passengerStore: PassengerStoreService
  ) {}

  async ngOnInit() {
    this.getActiveTrips();
    this.currentState$ = this.passengerStore.state$;
    this.currentState$.subscribe(async (state) => {
      this.userID = state.userProfile.user_id.toString();
      const actionSheet = await this.actionSheetFactory.getActionSheet(
        state.userProfile.user_id
      );
      this.actionSheetButtons = actionSheet;
      this.getActiveTrips();
    });
  }

  ionViewDidEnter() {
    this.getActiveTrips();
  }

  async getActiveTrips() {
    const openActiveTrips = await lastValueFrom(
      this.tripsRepository.getOpenActiveTripsRPC()
    );
    const activeTrips = this.mapper.mapActiveTripsToDomain(openActiveTrips);
    this.getTripAgreementStatusByStudent(activeTrips);
  }

  async getTripAgreementStatusByStudent(activeTrips: ITripCardState[]) {
    const statuses = await lastValueFrom(
      this.tripsAgreementRepository.getTripAgreementsByStudentId(
        Number(this.userID)
      )
    );

    this.tripsList = this.mapper.mapTripAgreementStatusToTripList(
      activeTrips,
      statuses,
      this.userID
    );
  }
}
