import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingStepHeaderComponent } from './booking-step-header.component';

describe('BookingStepHeaderComponent', () => {
  let component: BookingStepHeaderComponent;
  let fixture: ComponentFixture<BookingStepHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStepHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingStepHeaderComponent);
    fixture.componentRef.setInput('title', 'test-value');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
