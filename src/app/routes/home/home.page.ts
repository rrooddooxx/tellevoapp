import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabnavComponent } from '../../components/tabnav/tabnav.component';
import { UserModel } from '../login/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabnavComponent],
})
export class HomePage implements OnInit {
  public userInfo: UserModel = {} as UserModel;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    console.log();
    if (this.router.getCurrentNavigation()?.extras?.state?.['user']) {
      this.userInfo =
        this.router.getCurrentNavigation()?.extras?.state?.['user'];
    }
  }
}
