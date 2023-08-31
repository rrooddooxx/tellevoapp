import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  showPasswordError: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.get('password')?.value !== this.form.get('repeatPassword')?.value) {
      this.showPasswordError = true;
    }

    if (this.form.valid && this.form.get('password')?.value === this.form.get('repeatPassword')?.value) {
      this.showPasswordError = false;
      console.log('Registro exitoso!')
    }
  }

  clearFields() {
    this.form.reset()
  }

}
