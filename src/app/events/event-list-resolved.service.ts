import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { EventService } from './shared/event.service'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EventListResolvedService implements Resolve<any>{

  constructor(private eventService: EventService) { }

  resolve(){
    return this.eventService.getEvents() 
  }
}
