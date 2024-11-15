export enum HolidayType {
  BIRTHDAY = 'BIRTHDAY',
  WEDDING = 'WEDDING',
  NEW_YEAR = 'NEW_YEAR',
  HALLOWEEN = 'HALLOWEEN',
  EASTER = 'EASTER',
  CUSTOM = 'CUSTOM'
}

export const HolidayTypeMetadata: Record<string, { image: string; name: string }> = {
  [HolidayType.BIRTHDAY]: {image: 'assets/images/event-types/birthday.jpg', name: 'День народження'},
  [HolidayType.WEDDING]: {image: 'assets/images/event-types/wedding.jpg', name: 'Весілля'},
  [HolidayType.NEW_YEAR]: {image: 'assets/images/event-types/new-year.jpg', name: 'Новий рік'},
  [HolidayType.HALLOWEEN]: {image: 'assets/images/event-types/halloween.jpg', name: 'Гелоуін'},
  [HolidayType.EASTER]: {image: 'assets/images/event-types/easter.jpg', name: 'Великдень'},
  [HolidayType.CUSTOM]: {image: ' assets/images/event-types/custom.png', name: '+Щось своє'}
};
