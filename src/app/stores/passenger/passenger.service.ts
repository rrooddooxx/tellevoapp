import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileDomain } from '../shared/domain/user-profile.domain';
import { IPassengerState } from './passenger.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PassengerStoreService {
  private initialState: IPassengerState = {
    currentTripID: '',
    userProfile: {} as UserProfileDomain,
  };
  private state = new BehaviorSubject<IPassengerState>(this.initialState);
  public currentState: IPassengerState;
  public state$ = this.state.asObservable();

  constructor() {}

  updateState(newState: IPassengerState): void {
    this.state.next({
      ...this.state.value,
      ...newState,
    });
    console.log('update: ' + this.state.value);
  }

  getState() {
    this.state$.subscribe((state) => (this.currentState = state));
    return this.currentState;
  }

  setUserProfile(profile: UserProfileDomain) {
    this.updateState({
      userProfile: profile,
    } as IPassengerState);
  }
}
