import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Restaurant } from '../models/Restaurant'
import { Reservation } from '../models/Reservation'

@Injectable()
export class RestaurantService {

  restaurantCollection: AngularFirestoreCollection<Restaurant>;
  restaurants: Observable<Restaurant[]>;
  restaurantDoc: AngularFirestoreDocument<Restaurant>;

  constructor(private afs: AngularFirestore) {
    this.getAllRestaurants();
  }

  // gets a collection of all restaurants from database and puts them into
  // an oberservable array of restaurants
  private getAllRestaurants() {
    this.restaurantCollection = this.afs.collection('restaurants',
      ref => ref.orderBy('name', 'asc'));

    this.restaurants = this.restaurantCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Restaurant;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  // subscribable array of restaurants for observers
  getRestaurants() {
    return this.restaurants;
  }

  // get a restaurant document by its name from the firebase restaurant collection
  getRestaurantDobByName(restaurantName: string) {
    this.restaurantDoc = this.afs.collection('restaurants').doc(restaurantName);
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



