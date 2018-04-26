import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseConfig } from '../firebase.config';
import { CoreModule } from './core/core.module';
import { KonvaModule } from 'ng2-konva'

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { EmailPasswordFormComponent } from './login/email-password-form/email-password-form.component';
import { SearchRestaurantComponent } from './restaurant/search-restaurant/search-restaurant.component';
import { TableSelectorComponent } from './restaurant/table-selector/table-selector.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    EmailPasswordFormComponent,
    SearchRestaurantComponent,
    TableSelectorComponent,
    ReservationComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    KonvaModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
