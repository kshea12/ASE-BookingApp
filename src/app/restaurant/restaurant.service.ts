import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/Restaurant';

@Injectable()
export class RestaurantService {

  restaurantCollection: AngularFirestoreCollection<Restaurant>;
  restaurantDoc: AngularFirestoreDocument<Restaurant>;
  restaurants: Observable<Restaurant[]>;

  restaurantID: string;
  partySize: string;
  date: string;
  time: string;

  constructor(private afs: AngularFirestore) {
    console.log('New instance of RestaurantService created');
    // this.getRestaurants();
  }

  // gets a collection of all restaurants from database and puts them into
  // an oberservable array of restaurants
  // subscribable array of restaurants for observers
  getRestaurants() {
    this.restaurantCollection = this.afs.collection('restaurants');

    return this.restaurants = this.restaurantCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Restaurant;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  setFilterCriteria(restaurantID: string, partySize: string, date: string, time: string) {
    this.restaurantID = restaurantID;
    this.partySize = partySize;
    this.date = date;
    this.time = time;
  }

  getFilterCriteria() {
    return {
      restaurantID: this.restaurantID,
      partySize: this.partySize,
      date: this.date,
      time: this.time
    };
  }

  // get a restaurant document by its ID from the firebase restaurant collection
  getRestaurantDocByID(restaurantID: string) {
    this.restaurantDoc = this.afs.collection('restaurants').doc(restaurantID);
    return this.restaurantDoc;
  }

  // add a restaurant document into the firebase restaurant collection
  addRestaurant(restaurant: Restaurant) {
    this.restaurantCollection.add(restaurant);
  }

  // delete a restaurant document from the firebase restaurant collection
  deleteRestaurant(restaurant: Restaurant) {
    this.restaurantDoc = this.afs.doc(`restaurants/${restaurant.id}`);
    this.restaurantDoc.delete();
  }

  // update a restaurant document from the firebase restaurant collection
  updateRestaurant(restaurant: Restaurant) {
    this.restaurantDoc = this.afs.doc(`restaurants/${restaurant.id}`);
    this.restaurantDoc.update(restaurant);
  }
}
