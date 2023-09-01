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
import { ApiService } from 'src/app/providers/db-api/api.service';
import { validators } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  public showPasswordError: boolean = false;
  public emailRegex = validators.emailRegex;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly apiProvider: ApiService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      rut: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(9),
      ]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [
        Validators.required,
      ]),
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

  async onSubmit() {
    if (
      this.form.get('password')?.value !==
      this.form.get('repeatPassword')?.value
    ) {
      this.showPasswordError = true;
    }

    if (
      this.form.valid &&
      this.form.get('password')?.value ===
      this.form.get('repeatPassword')?.value
    ) {
      this.showPasswordError = false;
      this.doRegister();
    }
  }

  doRegister() {
    const newUser = {
      "user_name": this.form.get('name')?.value,
      "rut": this.form.get('rut')?.value,
      "user_pwd": this.form.get('password')?.value,
      "user_email": this.form.get('email')?.value,
      "user_phone": this.form.get('tel')?.value
    }

    this.apiProvider.addUser(newUser).subscribe();

    const userInfoState: NavigationExtras = {
      state: {
        newUser,
      },
    };

    this.router.navigate(['/home'], userInfoState);
  }

  clearFields() {
    this.form.reset();
  }
}
