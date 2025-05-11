import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingStepperService } from '../../services/booking-stepper.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { mustBeAdultPerson } from '../../validators/birthnumber-age.validator';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { ToastService } from 'src/app/services/toast.service';
import { PersonalInfo } from '../../models/personal-info.model';
import { BookingStepHeaderComponent } from '../../components/booking-step-header/booking-step-header.component';
import { FooterService } from 'src/app/services/footer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-booking-personal-info',
  imports: [
    CommonModule,
    RouterModule,
    BookingStepHeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './booking-personal-info.component.html',
  styleUrl: './booking-personal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPersonalInfoComponent implements OnInit, OnDestroy {
  @ViewChild('footerContent', { static: true })
  footerContent!: TemplateRef<unknown>;

  private readonly footerService = inject(FooterService);
  private readonly bookingStepperService = inject(BookingStepperService);
  private readonly bookingAppointmentService = inject(
    BookingAppointmentService
  );
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly requiredCityForCountry: Array<string> = ['sk'];

  readonly countries: Array<{ id: string; name: string }> = [
    { id: 'sk', name: 'Slovensko' },
    { id: 'cz', name: 'Česká Republika' },
  ];
  readonly cities: Array<{
    id: string;
    name: string;
    countryId: string;
  }> = [
    { id: 'ba', name: 'Bratislava', countryId: 'sk' },
    { id: 'ke', name: 'Košice', countryId: 'sk' },
    { id: 'pr', name: 'Praha', countryId: 'cz' },
    { id: 'br', name: 'Brno', countryId: 'cz' },
  ];
  readonly selectedCountryId = signal<string | null>(null);
  readonly showCityControl = computed(() => {
    return this.requiredCityForCountry.includes(this.selectedCountryId() ?? '');
  });
  readonly filteredCities = computed(() => {
    const countryId = this.selectedCountryId();
    return this.cities.filter((city) => city.countryId === countryId);
  });

  form!: FormGroup;

  ngOnInit(): void {
    this.bookingStepperService.setActiveStep(1);
    this.footerService.set(this.footerContent);

    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthNumber: ['', [Validators.required, mustBeAdultPerson()]],
        countryId: ['', Validators.required],
        cityId: [''],
        email: ['', [Validators.required, Validators.email]],
      },
      { updateOn: 'blur' }
    );

    this.form
      .get('countryId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((countryId) => {
        this.selectedCountryId.set(countryId);
        const cityIdControl = this.form.get('cityId');
        if (
          this.requiredCityForCountry.includes(this.selectedCountryId() ?? '')
        ) {
          cityIdControl?.setValidators(Validators.required);
        } else {
          cityIdControl?.clearValidators();
        }
        cityIdControl?.updateValueAndValidity();
        cityIdControl?.setValue('');
      });

    const personalInfo = this.bookingAppointmentService.personalInfo();
    if (personalInfo) {
      this.form.patchValue({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        birthNumber: personalInfo.birthNumber,
        countryId: personalInfo.countryId,
        cityId: personalInfo.cityId,
        email: personalInfo.email,
      });
    }
  }

  ngOnDestroy(): void {
    this.footerService.clear();
  }

  savePersonalInfoAndMoveNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const countryName =
      this.countries.find((c) => c.id === this.form.value.countryId)?.name ||
      '';
    const cityName =
      this.cities.find((c) => c.id === this.form.value.cityId)?.name || '';

    const data: PersonalInfo = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      birthNumber: this.form.value.birthNumber,
      countryId: this.form.value.countryId,
      countryName: countryName,
      cityId: this.form.value.cityId,
      cityName: cityName,
      email: this.form.value.email,
    };

    this.bookingAppointmentService
      .submitPersonalInfo(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (
          result.success &&
          this.bookingAppointmentService.personalInfo() &&
          this.bookingAppointmentService.personalInfoResponse()
        ) {
          this.router.navigate(['../summary'], {
            relativeTo: this.activatedRoute,
          });
        } else {
          this.toastService.showError(
            result?.message || 'Nepodarilo sa uložiť údaje'
          );
        }
      });
  }
}
