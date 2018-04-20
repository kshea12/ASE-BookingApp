import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RestaurantService } from '../restaurant-service';
import { Restaurant } from '../../models/Restaurant'

@Component({
  selector: 'view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {
  restaurant: Restaurant[];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
   // id = +this.route.snapshot.paramMap.get('id');
   // this.restaurantService.getRestaurant(id)
   //   .subscribe(restaurant => this.restaurant = restaurant);
  }

  goBack() {
    this.location.back();
  }

  save()  {
   // this.restaurantService.updateRestaurant(this.restaurant)
   //   .subscribe(() => this.goBack());
  }

}
