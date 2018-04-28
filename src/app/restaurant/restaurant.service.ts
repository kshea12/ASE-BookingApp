import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/Restaurant';
import { Reservation } from '../models/Reservation';

@Injectable()
export class RestaurantService {

  restaurantCollection: AngularFirestoreCollection<Restaurant>;
  restaurantDoc: AngularFirestoreDocument<Restaurant>;
  restaurants: Observable<Restaurant[]>;

  selectedRestaurant: Observable<Restaurant>;

  constructor(private afs: AngularFirestore) {
    console.log('restaurant service constructor');
    this.getAllRestaurants();
  }

  // gets a collection of all restaurants from database and puts them into
  // an oberservable array of restaurants
  private getAllRestaurants() {
    this.restaurantCollection = this.afs.collection('restaurants');

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

  getSelectedRestaurant(){
    return this.selectedRestaurant;
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



