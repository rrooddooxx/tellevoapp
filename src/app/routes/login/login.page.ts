import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DbModule } from '../../providers/db-api/db.module';
import { UsersRepository } from '../../providers/db-api/repositories/users.repository';
import { UserLoginInput } from './domain/user-login-input.domain';
import { UserModel } from './model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DbModule],
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
    private readonly usersRepository: UsersRepository
  ) {
    this.clearLoginCredentials();
  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.usersRepository.getUsers().subscribe((data) => {
      this.userDB = data;
    });
  }

  clearLoginCredentials() {
    this.userLoginInput.userEmail = '';
    this.userLoginInput.userPwd = '';
  }

  doLogin(loginCredentials: UserLoginInput): UserModel | void {
    if (!loginCredentials?.userEmail || !loginCredentials?.userPwd) {
      this.showInputError = true;
      this.showLoginError = true;
    }

    const loginResult: UserModel | undefined = this.userDB.find(
      (user) =>
        user.user_email === loginCredentials.userEmail &&
        user.user_pwd === loginCredentials.userPwd
    );
    if (!loginResult) {
      this.showLoginError = true;
      return;
    }

    this.doAuthorize(loginResult);
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
