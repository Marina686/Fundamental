 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { EventService } from './shared/event.service';
import { IEvent} from './shared/index'
 

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  items = ['item1', 'item2', 'item3', 'item4'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
  
 events:IEvent[]
  constructor(private eventService:EventService,  
              private route:ActivatedRoute) {
   
   }

  ngOnInit(): void {
     //this.eventService.getEvents().subscribe(events => {this.events = events});
     this.events = this.route.snapshot.data['events']
  }

  clickMe(data){
    console.log(data);
  }

  // handleListClick(eventName){
  //   this.toastr.success(eventName);
  // }
}
