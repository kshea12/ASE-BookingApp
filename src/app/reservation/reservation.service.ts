import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../models/Reservation';

@Injectable()
export class ReservationService {

  reservationCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  reservationDoc: AngularFirestoreDocument<Reservation>;

  testReservation: Reservation;

  constructor(private afs: AngularFirestore) {
    console.log('in constructor of reservationservice');
    // this.retrieveReservationsForRestaurant('367H6KcykbcwZKCdHolA');
  }

  // a restaurant id is used to retrieve a collection of all resrvation for a restaurant and puts them into
  // an observable array of reservations
  retrieveReservationsForRestaurant(restaurantID: string) {
    console.log(restaurantID);

    this.reservationCollection = this.afs.collection('restaurants')
      .doc(restaurantID).collection('reservations');

    // test
    this.testReservation = {
      date: '04/29/18',
      partySize: 4,
      tableNumber: 2,
      time: '1100 '
    };

    // test
    // this.afs.collection('restaurants').doc(restaurantID).collection('reservations').add(this.testReservation);

    // this.reservationCollection = this.afs.collection('restaurants').doc('367H6KcykbcwZKCdHolA').collection('reservations');
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
  addReservation(reservation: Reservation) {
    // this.afs.collection('restaurants').doc(restaurantName).collection('reservations').add(reservation);
    this.reservationCollection.add(reservation);
  }

  // delete a reservation document from the firebase reservation collection for a restaurant
  deleteReservation(reservation: Reservation) {
    // this.reservationDoc = this.afs.doc('restaurants/${restaurantName}/reservations/${reservation.id}');
    this.reservationDoc = this.reservationCollection.doc(reservation.id);
    this.reservationDoc.delete();
  }

  // update a reservation document form the firebase reservation collection
  updateReservation(reservation: Reservation) {
    // this.reservationDoc = this.afs.doc('restaurants/${restaurantName}/reservations/${reservation.id}');
    this.reservationDoc = this.reservationCollection.doc(reservation.id);
    this.reservationDoc.update(reservation);
  }
}
