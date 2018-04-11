import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/Restaurant'

@Injectable()
export class TableSelectionService {

  restaurantList: AngularFirestoreCollection<Restaurant>;
  restaurants: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.restaurants = this.afs.collection('restaurants').valueChanges();
  }

  getRestaurants(){
    return this.restaurants;
  }
}



