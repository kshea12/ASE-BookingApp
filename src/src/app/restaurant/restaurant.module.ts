import { NgModule } from '@angular/core';
import { RestaurantComponent } from './restaurant.component';
import { ReservationComponent} from './reservation/reservation.component';
import { RestaurantService } from '../services/restaurant.service';
import { ReservationService } from '../services/reservation.service';
import { TableSelectorComponent } from './table-selector/table-selector.component';
import { SharedModule } from '@app/shared';
import { ReservationModule } from '@app/reservation/reservation.module';
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
    ReservationComponent,
    TableSelectorComponent,
  ],
  providers: [RestaurantService, ReservationService]
})
export class RestaurantModule { }
