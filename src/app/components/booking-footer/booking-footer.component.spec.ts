import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingFooterComponent } from './booking-footer.component';

describe('BookingFooterComponent', () => {
  let component: BookingFooterComponent;
  let fixture: ComponentFixture<BookingFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
