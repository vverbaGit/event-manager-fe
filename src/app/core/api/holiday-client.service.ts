import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {HolidayEvent} from '../models/holiday-event';
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

  getServices(): Observable<string[]> {
    return of(['Торт', 'Їжа', 'Заклад', 'Аксесуари', 'Дрес-код', 'Наряд/Костюм',
      'Коктейлі', 'Конкурси', 'Декорації', 'Музика', 'Запрошення', 'Зачіска']);
    return this.http.get<string[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
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
