import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant-service';
import { ReservationService } from '../../reservation/reservation.service';
import { Restaurant } from '../../models/Restaurant';

@Component({
  selector: 'search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css'],
  providers: [RestaurantService, ReservationService]
})
export class SearchRestaurantComponent {

  restaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
    private router: Router) {
  }

  ngOnInit() {
    // subscribe to all restaurants
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    })
  }

  viewRestaurant(restaurant: Restaurant){

    console.log('calling retrieveReservationForRestaurant');
    this.reservationService.retrieveReservationsForRestaurant(restaurant.id);
    
    // re-route to restaurant component
    this.router.navigate(['restaurant', restaurant.name]);
  }
}
