import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../models/Reservation';

@Injectable()
export class ReservationService {

  reservationCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  reservationDoc: AngularFirestoreDocument<Reservation>;

  constructor(private afs: AngularFirestore) {
    console.log('New instance of Reservationservice created');
  }

  // a restaurant id is used to retrieve a collection of all resrvation for a restaurant and puts them into
  // an observable array of reservations
  retrieveReservationsForRestaurant(restaurantID: string) {
    console.log('retrieveReservationsForRestaurant');

    console.log(restaurantID);

    this.reservationCollection = this.afs.collection('restaurants')
      .doc(restaurantID).collection('reservations');

    console.log('saving rerservationcollection');

    this.reservations = this.reservationCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Reservation;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    console.log('exiting');
  }

   // subscribable array of reservation for observers
  getReservations() {
    console.log('returning reservations');
    return this.reservations;
  }

  // add a reservation document into thte firebase reservation collection for a restaurant
  addReservation( reservation: Reservation) {
    // this.afs.collection('restaurants').doc(restaurantName).collection('reservations').add(reservation);
    this.reservationCollection.add(reservation);
  }

  // delete a reservation document from the firebase reservation collection for a restaurant
  deleteReservation( reservation: Reservation) {
    this.reservationDoc = this.reservationCollection.doc(reservation.id);
    this.reservationDoc.delete();
  }

  // update a reservation document form the firebase reservation collection
  updateReservation( reservation: Reservation) {
    this.reservationDoc = this.reservationCollection.doc(reservation.id);
    this.reservationDoc.update(reservation);
  }
}
