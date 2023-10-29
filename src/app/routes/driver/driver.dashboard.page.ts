import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ITabElements } from 'src/app/components/domain/tabnav-elements.interface';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { driverTabs } from './driver.tabnav.domain';

@Component({
  selector: 'driver-app-dashboard',
  templateUrl: './driver.dashboard.page.html',
  styleUrls: ['./driver.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class DriverDashboardPage implements OnInit, OnDestroy {
  public driverTabNavList: ITabElements[] = driverTabs;
  public currentState: IDriverState;
  private storeSuscription: Subscription;

  constructor(private driverStore: DriverStoreService) { }

  ngOnInit() {
    this.storeSuscription = this.driverStore.state$.subscribe((state) => {
      this.currentState = state;
      console.log('state passenger: ' + JSON.stringify(state));
    });
  }

  ngOnDestroy(): void {
    this.storeSuscription && this.storeSuscription.unsubscribe();
  }
}
