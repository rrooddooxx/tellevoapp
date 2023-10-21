import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { UserModel } from '../login/model/user.model';

@Component({
  selector: 'passenger-app-dashboard',
  templateUrl: './passenger.dashboard.page.html',
  styleUrls: ['./passenger.dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class DriverPage implements OnInit {
  public openCard: boolean = false;

  constructor(private readonly router: Router) {}

  toggleCard() {
    this.openCard = !this.openCard;
  }

  ngOnInit() {
  }
}