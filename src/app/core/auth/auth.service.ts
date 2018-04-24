import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { ActionAuthLogin, ActionAuthLogout } from './auth.reducer';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;
  snackBar: MatSnackBar;

  constructor(private store: Store<any>,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider); // .catch((error) => this.handleError(error));
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    // const provider = new firebase.auth.TwitterAuthProvider();
    // return this.oAuthLogin(provider);
    this.openSnackBar('this worked', 'error');
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        // this.notify.update('Welcome to ASE BookingApp!!!', 'success');
        this.store.dispatch(new ActionAuthLogin());
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.notify.update('Welcome to ASE BookingApp!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.notify.update('Welcome to ASE BookingApp!!!', 'success');
        return this.updateUserData(user);
      })
      .catch((error) => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
    // .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.store.dispatch(new ActionAuthLogout());
        // this.router.navigate(['']);
      }).catch((error) => this.handleError(error));
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error.name);
    // this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after successful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  openSnackBar(message, type) {// Simple message with an action.
    const snackBarRef = this.snackBar.open(message, 'Ok');
    // let extraClasses;
    // if (type === 'error') {
    //   extraClasses = ['background-red'];
    // } else {
    //   extraClasses = ['background-green'];
    // }
    //
    // this.snackBar.openFromComponent(SnackBarTemplateComponent, {
    //   duration: 30000,
    //   extraClasses: extraClasses,
    //   data: {
    //     message: message,
    //     type: type
    //   }
    // });
  }
}
