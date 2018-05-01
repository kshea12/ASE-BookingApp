import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ReservationComponent } from '@app/reservation/reservation.component';
import { ReservationService } from '@app/reservation/reservation.service';
import { ReservationRoutingModule } from '@app/reservation/reservation-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReservationRoutingModule
  ],
  declarations: [
    ReservationComponent,
  ],
  providers: [ReservationService]
})
export class ReservationModule { }
