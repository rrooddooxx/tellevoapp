import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { IPassengerState } from '../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';

@Component({
  selector: 'passenger-app-dashboard',
  templateUrl: './passenger.dashboard.page.html',
  styleUrls: ['./passenger.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
  providers: [PassengerStoreService],
})
export class PassengerDashboardPage implements OnInit, OnDestroy {
  public currentState: IPassengerState;
  private storeSuscription: Subscription;

  constructor(private passengerStore: PassengerStoreService) {}

  ngOnInit() {
    this.storeSuscription = this.passengerStore.state$.subscribe(
      (state) => (this.currentState = state)
    );
  }

  ngOnDestroy(): void {
    this.storeSuscription && this.storeSuscription.unsubscribe();
  }
}
