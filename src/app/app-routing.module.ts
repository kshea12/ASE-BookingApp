import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchRestaurantComponent } from './restaurant/search-restaurant/search-restaurant.component';
import { TableSelectorComponent } from './restaurant/table-selector/table-selector.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search-restaurant',
    component: SearchRestaurantComponent,
  },
  {
    path: 'table-selection',
    component: TableSelectorComponent,
  },
  {
    path: 'reservation-entry',
    component: ReservationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
