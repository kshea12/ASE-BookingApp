import { NgModule } from '@angular/core';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from './restaurant.service';
import { TableSelectorComponent } from './table-selector/table-selector.component';
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';
import { SharedModule } from '@app/shared';
import { ReservationModule } from '@app/reservation/reservation.module';
import { KonvaModule } from 'ng2-konva';
import { RestaurantRoutingModule } from '@app/restaurant/restaurant-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RestaurantRoutingModule,
    ReservationModule,
    KonvaModule
  ],
  declarations: [
    RestaurantComponent,
    SearchRestaurantComponent,
    TableSelectorComponent,
  ],
  providers: [RestaurantService]
})
export class RestaurantModule { }
