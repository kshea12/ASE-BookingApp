import { NgModule } from '@angular/core';
import { RestaurantComponent } from './restaurant.component';
import { TableSelectorComponent } from './table-selector/table-selector.component';
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';

import { RestaurantService } from './restaurant.service';
import { TableService } from '@app/restaurant/table.service';

import { SharedModule } from '@app/shared';
import { KonvaModule } from 'ng2-konva';
import { RestaurantRoutingModule } from '@app/restaurant/restaurant-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RestaurantRoutingModule,
    KonvaModule
  ],
  declarations: [
    RestaurantComponent,
    SearchRestaurantComponent,
    TableSelectorComponent,
  ],
  providers: [RestaurantService, TableService]
})
export class RestaurantModule { }
