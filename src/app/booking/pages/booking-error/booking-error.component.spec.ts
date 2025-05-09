import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingErrorComponent } from './booking-error.component';
import { RouterModule } from '@angular/router';

describe('BookingErrorComponent', () => {
  let component: BookingErrorComponent;
  let fixture: ComponentFixture<BookingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingErrorComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
