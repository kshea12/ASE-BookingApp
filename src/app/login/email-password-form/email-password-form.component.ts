import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'email-password-form',
  templateUrl: './email-password-form.component.html',
  styleUrls: ['./email-password-form.component.css']
})
export class EmailPasswordFormComponent implements OnInit {

  @Input() loginUI; // LoginComponent used for "Go Back" button
  emailLogo = 'assets/images/mail.svg';
  backArrow = 'assets/images/back-arrow.svg';

  emailUsed: boolean; // true if text has been inputted
  passwordUsed: boolean; // true if text has been inputted

  userForm: FormGroup;
  newUser = false; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email must be a valid email.',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.\n',
      'maxlength': 'Password cannot be more than 60 characters long.\n',
      'pattern': 'Password must not contain any spaces.\nPassword must include at least one letter and one number.\n',
    },
  };

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signup() {
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).catch( (error) => console.log('##########################################'));
  }

  goBack() {
    this.loginUI.signInWithEmail = !this.loginUI.signInWithEmail;
  }

  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern( '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'),
        // Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8),
        Validators.maxLength(60),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {

      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        if (field === 'email') {
          this.emailUsed = (form.value['email'].length > 0);

        } else if (field === 'password') {
          this.passwordUsed = (form.value['password'].length > 0);
        }
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }
}
