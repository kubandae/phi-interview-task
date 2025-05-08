import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSummaryComponent } from './booking-summary.component';
import { RouterTestingModule } from "@angular/router/testing";
import { RouterModule } from '@angular/router';

describe('BookingSummaryComponent', () => {
  let component: BookingSummaryComponent;
  let fixture: ComponentFixture<BookingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSummaryComponent, RouterModule.forRoot([]),],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
