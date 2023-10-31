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
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DbModule } from 'src/app/providers/db-api/db.module';
import { UsersRepository } from 'src/app/providers/db-api/repositories/users.repository';
import { validators } from 'src/app/utils/validators';
import { AuthService } from '../../modules/auth/auth.service';
import { INewUser } from '../../modules/domain/new-user.domain';
import { CareerRepository } from '../../providers/db-api/repositories/careers.repository';
import { ICareers } from './domain/careers.domain';
import { UserTypeRegistration } from './domain/user-register-form.domain';
import { RegisterMappers } from './mappers/register.mapper';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DbModule,
  ],
})
export class RegisterPage implements OnInit {
  public showPasswordError: boolean = false;
  public emailRegex: string = validators.emailRegex;
  public form: FormGroup;
  public UserTypeRegistration = UserTypeRegistration;
  public careerList: ICareers[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private careerRepository: CareerRepository,
    private mapper: RegisterMappers,
    private router: Router
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.createForm();
    this.getCareers();
  }

  getCareers() {
    this.careerRepository.getCareers().subscribe((careers) => {
      this.careerList = this.mapper.mapCareerModelToDomain(careers);
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      rut: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(9),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      tel: new FormControl('', [Validators.required]),
      gender: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
      ]),
      usertype: new FormControl(UserTypeRegistration, [Validators.required]),
      career: new FormControl(''),
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

  async doRegister() {
    const newUser: INewUser = {
      user_name: this.form.get('name')?.value,
      user_rut: this.form.get('rut')?.value,
      user_pwd: this.form.get('password')?.value,
      user_email: this.form.get('email')?.value,
      user_phone: this.form.get('tel')?.value,
      user_lastname: this.form.get('lastname')?.value,
      user_gender: this.form.get('gender')?.value,
      user_type: this.mapper.mapUserTypeValueToDomain(
        this.form.get('usertype')?.value
      ),
      user_career: this.form.get('career')?.value,
      user_ranking: 0,
    };

    await this.authService.registerNewUser(newUser);
  }

  clearFields() {
    this.form.reset();
  }
}
