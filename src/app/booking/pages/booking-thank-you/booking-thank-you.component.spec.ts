import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingThankYouComponent } from './booking-thank-you.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookingThankYouComponent', () => {
  let component: BookingThankYouComponent;
  let fixture: ComponentFixture<BookingThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingThankYouComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
