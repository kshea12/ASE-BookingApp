import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { ReservationService } from '../services/reservation.service';
import { Restaurant } from '../models/Restaurant';


@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService,
              private reservationService: ReservationService,
              private router: Router) {}


  ngOnInit() {
    // subscribe to all restaurants
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  viewRestaurant(restaurant: Restaurant) {
    console.log('calling retrieveReservationForRestaurant');
    this.reservationService.retrieveReservationsForRestaurant(restaurant.id);

    // re-route to restaurant component
    this.router.navigate(['restaurant', restaurant.name]);
  }
}
