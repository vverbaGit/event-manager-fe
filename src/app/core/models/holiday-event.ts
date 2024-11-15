import {HolidayType} from './holiday-type';

export interface HolidayEvent {
  id?: string;
  name: string;
  date?: Date;
  type: HolidayType;
  options: HolidayEventOption[];
  guests: HolidayEventGuest[];
}

export interface HolidayEventOption {
  id?: string;
  name: string;
  done?: boolean;
  order?: number;
}

export interface HolidayEventGuest {
  id?: string;
  name: string;
  telephone?: string;
}
