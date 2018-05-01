import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { LoginModule } from '@app/login';
import { RestaurantModule } from '@app/restaurant/restaurant.module';

import { SettingsModule } from '@app/settings';
import { StaticModule } from '@app/static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    // core & shared
    CoreModule,
    SharedModule,

    // features
    LoginModule,
    RestaurantModule,
    SettingsModule,
    StaticModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
