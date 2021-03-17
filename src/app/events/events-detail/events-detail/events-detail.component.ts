import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../../shared/index';
import { EventService } from '../../shared/event.service' 

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventsDetailComponent implements OnInit {
  event:any
  addMode:boolean;
  filterBy: string = 'all';
  sortBy: string ='votes';
 // event:IEvent;
  constructor(private eventService:EventService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.event = this.eventService.getEvent(1);
    this.route.data.forEach((data) =>{
     //this.eventService.getEvent(+params['id']).subscribe((event:IEvent) => {
      // this.event = event;
      this.event =  data['event']
       this.addMode =false;
     }) 
    //this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  }
  addSession(){
    this.addMode = true;
  }

  saveNewSession(session:ISession){
    const nextId = Math.max.apply(null, this.event.session.map(s =>
      s.id));
      session.id =nextId +1;
      this.event.session.push(session);
      this.eventService.saveEvent(this.event).subscribe();
      this.addMode = false;
  }
  cancelAddSession(){
    this.addMode = false;
  }
}
