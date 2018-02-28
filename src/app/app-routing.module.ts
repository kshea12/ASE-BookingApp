import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '',
    component: LoginComponent
  },
  { path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  // {
  //   path: 'about',
  //   component: AboutComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
