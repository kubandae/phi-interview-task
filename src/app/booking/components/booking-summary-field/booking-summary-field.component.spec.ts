import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSummaryFieldComponent } from './booking-summary-field.component';

describe('BookingSummaryFieldComponent', () => {
  let component: BookingSummaryFieldComponent;
  let fixture: ComponentFixture<BookingSummaryFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSummaryFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSummaryFieldComponent);
    fixture.componentRef.setInput('label', 'test-value');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
