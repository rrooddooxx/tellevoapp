import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';
import { IPassengerState } from '../../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../../stores/passenger/passenger.service';
import { titles } from './domain/titles.my-profile.domain';
import { mappers } from './mappers/my-profile.mappers';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MyProfilePage implements OnInit {
  public currentState$: Observable<IPassengerState>;
  public formItems: IFormItems[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly passengerStore: PassengerStoreService
  ) {}

  async ngOnInit() {
    await this.authService.getUserProfile(
      await this.authService.getUserIDfromSessionStorage()
    );
    this.currentState$ = this.passengerStore.state$;
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
