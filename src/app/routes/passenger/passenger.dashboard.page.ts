import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ITabElements } from '../../components/domain/tabnav-elements.interface';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { AuthService } from '../../modules/auth/auth.service';
import { ILoginLocalStorage } from '../../modules/domain/login-local-storage.domain';
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
export class PassengerDashboardPage implements OnInit {
  public passengerTabNavList: ITabElements[] = passengerTabs;
  public currentState$: Observable<IPassengerState>;

  constructor(
    private passengerStore: PassengerStoreService,
    private authService: AuthService
  ) {}

  async getUserIDfromSessionStorage() {
    const userLoggedSession = await Preferences.get({ key: 'isLogged' });
    const userInfo = JSON.parse(userLoggedSession.value) as ILoginLocalStorage;
    return userInfo.userID;
  }

  async ngOnInit() {
    await this.authService.getUserProfile(
      await this.getUserIDfromSessionStorage()
    );
    this.currentState$ = this.passengerStore.state$;
  }
}
