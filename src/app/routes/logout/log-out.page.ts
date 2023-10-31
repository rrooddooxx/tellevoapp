import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../../modules/auth/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.page.html',
  styleUrls: ['./log-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LogOutPage implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.authService.logOut();
    await this.navCtrl.navigateForward(['/'], {
      replaceUrl: true,
      animated: false,
    });
  }
}
