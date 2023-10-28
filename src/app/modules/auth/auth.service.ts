import { Injectable, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subscription, lastValueFrom } from 'rxjs';
import { UserProfile } from '../../providers/db-api/model/users.model';
import { UsersRepository } from '../../providers/db-api/repositories/users.repository';
import { UserTypes } from '../../shared/domain/user-types.domain';
import { IPassengerState } from '../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';
import { ILoginLocalStorage } from '../domain/login-local-storage.domain';
import { LoginResponse } from '../domain/login-response.domain';
import { AuthServiceMapper } from './mapper/auth.mapper';
import { UserModel } from './model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  userDB: UserModel[] = [];
  private passengerStoreSuscription: Subscription;
  private driverStoreSuscription: Subscription;
  public passengerCurrentState: IPassengerState;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mapper: AuthServiceMapper,
    private passengerStore: PassengerStoreService
  ) {}

  ngOnInit(): void {
    this.passengerStoreSuscription = this.passengerStore.state$.subscribe(
      (state) => (this.passengerCurrentState = state)
    );
  }

  private setUserProfile(userProfile: UserProfile): UserTypes {
    const profile = this.mapper.mapUserTypeIntoStore(userProfile);
    this.passengerStore.setUserProfile(profile);
    return profile.type_name;
  }

  public async logIn(
    userEmail: string,
    userPwd: string
  ): Promise<LoginResponse> {
    this.userDB = await this.getUsers();
    const loginResult: UserModel | undefined = this.userDB.find(
      (user) => user.user_email === userEmail && user.user_pwd === userPwd
    );
    const isLogged = loginResult && Object.keys(loginResult).length > 1;
    if (!isLogged)
      return {
        status: false,
      };

    const userProfiles = await lastValueFrom(
      this.usersRepository.getUserProfileById(loginResult.id)
    );
    if (!userProfiles) throw Error('Could not find user profile');
    const userType = this.setUserProfile(userProfiles[0]);
    await Preferences.set({
      key: 'isLogged',
      value: JSON.stringify({
        status: true,
        userType,
      } as ILoginLocalStorage),
    });
    return {
      status: true,
      userType,
    };
  }

  public logOut() {}

  async getUsers() {
    return await lastValueFrom(this.usersRepository.getUsers());
  }
}
