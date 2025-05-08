import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingThankYouComponent } from './booking-thank-you.component';
import { RouterModule } from '@angular/router';

describe('BookingThankYouComponent', () => {
  let component: BookingThankYouComponent;
  let fixture: ComponentFixture<BookingThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingThankYouComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
