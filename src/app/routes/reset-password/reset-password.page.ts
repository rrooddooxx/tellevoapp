import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DbModule } from 'src/app/providers/db-api/db.module';
import { UsersRepository } from 'src/app/providers/db-api/repositories/users.repository';
import { EditUserRequest } from '../../providers/db-api/domain/users.domain';
import { validators } from '../../utils/validators';
import { UserModel } from '../login/model/user.model';
import { ResetPwdInputForm } from './domain/reset-pwd-input.domain';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DbModule,
  ],
})
export class ResetPasswordPage implements OnInit {
  public form: FormGroup;
  public emailRegex: string = validators.emailRegex;
  public isAlertOpen: boolean = false;
  public alertMsg: string = '';
  public alertButtons = ['OK!'];
  public showInputError = false;
  private dbUser: UserModel | undefined;
  private currentUser: ResetPwdInputForm = {} as ResetPwdInputForm;
  private editResult: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly userProvider: UsersRepository,
    private router: Router
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      rut: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.form.valid.valueOf()) return this.showInvalidFormError();

    this.currentUser = {
      userEmail: this.form.get('email')?.value,
      userRut: this.form.get('rut')?.value,
      userPwd: this.form.get('repeatPassword')?.value,
    };
    if (
      this.currentUser.userEmail &&
      this.currentUser.userPwd === this.form.get('password')?.value &&
      this.form.valid
    ) {
      this.showInputError = false;
      this.userProvider
        .getUserByEmail(this.currentUser.userEmail)
        .subscribe((data) => {
          const usersFound = data.find(
            (user) => user.user_email === this.currentUser.userEmail
          );

          if (usersFound?.user_pwd === this.currentUser.userPwd)
            return this.doShowAlert(true);
          else {
            this.dbUser = data.find(
              (user) => user.user_email === this.currentUser.userEmail
            );

            this.doChangePassword();
          }
        });
    }
  }

  doChangePassword() {
    if (this.dbUser && this.currentUser.userPwd) {
      const userToEdit: EditUserRequest = {
        id: this.dbUser.id,
        user_email: this.dbUser.user_email,
        user_name: this.dbUser.user_name,
        user_pwd: this.currentUser.userPwd,
      };
      this.userProvider.editUser(userToEdit).subscribe((response) => {
        this.editResult = response.status === 204;
        this.doShowAlert();
      });
    } else {
      this.editResult = false;
      this.doShowAlert();
    }
  }

  doResetForm() {
    this.form.reset();
  }

  doShowAbortAlert() {}

  doShowAlert(abort?: boolean): void {
    if (abort) {
      this.alertMsg =
        'Contraseña es idéntica a la actual. No se realizó cambio.';
      this.isAlertOpen = true;
      return;
    }

    this.alertMsg = `${
      this.editResult
        ? 'Contraseña actualizada exitosamente!'
        : 'Error actualizando contraseña'
    }`;
    this.isAlertOpen = true;
    if (this.editResult) return this.goToHome();
  }

  closeAlert() {
    this.isAlertOpen = false;
    this.doResetForm();
  }

  showInvalidFormError() {
    this.showInputError = true;
  }

  goToHome() {
    const userState: NavigationExtras = {
      state: {
        user: this.dbUser,
      },
    };
    this.router.navigate(['/home'], userState);
  }
}
