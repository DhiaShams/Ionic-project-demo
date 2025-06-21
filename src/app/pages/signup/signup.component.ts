import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  countries = [
    'Afghanistan', 'Australia', 'Austria', 'Chile', 'China', 'Combodia',
    'Finland', 'France', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Italy',
    'Zambia', 'Zimbabwe'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern('^[A-Za-z]+( [A-Za-z]+)*$')]],
      lname: ['', [Validators.required, Validators.pattern('^[A-Za-z]+( [A-Za-z]+)*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['male', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,20}$')]],
      confirm: ['', [Validators.required]],
      tac: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  get f() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirm')?.value
      ? null : { passwordMismatch: true };
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);
      // You can send data to your API here
    }
  }
}

