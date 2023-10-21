import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { UserModel } from '../login/model/user.model';

@Component({
<<<<<<<< HEAD:src/app/routes/passenger/passenger.dashboard.page.ts
  selector: 'passenger-app-dashboard',
  templateUrl: './passenger.dashboard.page.html',
  styleUrls: ['./passenger.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class PassengerDashboardPage implements OnInit {
  constructor() {}
========
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class DriverPage implements OnInit {
  public userInfo: UserModel = {} as UserModel;
>>>>>>>> f92781427f2e8769653f8a5c4758cda21e9ccf11:src/app/routes/driver/driver.page.ts

  constructor(private readonly router: Router) {}

  ngOnInit() {
  }
}