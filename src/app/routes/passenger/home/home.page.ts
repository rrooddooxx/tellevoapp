import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { TabnavComponent } from '../../../components/tabnav/tabnav.component';
import { IPassengerState } from '../../../stores/passenger/passenger.interfaces';
import { PassengerStoreService } from '../../../stores/passenger/passenger.service';
import { UserModel } from '../../login/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class HomePage implements OnInit {
  public userInfo: UserModel = {} as UserModel;
  public currentState: IPassengerState;

  constructor(
    private readonly router: Router,
    private readonly passengerStore: PassengerStoreService,
    private readonly navCtrl: NavController
  ) {}

  ngOnInit() {
    this.currentState = this.passengerStore.getState();
  }

  goToAvailableTrips() {
    this.navCtrl.navigateForward(['/passenger/find-trip']);
  }
}
