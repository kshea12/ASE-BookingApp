import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { RestaurantService } from '@app/restaurant/restaurant.service';
import { Restaurant } from '@app/models/Restaurant';

@Component({
  selector: 'search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css']
})
export class SearchRestaurantComponent {

  restaurants: Restaurant[];
  selectedRestaruant;

  constructor(
    private restaurantService: RestaurantService,
    // private reservationService: ReservationService,
    private router: Router) {
  }

  ngOnInit() {
    // subscribe to all restaurants
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  viewRestaurant(restaurant: Restaurant){

    console.log('calling retrieveReservationForRestaurant');

    // TODO this method doesnt exist
    // this.reservationService.retrieveReservationsForRestaurant(restaurant.id);
    //
    // re-route to restaurant component
    this.router.navigate(['restaurant', restaurant.name]);
  }
}
