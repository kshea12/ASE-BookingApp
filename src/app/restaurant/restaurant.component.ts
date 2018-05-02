import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '@app/reservation/reservation.service';
import { TableService } from '@app/restaurant/table.service';
import { Table } from '@app/models/Table';
import { Reservation } from '@app/models/Reservation';
import { RestaurantService } from '@app/restaurant/restaurant.service';


@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurantID: string;
  partySize: string;
  date: string;
  time: string;

  tables: Table[];
  reservations: Reservation[];

  constructor(private tableService: TableService,
              private restaurantService: RestaurantService,
              private reservationService: ReservationService,
              private router: Router) {

    const criteria = this.restaurantService.getFilterCriteria();
    this.restaurantID = criteria.restaurantID;
    this.partySize = criteria.partySize;
    this.date = criteria.date;
    this.time = criteria.time;
  }


  ngOnInit() {
    this.tableService.getTables(this.restaurantID).subscribe(tables => {
      this.tables = tables;
      this.filterTablesBySize();
    });

    this.reservationService.getReservations(this.restaurantID).subscribe(reservations => {
      this.reservations = reservations;
      this.filterReservations();
      this.reservations.forEach(reservation => {
        this.tables = this.tables.filter(table => table.id !== reservation.tableNumber);
      });
    });

  }

  filterTablesBySize() {
    this.tables = this.tables.filter(table =>
      table.size >= this.partySize);
  }

  filterReservations() {
    this.filterReservationByDate(this.date);
    this.filterReservationsByTime(this.time);
  }

  filterReservationByDate(requestedDate: string) {
    this.reservations = this.reservations.filter(reservation =>
      reservation.date === requestedDate);
  }

  // filter out from time requested to an hour later
  filterReservationsByTime(requestedTime: string) {
    const anHourAfterRequestedTime = (parseInt((requestedTime + 100), 10));

    this.reservations = this.reservations.filter(reservation =>
      reservation.time >= requestedTime).filter(reservation =>
      reservation.time < anHourAfterRequestedTime.toString());
  }

  reserveTable(table: Table) {
    this.reservationService.setReservationDetails(this.restaurantID, this.partySize, this.date, this.time, table.id);
    this.router.navigate(['reservation']);
  }
}
