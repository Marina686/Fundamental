import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-create-event',
  templateUrl:  './create-event.component.html' ,
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  isDirty:boolean=true;
  newEvent
  event:any
  constructor(private router: Router, private eventService:EventService) { }

  ngOnInit(): void {

    this.event = {    //for two way binding[(ngModel)]
      name:'Ng Spect',
      date: '8/8/2020',
      time: '10:00 am',
      price: 799.99,
      location: {
        address: '456 Happt str',
        city: 'Florence',
        country:'Argentina'
      },
      onlineUrl:'http://spec.com',
      imageUrl:'http://.logo.pdf'
    }
  }
saveEvent(formValues){
  this.eventService.saveEvent(formValues).subscribe(() => {
  this.isDirty = false
  this.router.navigate(['/events'])
   //console.log(formValues);
  });
}
  cancel(){
  this.router.navigate(['/events'])
  }
}
