import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../models/Restaurant';

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})

export class RestaurantComponent implements OnInit {

  selectedRestaurant: Restaurant;

  constructor(
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    console.log('ngOnItin ResstaurantComponent');

    // subscribe to selected restaurant
    this.restaurantService.getSelectedRestaurant().subscribe(restaurant => {
     this.selectedRestaurant = restaurant;
    });
  }
}
