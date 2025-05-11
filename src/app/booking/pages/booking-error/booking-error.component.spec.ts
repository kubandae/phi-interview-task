import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingErrorComponent } from './booking-error.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookingErrorComponent', () => {
  let component: BookingErrorComponent;
  let fixture: ComponentFixture<BookingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingErrorComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
