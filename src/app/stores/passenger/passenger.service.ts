import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPassengerState } from './passenger.interfaces';

@Injectable()
export class PassengerService {
  private initialState: IPassengerState = {
    currentTripID: '',
  };
  private state = new BehaviorSubject<IPassengerState>(this.initialState);
  public state$ = this.state.asObservable();

  constructor() {}

  updateState(newState: IPassengerState): void {
    this.state.next({
      ...this.state.value,
      ...newState,
    });
  }
}
