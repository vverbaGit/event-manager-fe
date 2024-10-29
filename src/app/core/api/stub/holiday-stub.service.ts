import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {HolidayEvent} from '../../models/holiday-event';

@Injectable({
  providedIn: 'root'
})
export class HolidayStubService {

  save(body: HolidayEvent): Observable<HolidayEvent> {
    return of();
  }

  getServices(): Observable<string[]> {
    return of(['Торт', 'Їжа', 'Заклад', 'Аксесуари', 'Дрес-код', 'Наряд/Костюм',
      'Коктейлі', 'Конкурси', 'Декорації', 'Музика', 'Запрошення', 'Зачіска']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
