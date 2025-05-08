import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSlotComponent } from './booking-slot.component';
import { RouterModule } from '@angular/router';

describe('BookingSlotComponent', () => {
  let component: BookingSlotComponent;
  let fixture: ComponentFixture<BookingSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSlotComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
