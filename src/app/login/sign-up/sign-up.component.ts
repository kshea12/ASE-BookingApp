import { Component } from '@angular/core';
// import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import {passBoolean} from 'protractor/built/util';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ba-login',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

  googleLogo = 'assets/images/google.svg';
  facebookLogo = 'assets/images/facebook.svg';
  twitterLogo = 'assets/images/twitter.svg';
  emailLogo = 'assets/images/mail.svg';

  signInWithEmail = false;

  reactiveForm;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  restaurantName: string;
  restaurantCity: string;
  restaurantState: string;
  restaurantZipCode: string;
  restaurantCountry: string;

  constructor(/*private auth: AuthService, */private router: Router, private fb: FormBuilder) {

    this.reactiveForm = this.fb.group({
      'firstName': [this.firstName, Validators.required],
      'lastName': [this.lastName, Validators.required],
      'email': [this.email, Validators.required],
      'phoneNumber': [this.phoneNumber, Validators.required],
      'restaurantName': [this.restaurantName, Validators.required],
      'restaurantCity': [this.restaurantCity, Validators.required],
      'restaurantState': [this.restaurantState, Validators.required],
      'restaurantZipCode': [this.restaurantZipCode, Validators.required],
      'restaurantCountry': [this.restaurantCountry, Validators.required],
    });
  }

  googleSignUp() {
    // this.auth.googleSignUp().then(() => {
    //   this.router.navigate(['user-profile']);
    // });
    console.log('googleSignUp');
  }

  emailSignUpClick() {
    // this.signInWithEmail = !this.signInWithEmail;\
    console.log('emailSignUpClick');
  }

  submitNewRestaurant() {
    console.log('submitNewRestaurant');
  }
}
