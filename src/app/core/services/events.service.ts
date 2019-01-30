import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../interfaces/EventCreate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventType } from '../interfaces/eventType';
const URL = environment.url;
const CREAR = '/create';
const UPDATE = '/update';
const ALL = '/all/';
const DETAIL = '/detail/';
const DELETE = '/delete/';
const DETAIL_UPDATE = '/detail_update/';
const EVENTS = 'events';
@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  add(eventModel: Event): Observable<any> {
    return this.http.post<any>(URL + EVENTS+CREAR, eventModel);
}

  getAll(user:string):Observable<Event[]>{
    return this.http.get<Event[]>(URL+EVENTS+ALL+user);
  }

  DetailEvent(event:String):Observable<Event>{
    return this.http.get<Event>(URL+EVENTS+DETAIL+event);
  }

  DetailUpdate(event:String):Observable<Event>{
    return this.http.get<Event>(URL+EVENTS+DETAIL_UPDATE+event);
  }

  updateEvent(eventModel: Event): Observable<any> {
    return this.http.put<any>(URL + EVENTS+UPDATE, eventModel);
}
deleteEvent(event: String):Observable<any> {
  return this.http.delete<any>(URL + EVENTS+DELETE+event);
}
}
