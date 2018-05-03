import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '@app/reservation/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  newReservation: Reservation;
  reservations: Reservation[];

  reactiveForm: FormGroup;
  selectedDate: string;
  selectedTime: string;
  selectedPartySize: string;
  selectedRestaurant: string;
  selectedTableNumber: string;


  constructor(private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private location: Location) {
    const details = this.reservationService.getReservationDetails();
    const date = new Date();
    const index = details.date.toString().indexOf(date.getFullYear().toString()) + 4;
    this.selectedDate = details.date.toString().slice(0, index);
    this.selectedTime = details.time;
    this.selectedPartySize = details.partySize;
    this.selectedRestaurant = details.restaurantID;
    this.selectedTableNumber = details.tableNumber;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.reactiveForm = this.fb.group({
      'date': [this.selectedDate, Validators.required],
      'time': [this.selectedTime, Validators.required],
      'partySize': [this.selectedPartySize, Validators.required],
      'tableNumber': [this.selectedRestaurant, Validators.required]
    });
  }

  goBack() {
    this.location.back();
  }

  addReservation(reservation: Reservation) {
    this.reservationService.addReservation(this.newReservation);
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(this.newReservation);
  }

  updateReservation(reservation: Reservation) {
    this.reservationService.updateReservation(this.newReservation);
  }

  filterReservations(date: string, time: string) {
    this.filterReservationByDate(date);
    this.filterReservationsByTime(time);
  }

  filterReservationByDate(requestedDate: string) {
    this.reservations = this.reservations.filter(reservation =>
      reservation.date === requestedDate);
  }

  // filter out from time requested to an hour later
  filterReservationsByTime(requestedTime: string) {
    const anHourAfterRequestedTime = (parseInt((requestedTime + 100), 10));

    this.reservations = this.reservations.filter(reservation =>
      reservation.time >= requestedTime).filter(reservation =>
        reservation.time < anHourAfterRequestedTime.toString());
  }

  ngOnSubmit() {
    if (this.reactiveForm.valid) {
      this.newReservation = this.reactiveForm.value;
      this.addReservation(this.newReservation);
      this.newReservation = new Reservation();

    }

  }

}
