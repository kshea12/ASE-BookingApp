import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { LoginRoutingModule } from './login-routing.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmailPasswordFormComponent } from './email-password-form/email-password-form.component';

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [SignUpComponent, SignInComponent, EmailPasswordFormComponent],
  entryComponents: [SignInComponent],
})
export class LoginModule {}
