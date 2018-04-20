import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { KonvaModule } from 'ng2-konva';

enum Position {
  firstRow = 152,
  secondRow = 263,
  thirdRow = 372,

  firstColumn = 90,
  secondColumn = 225,
  thirdColumn = 358
}

@Component({
  selector: 'table-selector',
  templateUrl: './table-selector.component.html',
  styleUrls: ['./table-selector.component.css']
})

export class TableSelectorComponent implements OnInit {

  tableForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.floorplanStage.next({
        width: 800,
        height: 520
      });
    }, 1000);
  }

  createForm() {
    this.tableForm = this.fb.group({
      reservedFor: ['', Validators.required]
    })
  }

  public floorplanStage = new BehaviorSubject({
    width: 800,
    height: 520
  });

  public table1 = Observable.of({
    x: Position.firstColumn,
    y: Position.firstRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table2 = Observable.of({
    x: Position.firstColumn,
    y: Position.secondRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table3 = Observable.of({
    x: Position.firstColumn,
    y: Position.thirdRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table4 = Observable.of({
    x: Position.secondColumn,
    y: Position.firstRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table5 = Observable.of({
    x: Position.secondColumn,
    y: Position.secondRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table6 = Observable.of({
    x: Position.secondColumn,
    y: Position.thirdRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table7 = Observable.of({
    x: Position.thirdColumn,
    y: Position.secondRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table8 = Observable.of({
    x: Position.thirdColumn,
    y: Position.thirdRow,
    radius: 25,
    fill: 'green',
    stroke: 'black',
  });

  public table1Click(component) {
    this.createForm();
    console.log('testing...', component);
  }

  public table2Click(component) {
    this.createForm();
  }

}
