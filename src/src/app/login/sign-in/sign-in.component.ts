import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { passBoolean } from 'protractor/built/util';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ba-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {

  googleLogo = 'assets/images/google.svg';
  facebookLogo = 'assets/images/facebook.svg';
  twitterLogo = 'assets/images/twitter.svg';
  emailLogo = 'assets/images/mail.svg';

  signInWithEmail = false;
  data;

  constructor(private router: Router,
              private auth: AuthService,
              private dialogRef: MatDialogRef<SignInComponent>) {}


  googleSignUp() {
    this.dialogRef.close();
    this.auth.googleLogin(); // .then(() => {
    //   this.dialogRef.close();
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

  onNoClick() {

  }
}
