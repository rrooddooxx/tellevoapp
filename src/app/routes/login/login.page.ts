import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthService } from '../../modules/auth/auth.service';
import { DbModule } from '../../providers/db-api/db.module';
import { UserLoginInput } from './domain/user-login-input.domain';
import { UserModel } from './model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DbModule, AuthModule],
})
export class LoginPage implements OnInit {
  public userLoginInput: UserLoginInput = {
    userEmail: '',
    userPwd: '',
  };
  public showLoginError: boolean = false;
  public showInputError: boolean = false;
  userDB: UserModel[] = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.clearLoginCredentials();
  }

  ngOnInit() {}

  clearLoginCredentials() {
    this.userLoginInput.userEmail = '';
    this.userLoginInput.userPwd = '';
  }

  doLogin(loginCredentials: UserLoginInput): UserModel | void {
    if (!loginCredentials?.userEmail || !loginCredentials?.userPwd) {
      this.showInputError = true;
      this.showLoginError = true;
    }

    const loginResult = this.authService.logIn(
      loginCredentials.userEmail,
      loginCredentials.userPwd
    );

    if (!loginResult) {
      this.showLoginError = true;
      return;
    }
  }

  doAuthorize(userInfo: UserModel): void {
    const userInfoState: NavigationExtras = {
      state: {
        user: userInfo,
      },
    };

    this.router.navigate(['/dashboard'], userInfoState);
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }

  goToResetPwd() {
    this.router.navigate(['/reset-password']);
  }
}
