import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Restaurant } from '../models/Restaurant'

@Injectable()
export class RestaurantService implements PipeTransform {

  private restaurantUrl = 'restaurants/';

  restaurantCollection: AngularFirestoreCollection<Restaurant>;
  restaurant$: Observable<Restaurant[]>;

  restaurantDoc: AngularFirestoreDocument<Restaurant>;

  constructor(private afs: AngularFirestore) {

    this.restaurantCollection = this.afs.collection('restaurants');
    this.restaurantCollection.ref.orderBy('name', 'asc');

    this.restaurant$ = this.restaurantCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Restaurant;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getRestaurants() {
    return this.restaurant$;
  }

  getRestaurant(id: string): Observable<Restaurant[]> {
    const url = '${this.restaurantUrl}/?id=${id}';
    return this.restaurant$
      .map(restaurants => restaurants.filter(rest => rest.id === id));
  }

  insertRestaurant(restaurant: Restaurant) {
    this.restaurantCollection.add(restaurant);
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.restaurantDoc = this.afs.doc(`restaurants/${restaurant.id}`);
    this.restaurantDoc.delete();
  }

  updateRestaurant(restaurant: Restaurant) {
    this.restaurantDoc = this.afs.doc(`restaurants/${restaurant.id}`);
    this.restaurantDoc.update(restaurant);
  }

  transform(searchText: string) {
    if (!searchText.trim()) {
      return of([]);
    }

    this.restaurantCollection.ref.
      where('name', '==', searchText).
      orderBy('name', 'asc');
  }
}



