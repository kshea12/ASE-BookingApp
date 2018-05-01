import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from '@app/reservation/reservation.component';

const routes: Routes = [
  {
    path: 'restaurant/:name',
    component: ReservationComponent,
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
