import { Injectable } from '@angular/core';
import { Table } from '@app/models/Table';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TableService {

  tableCollection: AngularFirestoreCollection<Table>;
  tables: Observable<Table[]>;

  constructor(private afs: AngularFirestore) {}

  // a restaurant id is used to retrieve a collection of all tables for a restaurant and puts them into
  // an observable array of tables
  retrieveTablesForRestaurant(restaurantID: string) {
    console.log('retrieveTablesForRestaurant');

    console.log(restaurantID);

    this.tableCollection = this.afs.collection('restaurants').doc(restaurantID).collection('tables');

    console.log('saving tableCollection');

    this.tables = this.tableCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Table;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    console.log('exiting');
  }

  // subscribable array of reservation for observers
  getTables(restaurantID: string) {
    console.log('returning tables');
    this.tableCollection = this.afs.collection('restaurants').doc(restaurantID).collection('tables');

    return this.tables = this.tableCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Table;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

}
