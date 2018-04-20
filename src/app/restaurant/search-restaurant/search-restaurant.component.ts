import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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

  private searchTerms = new Subject<string>();

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      console.log(restaurants);
      this.restaurants = restaurants;
    })
  }

  search(term: string): void {
    this.restaurantService.transform(term);
  }

  //ngOnInit(): void{
  //this.restaurants = this.searchTerms.pipe(

  // wait 300ms after each keystroke before cosidering the term
  //debounceTime(300),

  // ignore new term if same as previous term
  //distinctUntilChanged(),

  // switchMap((term: string) => this.restaurantService.searchRestaurant(term))
  // )

  // }
}
