import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';
import { IDriverState } from '../../../stores/driver/driver.interfaces';
import { DriverStoreService } from '../../../stores/driver/driver.service';
import { titles } from './domain/titles.my-profile.domain';
import { mappers } from './mappers/my-profile.mappers';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DriverProfilePage implements OnInit {
  public currentState$: Observable<IDriverState>;
  public formItems: IFormItems[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly driverStore: DriverStoreService
  ) {}

  async ngOnInit() {
    await this.authService.getUserProfile(
      await this.authService.getUserIDfromSessionStorage()
    );
    this.currentState$ = this.driverStore.state$;
    this.currentState$.pipe(take(1)).subscribe((state) => {
      const profile = state.userProfile;

      Object.keys(profile).forEach((prop) =>
        this.formItems.push({
          value: mappers[prop](state.userProfile[prop]),
          name: titles[prop],
        })
      );
    });
  }
}

type IFormItems = {
  value: string;
  name: string;
};
