import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatStep, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HolidayType} from '../../core/models/holiday-type';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {HolidayService} from '../../core/service/holiday.service';
import {Observable} from 'rxjs';
import {MatInput} from '@angular/material/input';
import {HolidayEvent} from '../../core/models/holiday-event';

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
    MatInput
  ],
  providers: [HolidayService],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {

  public holidayTypes = Object.values(HolidayType);
  private _formBuilder = inject(FormBuilder);
  public services$: Observable<string[]>;

  constructor(private holidayService: HolidayService) {
    this.services$ = holidayService.getServices();
  }

  formGroup = this._formBuilder.group({
    type: ['', Validators.required],
    services: [[''], Validators.required],
    name: ['', Validators.required],
  });

  setType(type: string) {
    this.formGroup.controls.type.setValue(type);
    this.logForm();
  }

  logForm() {
    console.log(this.formGroup);
  }

  save() {
    this.holidayService.save(this.formGroup.value as HolidayEvent);
  }
}
