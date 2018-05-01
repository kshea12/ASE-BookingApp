import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ANIMATE_ON_ROUTE_ENTER } from '../../core/index';

@Component({
  selector: 'ba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  reactiveForm;

  partySizes = [
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5', label: '5 people' },
    { value: '6', label: '6 people' },
    { value: '7', label: '7 people' },
    { value: '8', label: '8 people' },
    { value: '9', label: '9 people' },
    { value: '10', label: '10 people' },
    { value: '11', label: '11 people' },
    { value: '12', label: '12 people' },
    { value: '13', label: '13 people' },
    { value: '14', label: '14 people' },
    { value: '15', label: '15 people' },
    { value: '15', label: '16 people' },
    { value: '16', label: '17 people' },
    { value: '18', label: '18 people' },
    { value: '19', label: '19 people' },
    { value: '20', label: '20 people' }
  ];
  selectedPartySize: string = this.partySizes[1].value;

  startDate = new Date();
  selectedDate = this.startDate;

  times = [
    { value: '1030', label: '10:30 AM' },
    { value: '1100', label: '11:00 AM' },
    { value: '1130', label: '11:30 AM' },
    { value: '1200', label: '12:00 PM' },
    { value: '1230', label: '12:30 PM' },
    { value: '1300', label: '1:00 PM' },
    { value: '1330', label: '1:30 PM' },
    { value: '1400', label: '2:00 PM' },
    { value: '1430', label: '2:30 PM' },
    { value: '1500', label: '3:00 PM' },
    { value: '1530', label: '3:30 PM' },
    { value: '1600', label: '4:00 PM' },
    { value: '1630', label: '4:30 PM' },
    { value: '1700', label: '5:00 PM' },
    { value: '1730', label: '5:30 PM' },
    { value: '1800', label: '6:00 PM' },
    { value: '1830', label: '6:30 PM' },
    { value: '1900', label: '7:00 PM' },
    { value: '1930', label: '7:30 PM' },
    { value: '2000', label: '8:00 PM' },
    { value: '2030', label: '8:30 PM' },
    { value: '2100', label: '9:00 PM' },
    { value: '2130', label: '9:30 PM' },
    { value: '2200', label: '10:00 PM' },
    { value: '2230', label: '10:30 PM' },
    { value: '2300', label: '11:00 PM' },
    { value: '2330', label: '11:30 PM' }
  ];
  selectedTime = this.times[17].value;

  constructor(private fb: FormBuilder) {

    this.reactiveForm = this.fb.group({
      'partySize': [this.selectedPartySize, Validators.required],
      'date': [this.selectedDate, Validators.required],
      'time': [this.selectedTime, Validators.required],
    });
  }

  ngOnInit() {}

  findTable() {
    console.log(this.selectedDate);
  }

}

