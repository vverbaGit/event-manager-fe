import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HolidayEvent} from '../models/holiday-event';
import {HolidayClientService} from '../api/holiday-client.service';
import {HolidayStubService} from '../api/stub/holiday-stub.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private isUseStub = true;
  private client: HolidayClientService | HolidayStubService;

  constructor(private holidayClientService: HolidayClientService, private holidayStubService: HolidayStubService) {
    if (this.isUseStub) {
      this.client = this.holidayStubService;
    } else {
      this.client = holidayClientService;
    }
  }

  save(body: HolidayEvent): Observable<HolidayEvent> {
    console.log(body);
    return this.client.save(body);
  }

  getServices(): Observable<string[]> {
    return this.client.getServices();
  }
}
