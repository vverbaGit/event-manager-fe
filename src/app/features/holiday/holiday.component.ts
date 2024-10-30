import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatStep, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HolidayType, HolidayTypeMetadata} from '../../core/models/holiday-type';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {HolidayService} from '../../core/service/holiday.service';
import {Observable} from 'rxjs';
import {MatInput} from '@angular/material/input';
import {HolidayEvent} from '../../core/models/holiday-event';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

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
    MatGridTile
  ],
  providers: [HolidayService],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {

  @ViewChild('stepper') stepper!: MatStepper;

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
    this.stepper.next();
  }

  logForm() {
    console.log(this.formGroup);
  }

  save() {
    this.holidayService.save(this.formGroup.value as HolidayEvent).subscribe();
  }

  getTypeName(type: string): string {
    return HolidayTypeMetadata[type].name;
  }

  getTypeImage(type: string): string {
    return HolidayTypeMetadata[type].image;
  }

  protected readonly HolidayType = HolidayType;
}
