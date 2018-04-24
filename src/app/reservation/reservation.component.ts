import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ReservationService } from './reservation.service'
import { Restaurant } from '../models/Restaurant'
import { Reservation } from '../models/Reservation'

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService]
})
export class ReservationComponent implements OnInit {

  currentRestaurantName = 'Panera'
  newReservation: Reservation;
  reservationsCollection: AngularFirestoreCollection<Reservation>;
  reservations: Reservation[];

  constructor(
    private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.reservationService.getReservations(this.currentRestaurantName).subscribe(reservations => {
      this.reservations = reservations;
    })

    // for testing purposes
    this.newReservation = {
      date: '04/29/18',
      partySize: 4,
      tableNumber: 2,
      time:'1100 '
    }
  }

  addReservation(reservation: Reservation){
    this.reservationService.addReservation(this.currentRestaurantName, this.newReservation);
  }

  deleteReservation(reservation: Reservation){
    this.reservationService.deleteReservation(this.currentRestaurantName, this.newReservation);
  }

  updateReservation(reservation: Reservation){
    this.reservationService.updateReservation(this.currentRestaurantName, this.newReservation);
  }

  filterReservations(date: string, time: string){
    this.filterReservationByDate(date);
    this.filterReservationsByTime(time);
  }

  filterReservationByDate(requestedDate: string){
    this.reservations = this.reservations.filter(reservation =>
      reservation.date == requestedDate);
  }

  // filter out from time requested to an hour later
  filterReservationsByTime(requestedTime: string){
    var anHourAfterRequestedTime = (parseInt(requestedTime) + 100);

    this.reservations = this.reservations.filter(reservation =>
      reservation.time >= requestedTime).filter(reservation =>
      reservation.time < anHourAfterRequestedTime.toString());
  }
}
