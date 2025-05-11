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
import { checkAdultFromBirthNumber } from '../../validators/birth-number.validator';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { ToastService } from 'src/app/services/toast.service';
import { PersonalInfo } from '../../models/personal-info.model';
import { BookingStepHeaderComponent } from '../../components/booking-step-header/booking-step-header.component';
import { FooterService } from 'src/app/services/footer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingStepKey } from '../../models/booking-step-key.enum';

@Component({
  selector: 'app-booking-personal-info',
  standalone: true,
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

  private readonly _footerService = inject(FooterService);
  private readonly _bookingStepperService = inject(BookingStepperService);
  private readonly _bookingAppointmentService = inject(
    BookingAppointmentService
  );
  private readonly _toastService = inject(ToastService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _requiredCityForCountry: Array<string> = ['sk'];

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
    return this._requiredCityForCountry.includes(
      this.selectedCountryId() ?? ''
    );
  });
  readonly filteredCities = computed(() => {
    const countryId = this.selectedCountryId();
    return this.cities.filter((city) => city.countryId === countryId);
  });

  form!: FormGroup;

  ngOnInit(): void {
    this._bookingStepperService.setActiveStep(BookingStepKey.PersonalInfo);
    this._footerService.set(this.footerContent);

    this.form = this._formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthNumber: ['', [Validators.required, checkAdultFromBirthNumber()]],
        countryId: ['', Validators.required],
        cityId: [''],
        email: ['', [Validators.required, Validators.email]],
      },
      { updateOn: 'blur' }
    );

    this.form
      .get('countryId')
      ?.valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((countryId) => {
        this.selectedCountryId.set(countryId);
        const cityIdControl = this.form.get('cityId');
        if (
          this._requiredCityForCountry.includes(this.selectedCountryId() ?? '')
        ) {
          cityIdControl?.setValidators(Validators.required);
        } else {
          cityIdControl?.clearValidators();
        }
        cityIdControl?.updateValueAndValidity();
        cityIdControl?.setValue('');
      });

    const personalInfo = this._bookingAppointmentService.personalInfo();
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
    this._footerService.clear();
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

    this._bookingAppointmentService
      .submitPersonalInfo(data)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => {
        if (
          result.success &&
          this._bookingAppointmentService.personalInfo() &&
          this._bookingAppointmentService.personalInfoResponse()
        ) {
          this._router.navigate(['../summary'], {
            relativeTo: this._activatedRoute,
          });
        } else {
          this._toastService.showError(
            result?.message || 'Nepodarilo sa uložiť údaje'
          );
        }
      });
  }
}
