import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogOutPage } from './log-out.page';

describe('LogOutPage', () => {
  let component: LogOutPage;
  let fixture: ComponentFixture<LogOutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
