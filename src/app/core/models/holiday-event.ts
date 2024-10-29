import {HolidayType} from './holiday-type';

export interface HolidayEvent {
  id: string;
  name: string;
  type: HolidayType;
  services: string[];
}
