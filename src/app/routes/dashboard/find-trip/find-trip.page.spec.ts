import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindTripPage } from './find-trip.page';

describe('FindTripPage', () => {
  let component: FindTripPage;
  let fixture: ComponentFixture<FindTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
