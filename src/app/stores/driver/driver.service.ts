import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileDomain } from '../shared/domain/user-profile.domain';
import { IDriverState } from './driver.interfaces';

@Injectable()
export class DriverStoreService {
  private initialState: IDriverState = {
    currentTripID: 0,
    userProfile: {} as UserProfileDomain,
  };
  private state = new BehaviorSubject<IDriverState>(this.initialState);
  public state$ = this.state.asObservable();
  public currentState: IDriverState;

  constructor() {}

  updateState(newState: IDriverState): void {
    this.state.next({
      ...this.state.value,
      ...newState,
    });
  }

  getState() {
    this.state$.subscribe((state) => (this.currentState = state));
    return this.currentState;
  }

  setUserProfile(profile: UserProfileDomain) {
    this.updateState({
      userProfile: profile,
    } as IDriverState);
  }
}
