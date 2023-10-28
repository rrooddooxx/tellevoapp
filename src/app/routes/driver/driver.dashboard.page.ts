import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';

@Component({
  selector: 'driver-app-dashboard',
  templateUrl: './driver.dashboard.page.html',
  styleUrls: ['./driver.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
  providers: [DriverStoreService],
})
export class DriverDashboardPage implements OnInit, OnDestroy {
  public currentState: IDriverState;
  private storeSuscription: Subscription;

  constructor(private driverStore: DriverStoreService) { }

  ngOnInit() {
    this.storeSuscription = this.driverStore.state$.subscribe(
      (state) => (this.currentState = state)
    );

    console.log(this.currentState);
    this.driverStore.updateState({
      driverID: 0,
      currentTripID: 0,
      vehicleID: 0
    });
  }

  ngOnDestroy(): void {
    this.storeSuscription && this.storeSuscription.unsubscribe();
  }
}
