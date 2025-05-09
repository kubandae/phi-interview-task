import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingPersonalInfoComponent } from './booking-personal-info.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookingPersonalInfoComponent', () => {
  let component: BookingPersonalInfoComponent;
  let fixture: ComponentFixture<BookingPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPersonalInfoComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
