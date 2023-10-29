import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Builder } from 'builder-pattern';
import { Subscription, lastValueFrom } from 'rxjs';
import { UsersRepositoryMappers } from '../../providers/db-api/mappers/users.mappers';
import { UserProfile } from '../../providers/db-api/model/users.model';
import { UsersRepository } from '../../providers/db-api/repositories/users.repository';
import { UserTypes } from '../../shared/domain/user-types.domain';
import { IPassengerState } from '../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../stores/passenger/passenger.service';
import { ILoginLocalStorage } from '../domain/login-local-storage.domain';
import { LoginResponse } from '../domain/login-response.domain';
import { INewUser } from '../domain/new-user.domain';
import { AuthServiceMapper } from './mapper/auth.mapper';
import { UserModel } from './model/user.model';

@Injectable()
export class AuthService implements OnInit {
  userDB: UserModel[] = [];
  private passengerStoreSuscription: Subscription;
  private driverStoreSuscription: Subscription;
  public passengerCurrentState: IPassengerState;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mapper: AuthServiceMapper,
    private passengerStore: PassengerStoreService,
    private userRepository: UsersRepository,
    private usersRepositoryMapper: UsersRepositoryMappers,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passengerStoreSuscription = this.passengerStore.state$.subscribe(
      (state) => (this.passengerCurrentState = state)
    );
  }

  public async getUserProfile(userId: number): Promise<ILoginLocalStorage> {
    try {
      const userProfiles = await lastValueFrom(
        this.usersRepository.getUserProfileById(userId)
      );
      const userType = this.setUserProfile(userProfiles[0]);
      return Builder<ILoginLocalStorage>()
        .status(true)
        .userType(userType)
        .userID(userProfiles[0].user_id)
        .build();
    } catch (error) {
      return Promise.reject('could not find user profile, error: ' + error);
    }
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

    const userProfileToSessionContext = await this.getUserProfile(
      loginResult.id
    );
    if (!userProfileToSessionContext)
      return Promise.resolve({
        status: false,
      } as LoginResponse);

    await Preferences.set({
      key: 'isLogged',
      value: JSON.stringify({
        status: true,
        userType: userProfileToSessionContext.userType,
        userID: userProfileToSessionContext.userID,
      } as ILoginLocalStorage),
    });

    return Promise.resolve({
      status: true,
      userType: userProfileToSessionContext.userType,
    } as LoginResponse);
  }

  authorizedLoggedRoutes(userInfo: UserTypes) {
    try {
      const dictionary = {
        [UserTypes.STUDENT]: () => this.router.navigate(['/passenger']),
        [UserTypes.DRIVER]: () => this.router.navigate(['/driver']),
        [UserTypes.ADMIN]: () => this.router.navigate(['/dashboard']),
      };

      return dictionary[userInfo.valueOf()]();
    } catch (error) {
      console.error('ERROR REDIRECTING TO USER ROUTING, REASON: ' + error);
      return this.router.navigate(['/error']);
    }
  }

  public logOut() {}

  public async registerNewUser(newUser: INewUser): Promise<void> {
    console.log(
      '🚀 ~ file: auth.service.ts:96 ~ AuthService ~ registerNewUser ~ newUser:',
      newUser
    );
    const isRegistered = await lastValueFrom(
      this.userRepository.addUser(
        this.usersRepositoryMapper.mapNewUserDomainToModel(newUser)
      )
    );

    return Promise.resolve();
  }

  async getUsers() {
    return await lastValueFrom(this.usersRepository.getUsers());
  }
}
