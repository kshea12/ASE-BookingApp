import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {

  newReservation: Reservation;
  reservations: Reservation[];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private location: Location) {
    this.reservationService.getReservations().subscribe(reservations => {
      console.log(reservations);
      this.reservations = reservations;
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  addReservation(reservation: Reservation) {
    this.reservationService.addReservation(this.newReservation);
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(this.newReservation);
  }

  updateReservation(reservation: Reservation) {
    this.reservationService.updateReservation(this.newReservation);
  }

  filterReservations(date: string, time: string) {
    this.filterReservationByDate(date);
    this.filterReservationsByTime(time);
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

}
