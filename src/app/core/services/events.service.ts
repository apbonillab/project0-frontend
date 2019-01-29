import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventCreate } from '../interfaces/EventCreate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const URL = environment.url;
const CREAR = '/create';
const EVENTS = 'events';
@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  add(eventModel: EventCreate): Observable<any> {
    return this.http.post<any>(URL + EVENTS+CREAR, eventModel);
}

}
