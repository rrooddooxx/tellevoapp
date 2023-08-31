import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { userDB } from '../../../data/user.db';
import { UserLoginInput } from './domain/user-login-input.domain';
import { UserModel, UserType } from './model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  public userLoginInput: UserLoginInput = {
    userEmail: '',
    userPwd: '',
  };
  public showLoginError: boolean = false;
  public showInputError: boolean = false;

  constructor(private readonly router: Router) {
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

    const loginResult: UserModel | undefined = userDB.find(
      (user) =>
        user.email === loginCredentials.userEmail &&
        user.password === loginCredentials.userPwd
    );
    if (!loginResult) {
      this.showLoginError = true;
      return;
    }

    this.doAuthorize(loginResult);
  }

  doAuthorize(userInfo: UserModel) {
    const userInfoState: NavigationExtras = {
      state: {
        userInfo,
      },
    };

    return userInfo.user_type === UserType.ADMIN
      ? this.router.navigate(['/home'], userInfoState)
      : this.router.navigate(['/home'], userInfoState);
  }
}
