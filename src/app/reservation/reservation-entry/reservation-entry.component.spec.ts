import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEntryComponent } from './reservation-entry.component';

describe('ReservationEntryComponent', () => {
  let component: ReservationEntryComponent;
  let fixture: ComponentFixture<ReservationEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
