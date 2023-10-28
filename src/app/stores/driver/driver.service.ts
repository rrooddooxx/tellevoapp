import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDriverState } from './driver.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DriverStoreService {
  private initialState: IDriverState = {
    driverName: '',
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
}
