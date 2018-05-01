import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from '@app/restaurant/restaurant.component';
import { ReservationComponent } from '@app/restaurant/reservation/reservation.component';
import { TableSelectorComponent } from '@app/restaurant/table-selector/table-selector.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantComponent,
    data: {
      title: 'Restaurants'
    }
  },
  {
    path: 'restaurant/:name',
    component: ReservationComponent,
    data: {
      title: 'Restaurant Reservations'
    }
  },
  {
    path: 'table-selector',
    component: TableSelectorComponent,
    data: {
      title: 'Select Table'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
