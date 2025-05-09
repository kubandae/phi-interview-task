import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingCancelButtonComponent } from './booking-cancel-button.component';

describe('BookingCancelButtonComponent', () => {
  let component: BookingCancelButtonComponent;
  let fixture: ComponentFixture<BookingCancelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCancelButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCancelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
