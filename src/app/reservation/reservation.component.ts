import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '@app/reservation/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from '@app/models/Table';
import { Restaurant } from '@app/models/Restaurant';
import { AuthGuardService } from '@app/core/auth/auth-guard.service';
import { SignInComponent } from '@app/login/sign-in/sign-in.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

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
  selectedRestaurant: Restaurant;
  selectedTable: Table;

  constructor(private fb: FormBuilder,
              private authGuard: AuthGuardService,
              private reservationService: ReservationService,
              private dialog: MatDialog,
              private router: Router) {
    const details = this.reservationService.getReservationDetails();
    // const date = new Date();
    // const index = details.date.toString().indexOf(date.getFullYear().toString()) + 4;
    this.selectedDate = details.date; // .toString().slice(0, index);
    this.selectedTime = details.time;
    this.selectedPartySize = details.partySize;
    this.selectedRestaurant = details.restaurant;
    this.selectedTable = details.table;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.reactiveForm = this.fb.group({
      'date': [this.selectedDate, Validators.required],
      'time': [this.selectedTime, Validators.required],
      'partySize': [this.selectedPartySize, Validators.required],
      'tableNumber': [this.selectedTable.tableNumber, Validators.required]
    });
  }

  addReservation(reservation: Reservation) {
    this.reservationService.addReservation(reservation);
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation);
  }

  updateReservation(reservation: Reservation) {
    this.reservationService.updateReservation(reservation);
  }

  // filterReservations(date: string, time: string) {
  //   this.filterReservationByDate(date);
  //   this.filterReservationsByTime(time);
  // }
  //
  // filterReservationByDate(requestedDate: string) {
  //   this.reservations = this.reservations.filter(reservation =>
  //     reservation.date === requestedDate);
  // }
  //
  // // filter out from time requested to an hour later
  // filterReservationsByTime(requestedTime: string) {
  //   const anHourAfterRequestedTime = (parseInt((requestedTime + 100), 10));
  //
  //   this.reservations = this.reservations.filter(reservation =>
  //     reservation.time >= requestedTime).filter(reservation =>
  //     reservation.time < anHourAfterRequestedTime.toString());
  // }

  ngOnSubmit() {
    if (this.authGuard.canActivate()) {
      if (this.reactiveForm.valid) {
        this.newReservation = this.reactiveForm.value;
        this.addReservation(this.newReservation);
        this.newReservation = new Reservation();
        this.router.navigate(['home']);
      }
    } else {
      const dialogConfig = new MatDialogConfig();
      this.dialog.open(SignInComponent, dialogConfig);
    }
  }
}
