import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { TripCardComponent } from 'src/app/components/trip-card/trip-card.component';
import { ITripCardState } from 'src/app/components/trip-card/trip-card.interfaces';
import { TripDirectionType } from 'src/app/modules/google-maps/domain/google-map.interfaces';
import { GoogleMapsService } from 'src/app/modules/google-maps/google-maps.service';
import { DbModule } from 'src/app/providers/db-api/db.module';
import { CreateTripRequest } from 'src/app/providers/db-api/domain/trips.domain';
import { TripMappers } from 'src/app/providers/db-api/mappers/trips.mappers';
import { TripsRepository } from 'src/app/providers/db-api/repositories/trips.repository';
import { ITripCardType } from 'src/app/shared/enums/trip-card.enum';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { CreateTripInput } from './domain/create-trip-input.domain';
import { mapNewTrip } from './mappers/my-trips.mappers';

@Component({
  selector: 'my-trips-app',
  templateUrl: './my-trips.page.html',
  styleUrls: ['./my-trips.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripCardComponent,
    DbModule,
  ],
})
export class DriverTripsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('pickupInfoWindowContent')
  pickupInfoWindowContent: ElementRef<HTMLElement>;
  @ViewChild('pickupPacCard') pickupPacCard: ElementRef<HTMLElement>;
  @ViewChild('pickupPacContainer') pickupPacContainer: ElementRef<HTMLElement>;
  @ViewChild('pickupPacInput') pickupPacInput: ElementRef<HTMLInputElement>;
  @ViewChild('dropoffInfoWindowContent')
  dropoffInfoWindowContent: ElementRef<HTMLElement>;
  @ViewChild('dropoffPacCard') dropoffPacCard: ElementRef<HTMLElement>;
  @ViewChild('dropoffPacContainer')
  dropoffPacContainer: ElementRef<HTMLElement>;
  @ViewChild('dropoffPacInput') dropoffPacInput: ElementRef<HTMLInputElement>;

  tripCardType = ITripCardType;
  trips: ITripCardState[] = [];
  dateNow = new Date().toISOString();

  public currentState: IDriverState;

  public currentState$ = this.driverStore.state$;

  public createTripInput: CreateTripInput = {
    pickup_ref: '',
    dropoff_ref: '',
    pickup_coords: '',
    dropoff_coords: '',
    trip_datetime: this.dateNow,
  };

  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly mapper: TripMappers,
    private googleMapsService: GoogleMapsService,
    private readonly driverStore: DriverStoreService
  ) {}

  async ngOnInit() {
    this.currentState = this.driverStore.getState();
    this.getTrips();
  }

  async getTrips() {
    return this.tripsRepository
      .getTripsByDriverIdRPC(this.currentState.userProfile.user_id)
      .subscribe((trips) => {
        this.trips = this.mapper.mapActiveTripsToDomain(trips);
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  showModal() {
    this.modal.didPresent.subscribe(() => {
      this.createInputMaps();
    });
  }

  async createInputMaps() {
    await this.googleMapsService.isLibraryLoaded();
    const pickupMap = document.getElementById('pickupMap');
    const pickupPacInputOrigin = document.getElementById(
      'pickupPacInputOrigin'
    );
    const pickupPacInputDestination = document.getElementById(
      'pickupPacInputDestination'
    );
    const pickupPacCard = document.getElementById('pickupPacCard');
    const pickupInfoWindowContent = document.getElementById(
      'pickupInfoWindowContent'
    );
    await this.googleMapsService.createPredictionMap(
      pickupMap,
      [
        pickupPacInputOrigin as HTMLInputElement,
        pickupPacInputDestination as HTMLInputElement,
      ],
      pickupPacCard,
      pickupInfoWindowContent,
      this.driverStore,
      TripDirectionType.PICKUP
    );
  }

  createTrip() {
    this.currentState$.subscribe((val) => {
      if (val?.tripBookingDropoff && val?.tripBookingPickup) {
        this.createTripInput.pickup_coords = val.tripBookingPickup;
        this.createTripInput.dropoff_coords = val.tripBookingDropoff;
      }
    });
    const newTrip: CreateTripRequest = mapNewTrip(
      this.currentState,
      this.createTripInput
    );

    try {
      this.tripsRepository.createNewTrip(newTrip).subscribe(() => {
        this.getTrips();
        this.cancel();
      });
    } catch (error) {
      console.log(error);
    }
  }
}
