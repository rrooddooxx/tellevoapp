import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDriverState } from './driver.interfaces';

@Injectable()
export class DriverStoreService {
  private initialState: IDriverState = {
    driverID: 0,
    currentTripID: 0,
    vehicleID: 0
  };
  private state = new BehaviorSubject<IDriverState>(this.initialState);
  public state$ = this.state.asObservable();

  constructor() { }

  updateState(newState: IDriverState): void {
    return this.state.next({
      ...this.state.value,
      ...newState,
    });
  }
}
