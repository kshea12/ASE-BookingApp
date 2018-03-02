import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import {passBoolean} from 'protractor/built/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  googleLogo = 'assets/images/google.svg';
  facebookLogo = 'assets/images/facebook.svg';
  twitterLogo = 'assets/images/twitter.svg';
  emailLogo = 'assets/images/mail.svg';

  signInWithEmail = false;

  constructor(private auth: AuthService, private router: Router) { }

  googleLogin() {
    this.auth.googleLogin().then(() => {
      this.router.navigate(['user-profile']);
    });
  }

  emailLoginClick() {
    this.signInWithEmail = !this.signInWithEmail;
  }
}
