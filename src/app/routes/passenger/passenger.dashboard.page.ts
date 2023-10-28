import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ITabElements } from '../../components/domain/tabnav-elements.interface';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { IPassengerState } from '../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';
import { passengerTabs } from './passenger.tabnav.domain';

@Component({
  selector: 'passenger-app-dashboard',
  templateUrl: './passenger.dashboard.page.html',
  styleUrls: ['./passenger.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class PassengerDashboardPage implements OnInit, OnDestroy {
  public passengerTabNavList: ITabElements[] = passengerTabs;
  public currentState: IPassengerState;
  private storeSuscription: Subscription;

  constructor(private passengerStore: PassengerStoreService) {}

  ngOnInit() {
    this.storeSuscription = this.passengerStore.state$.subscribe((state) => {
      this.currentState = state;
      console.log('state passenger: ' + JSON.stringify(state));
    });
  }

  ngOnDestroy(): void {
    this.storeSuscription && this.storeSuscription.unsubscribe();
  }
}
