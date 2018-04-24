import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant-service';
import { Restaurant } from '../../models/Restaurant';

@Component({
  selector: 'search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css'],
  providers: [RestaurantService]
})
export class SearchRestaurantComponent {

  restaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    })
  }
}
