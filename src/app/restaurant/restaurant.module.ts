import { NgModule } from '@angular/core';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from './restaurant.service';
import { TableSelectorComponent } from './table-selector/table-selector.component';
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';
import { SharedModule } from '@app/shared';
import { KonvaModule } from 'ng2-konva';

@NgModule({
  imports: [
    SharedModule,
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
