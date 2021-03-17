import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';  
import { IEvent} from './shared/index'


@Component({
  selector: 'event-list',
  template: ` 
  <div [routerLink]="['/events', event.id]"  class="card">
      <h2>  {{event.name | uppercase}}  </h2>
      <span  [ngStyle] = "getFormatStyle(event.format)" [ngSwitch]="event.format">
      <span *ngSwitchCase="'InPerson'" class="label label-warning">In-Person</span>
      <span *ngSwitchCase="'Online'" class="label label-warning">Online</span>
      <span *ngSwitchDefault class="label label-warning">TBD</span>
    </span>
      <div>  Date: {{event.date | date:'shortDate'}} </div>
      <div [ngClass]="getStartTime()" [ngSwitch]="event?.time "> Time: {{event.time}} 
         <span *ngSwitchCase = "'8:00 am'">(Early Start)</span>
         <span *ngSwitchCase = "'10:00 am'">(Late Start)</span>
         <span *ngSwitchDefault>(Normal Start)</span> 
      </div>   
      <div [ngClass]="getStyle(event.price)">  Price: {{event.price | currency:'USD'}} </div>
      <div *ngIf="event?.location">
         <span>Location:{{event?.location?.address}}</span>
         <span>&nbsp;</span>
         <span>{{event?.location?.city}},{{event?.location?.country}}</span>
      </div> 
      <div *ngIf="event?.onlineUrl">  OnlineUrl:: {{event?.onlineUrl}} </div>   
     </div>`,
  styleUrls: ['./events.component.css']
})
export class EventListComponent implements OnInit {
  @Input() event:IEvent;
  @Output() eventClick = new EventEmitter();
  @Output() newItemEvent = new EventEmitter<string>();
    someProperty:any = 'some value';
  constructor() { }
  
  addNewItem(value:string){
    this.newItemEvent.emit(value);
  }
 
  getStyle(eventPrice){
      if(eventPrice < 600){
          return['green'];
      }
      return['red'];
  }
  ngOnInit(): void {
  }
  getStartTime(){
    if(this.event && this.event.time === '8:00 am')
      return ['green', 'bold']
    return []
  }
  getFormatStyle(eventFormat){
    if (eventFormat === 'InPerson')  
      return {color:'#000' }
     
      if (eventFormat === 'Online')  
      return {color:'green' }
     
    
    return {color:'#fff'}
  }
}
