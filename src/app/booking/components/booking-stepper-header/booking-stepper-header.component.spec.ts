import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingStepperHeaderComponent } from './booking-stepper-header.component';

describe('BookingStepperHeaderComponent', () => {
  let component: BookingStepperHeaderComponent;
  let fixture: ComponentFixture<BookingStepperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStepperHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingStepperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
