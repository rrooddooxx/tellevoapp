import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileDomain } from '../shared/domain/user-profile.domain';
import { IDriverState } from './driver.interfaces';

@Injectable()
export class DriverStoreService {
  private initialState: IDriverState = {
    driverName: '',
    userProfile: null,
  };
  private state = new BehaviorSubject<IDriverState>(this.initialState);
  public state$ = this.state.asObservable();

  constructor() {}

  updateState(newState: IDriverState): void {
    return this.state.next({
      ...this.state.value,
      ...newState,
    });
  }

  setUserProfile(profile: UserProfileDomain) {
    this.updateState({
      userProfile: profile,
    } as IDriverState);
  }
}
