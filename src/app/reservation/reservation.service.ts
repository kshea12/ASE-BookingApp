import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/Restaurant'
import { Reservation } from '../models/Reservation'

@Injectable()
export class ReservationService {

  reservationCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  reservationDoc: AngularFirestoreDocument<Reservation>;

  constructor(private afs: AngularFirestore) { }

  // gets a collection of all resrvation for a restaurant and puts them into
  // an observable array of reservations
  getAllReservationsForARestaurant(restaurantName: string) {
    this.reservationCollection = this.afs.collection('restaurants',
      ref => ref.where('name', '==', restaurantName));

    this.reservations = this.reservationCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Reservation;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  // subscribable array of reservation for observers
  getReservations(restaurantName: string) {
    this.getAllReservationsForARestaurant(restaurantName);
    return this.reservations;
  }

  // add a reservation document into thte firebase reservation collection for a restaurant
  addReservation(restaurantName: string, reservation: Reservation) {
    this.afs.collection('restaurants').doc(restaurantName).collection('reservations').add(reservation);
  }

  // delete a reservation document from the firebase reservation collection for a restaurant
  deleteReservation(restaurantName: string, reservation: Reservation) {
    this.reservationDoc = this.afs.doc('restaurants/${restaurantName}/reservations/${reservation.id}');
    this.reservationDoc.delete();
  }

  // update a reservation document form the firebase reservation collection
  updateReservation(restaurantName: string, reservation: Reservation) {
    this.reservationDoc = this.afs.doc('restaurants/${restaurantName}/reservations/${reservation.id}');
    this.reservationDoc.update(reservation);
  }
}