import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { ReservationService } from './reservation.service';
import { Reservation } from '../models/Reservation';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  newReservation: Reservation;
  reservationsCollection: AngularFirestoreCollection<Reservation>;
  reservations: Reservation[];

  constructor(private reservationService: ReservationService) {
    this.reservationService.getReservations().subscribe(reservations => {
      console.log(reservations);
      this.reservations = reservations;
    });
  }

  ngOnInit() {
    console.log('ngOninit reservation component');
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => this.reservations = reservations);

    // for testing purposes
    this.newReservation = {
      date: '04/29/18',
      partySize: 4,
      tableNumber: 2,
      time: '1100'
    };
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
    const anHourAfterRequestedTime = parseInt(requestedTime, 10) + 100;

    this.reservations = this.reservations.filter(reservation =>
      reservation.time >= requestedTime).filter(reservation =>
      reservation.time < anHourAfterRequestedTime.toString());

  }
}
