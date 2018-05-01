import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from '@app/restaurant/restaurant.component';
import { TableSelectorComponent } from '@app/restaurant/table-selector/table-selector.component';
import { SearchRestaurantComponent } from '@app/restaurant/search-restaurant/search-restaurant.component';

const routes: Routes = [
  {
    path: 'restaurant',
    component: RestaurantComponent,
    data: {
      title: 'Restaurant'
    }
  },
  {
    path: 'search-restaurant',
    component: SearchRestaurantComponent,
    data: {
      title: 'Search Restaurants'
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
