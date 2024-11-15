import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatStep, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HolidayType, HolidayTypeMetadata} from '../../core/models/holiday-type';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {HolidayService} from '../../core/service/holiday.service';
import {catchError, Observable, throwError} from 'rxjs';
import {MatInput, MatInputModule} from '@angular/material/input';
import {HolidayEvent, HolidayEventGuest, HolidayEventOption} from '../../core/models/holiday-event';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {DATE_FORMAT} from '../../shared/constants/date-format.const';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipGrid, MatChipInput, MatChipRow} from '@angular/material/chips';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatStepper,
    MatStep,
    MatLabel,
    NgForOf,
    MatStepperNext,
    ReactiveFormsModule,
    MatFormField,
    MatCheckbox,
    MatSelectionList,
    AsyncPipe,
    MatListOption,
    MatInput,
    NgOptimizedImage,
    MatGridList,
    MatGridTile,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatSelect,
    MatSnackBarModule
  ],
  providers: [HolidayService, provideNativeDateAdapter(DATE_FORMAT), MatSnackBarModule],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  public holidayTypes = Object.values(HolidayType);
  private _formBuilder = inject(FormBuilder);
  public options$: Observable<HolidayEventOption[]>;
  public guests$: Observable<HolidayEventGuest[]>;

  formGroup = this._formBuilder.group({
    type: ['', Validators.required],
    options: [[] as HolidayEventOption[], Validators.required],
    guests: [[] as HolidayEventGuest[], Validators.required],
    name: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  constructor(private holidayService: HolidayService,
              private _snackBar: MatSnackBar) {
    this.options$ = holidayService.getOptions();
    this.guests$ = holidayService.getGuests();
  }

  ngOnInit(): void {
    let item = localStorage.getItem('eventForm');
    if (item) {
      let value = JSON.parse(item) as HolidayEvent;
      this.formGroup.controls.type.setValue(value.type);
      this.formGroup.controls.name.setValue(value.name);
      if (value.date) {
        this.formGroup.controls.date.setValue(value.date);
      }
      this.formGroup.controls.guests.setValue(value.options);
      this.formGroup.controls.guests.updateValueAndValidity();
      this.formGroup.controls.options.setValue(value.guests);
      this.formGroup.controls.options.updateValueAndValidity();
    }
  }

  setType(type: string) {
    this.formGroup.controls.type.setValue(type);
    this.saveState();
    this.stepper.next();
  }

  saveState() {
    localStorage.setItem('eventForm', JSON.stringify(this.formGroup.value));
    console.log(this.formGroup.value);
  }

  save() {
    console.log(JSON.stringify(this.formGroup.value as HolidayEvent));
    this.holidayService.save(this.formGroup.value as HolidayEvent)
      .pipe(catchError(err => {
        this._snackBar.open(err, 'ОК', {duration: 10000, panelClass: ['style-error']})
        console.log(err);
        return throwError(() => err);
      }))
      .subscribe();
  }

  getTypeName(type: string): string {
    return HolidayTypeMetadata[type].name;
  }

  getTypeImage(type: string): string {
    return HolidayTypeMetadata[type].image;
  }
}
