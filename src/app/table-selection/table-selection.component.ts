import { Component, OnInit } from '@angular/core';
import { TableSelectionService } from './table-selection.service';
import { Restaurant } from '../models/Restaurant';

@Component({
  selector: 'table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css'],
  providers: [TableSelectionService]
})

export class TableSelectionComponent {

  restaurants:Restaurant[];

  constructor(private tableSelectionService: TableSelectionService) {}

  ngOnInit(){
    this.tableSelectionService.getRestaurants().subscribe(restaurants =>{
      console.log(restaurants);
      this.restaurants = restaurants;
    })
  }
}
