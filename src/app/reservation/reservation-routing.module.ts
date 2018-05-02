import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from '@app/reservation/reservation.component';
import { AuthGuardService } from '@app/core';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationComponent,
    // canActivate: [AuthGuardService],
    data: {
      title: 'Restaurant Reservations'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule {
}
