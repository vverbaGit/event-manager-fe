import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {HolidayComponent} from './features/holiday/holiday.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'holiday', component: HolidayComponent},
];
