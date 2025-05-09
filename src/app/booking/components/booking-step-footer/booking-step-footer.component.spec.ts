import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingStepFooterComponent } from './booking-step-footer.component';

describe('BookingStepFooterComponent', () => {
  let component: BookingStepFooterComponent;
  let fixture: ComponentFixture<BookingStepFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStepFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingStepFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
