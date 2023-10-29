import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthService } from '../../modules/auth/auth.service';
import { ILoginLocalStorage } from '../../modules/domain/login-local-storage.domain';
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

  async ngOnInit() {
    const isLogged = await Preferences.get({
      key: 'isLogged',
    });
    if (isLogged?.value) {
      const loggedUser: ILoginLocalStorage = JSON.parse(
        isLogged.value?.toString?.()
      );
      loggedUser &&
        loggedUser.status &&
        this.authService.authorizedLoggedRoutes(loggedUser.userType);
    }
  }

  clearLoginCredentials() {
    this.userLoginInput.userEmail = '';
    this.userLoginInput.userPwd = '';
  }

  public async doLogin(
    loginCredentials: UserLoginInput
  ): Promise<UserModel | void> {
    if (!loginCredentials?.userEmail || !loginCredentials?.userPwd) {
      this.showInputError = true;
      this.showLoginError = true;
    }

    const loginResult = await this.authService.logIn(
      loginCredentials.userEmail,
      loginCredentials.userPwd
    );

    if (!loginResult) {
      this.showLoginError = true;
      return;
    }

    loginResult &&
      loginResult?.status &&
      this.authService.authorizedLoggedRoutes(loginResult.userType);
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }

  goToResetPwd() {
    this.router.navigate(['/reset-password']);
  }
}
