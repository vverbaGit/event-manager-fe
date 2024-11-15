import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {HolidayEvent, HolidayEventGuest, HolidayEventOption} from '../models/holiday-event';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayClientService {
  private apiUrl = environment.apiUrl + '/api/events';

  constructor(private http: HttpClient) {
  }

  save(body: HolidayEvent): Observable<HolidayEvent> {
    return this.http.post<HolidayEvent>(this.apiUrl, body).pipe(
      catchError(this.handleError)
    );
  }

  getOptions(): Observable<HolidayEventOption[]> {
    let options = ['Торт', 'Їжа', 'Заклад', 'Аксесуари', 'Дрес-код', 'Наряд/Костюм',
      'Коктейлі', 'Конкурси', 'Декорації', 'Музика', 'Запрошення', 'Зачіска']
      .map(option => ({name: option} as HolidayEventOption));
    return of(options);
  }

  getGuests(): Observable<HolidayEventGuest[]> {
    let guests = ['Настя', 'Влад', 'Марс', 'Роксі']
      .map(option => ({name: option} as HolidayEventOption));
    return of(guests);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `${error.error.message}`;
    } else {
      errorMessage = `${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
