import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { environment } from 'src/environments/environment';
import { EventType } from '../interfaces/eventType';
const URL = environment.url;
const CATEGORY = '/category';
const EVENT_TYPE = '/event_type';
const GENERAL = 'general';
@Injectable()
export class GeneralListService {

  constructor(private http: HttpClient) { }

  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(URL +GENERAL+ CATEGORY);
  }

  getEventType():Observable<EventType[]>{
    return this.http.get<EventType[]>(URL +GENERAL+ EVENT_TYPE);
  }
}
