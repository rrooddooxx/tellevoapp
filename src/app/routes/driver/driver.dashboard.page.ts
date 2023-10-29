import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ITabElements } from 'src/app/components/domain/tabnav-elements.interface';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { DriverStoreService } from 'src/app/stores/driver/driver.service';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { driverTabs } from './driver.tabnav.domain';
import { Preferences } from '@capacitor/preferences';
import { ILoginLocalStorage } from 'src/app/modules/domain/login-local-storage.domain';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'driver-app-dashboard',
  templateUrl: './driver.dashboard.page.html',
  styleUrls: ['./driver.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class DriverDashboardPage implements OnInit, OnDestroy {
  public driverTabNavList: ITabElements[] = driverTabs;
  public currentState$: Observable<IDriverState>;
  private storeSuscription: Subscription;

  constructor(
    private driverStore: DriverStoreService,
    private authService: AuthService
    ) { }

  ngOnDestroy(): void {
    this.storeSuscription && this.storeSuscription.unsubscribe();
  }

  async getUserIDfromSessionStorage() {
    const userLoggedSession = await Preferences.get({ key: 'isLogged' });
    const userInfo = JSON.parse(userLoggedSession.value) as ILoginLocalStorage;
    return userInfo.userID;
  }

  async ngOnInit() {
    await this.authService.getUserProfile(
      await this.getUserIDfromSessionStorage()
    );
    this.currentState$ = this.driverStore.state$;
  }
}
