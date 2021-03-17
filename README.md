# Creating a Data-bound Component

HTML
<div style="margin-top:30px">
    Event: {{event.name}}
  </div>
  <div>
    Date: {{event.date}}
  </div>
  <div>
    Time: {{event.time}}
  </div>
  <div>
    Address: {{event.location.address}}, {{event.location.city}}, {{event.location.country}}
    </div>
</div>
---------------------------
TS
export class EventDetailsComponent {
  const event = {name:'ngConf 2025', date: '3/1/2025', time: '8am', location: {address: '123 Main St', city: 'Salt Lake City, UT', country: 'USA'}}
}

________________________________________________________________________________________________
## Communicating with Child Components  @Input()

PARENT HTML, TS:
  <div>
      <child-component [address]="event"></child-component>
  </div>
  ----------
export class EventDetailsComponent {
  event = { address: '123 Main St', city: 'Salt Lake City, UT', country: 'USA'}}
}
--------------------------------------------------------------------------
 CHILD HTML,TS

 <span>{{address.address}}, {{address.city}}, {{address.country}}</span>
 ------------
 export class EventAddressComponent { 
  @Input() address
}
________________________________________________________________________________________________

## Communicating with Parent Components @Output()

CHILD HTML,TS
 <h3>Child Counter: {{counter}}</h3>
    <button class="btn btn-primary" (click)="buttonClicked()">Click Me!</button>
    ------------
    export class ChildComponent { 
  @Output() buttonClick = new EventEmitter()
  counter = 0
  
  ngOnInit() {
    setInterval(() => {this.counter++}, 1000)
  }
  
  buttonClicked() {
    this.buttonClick.emit(this.counter)
  }
}
--------------------------------------------------------------------------
PARENT HTML, TS:
<child (buttonClick)="handleChildButtonClick($event)"></child>
------------
  
 
export class ParentComponent {
  currentCounter
  
  handleChildButtonClick(value) {
    this.currentCounter = value
  }
}
 ________________________________________________________________________________________________

## Using Local Variables To Interact With Child Components (#someProperty)

PARENT

<child #timer></child>
    <button class="btn btn-primary" (click)="timer.stopTimer()">Stop Timer</button>
--------------------------------------------------------------------------
CHILD
<div *ngIf="stopped">
      <h1>Congratulations!</h1>
      <h3>You stopped the child component's counter!</h3>
    </div>
    <h3>Child Counter: {{counter}}</h3>
  `
})
export class ChildComponent { 
  private stopped = false
  private counter = 0
  private intervalId
  
  ngOnInit() {
    this.intervalId = setInterval(() => {this.counter++}, 1000)
  }
  
  stopTimer() {
    clearInterval(this.intervalId)
    this.stopped = true
  }
}
________________________________________________________________________________________________
## Hiding Elements with ngIf 

export class EventsListComponent {
  const events = [
    {name:'Angular Connect', date: '9/26/2036', time: '10am', location: {address: '1 London Road ', city: 'London', country: 'England'}},
    {name:'ng-conf 2037', date: '4/15/2037', time: '9am', onlineUrl: 'https://www.ng-conf.org/'},
    {name:'Future Conf (Location/Url TBD)', date: '6/10/2037', time: '8am'},
    {name:'ng-nl', date: '4/15/2037', time: '9am', onlineUrl:'http://ng-nl.org/'},
    {name:'UN Angular Summit', date: '6/10/2037', time: '8am', location: {address: 'The UN Angular Center', city: 'New York', country: 'USA'}, onlineUrl: 'http://unangularsummit.org'}
  ]       
}

<div *ngIf="event?.location">
      <span>Location: {{event?.location?.address}}</span>
      <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
    </div>
    <div *ngIf="event?.onlineUrl">
      Online URL: {{event?.onlineUrl}}
    </div>
________________________________________________________________________________________________

## Hiding Content with the [Hidden] Binding

<div *ngFor="let event of events" class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2> 
    <span [hidden]="event.hidden">
            <button class="btn btn-warning"
            (click)="event.hidden=true">Collapse</button>
     </span>
    <span [hidden]="!event.hidden">
           <button [hidden]="!event.hidden" class="btn btn-warning" (click)="event.hidden=false">Expand</button>
    </span>
    <div [hidden]="event.hidden" >
      <div>Date: {{event.date}}</div>
      <div>Time: {{event.time}}</div>
      <div>
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
    </div>
  </div>
________________________________________________________________________________________________

## ngSwitch

<div [ngSwitch]="event?.time"> Time: {{event.time}} 
         <span *ngSwitchCase = "'8:00 am'">(Early Start)</span>
         <span *ngSwitchCase = "'10:00 am'">(Late Start)</span>
         <span *ngSwitchDefault>(Normal Start)</span> 
      </div> 
________________________________________________________________________________________________

## Adding Style with ngClass

styles: [` 
    .in-person { color: green; }
    .online { color: red; }
    .tbd { color: #aaa; } 
  `]

  -------------
   const events = [
    {name:'Angular Connect', date: '9/26/2036', time: '10am', location: {address: '1 London Road ', city: 'London', country: 'England'}, format:"InPerson"},
    {name:'ng-conf 2037', date: '4/15/2037', time: '9am', onlineUrl: 'https://www.ng-conf.org/', format:"Online"},
    {name:'Future Conf (Location/Url TBD)', date: '6/10/2037', time: '8am'},
    {name:'UN Angular Summit', date: '6/10/2037', time: '8am', location: {address: 'The UN Angular Center', city: 'New York', country: 'USA'}, format:"InPerson"}
  ]
  
  getTitleClass(eventFormat) {
    if (eventFormat === 'InPerson') 
      return ['in-person']
    
    if (eventFormat === 'Online')
      return ['online']
    
    return ['tbd']
  }
  ---------------
   <div *ngFor="let event of events" class="well hoverwell thumbnail">
    <h2 [ngClass]="getTitleClass(event.format)">{{event.name}}</h2>
    </div>
________________________________________________________________________________________________

## Adding Style with ngStyle

 <h2 [ngStyle]="getTitleStyle(event.format)">{{event.name}}</h2>

 ---------------
 TS
 getTitleStyle(eventFormat) {
    if (eventFormat === 'InPerson') 
      return {color: 'green'}
    
    if (eventFormat === 'Online')
      return {color: 'red'}
    
    return {color: '#aaa'}
  }
________________________________________________________________________________________________

## Using Route Parameters 

routes.ts
import { Routes } from '@angular/router'

import { EventsListComponent} from './events-list.component'
import { EventDetailsComponent} from './event-details.component'

export const appRoutes:Routes = [
  { path: '', component: EventsListComponent },
  { path: 'events/:eventId', component: EventDetailsComponent }
]
------------- TS
 export class EventDetailsComponent {
  event:any
  
  constructor(private eventService:EventService, private activatedRoute:ActivatedRoute) {
    
  }
  ngOnInit() {
    this.event = this.eventService.getEvent(+this.activatedRoute.snapshot.params['eventId'])
  }
  -------------service
   getEvent(eventId:number) {
    return this.EVENTS.find(event => event.id === eventId)
  }
________________________________________________________________________________________________

## Linking to Routes

 <td><a [routerLink]="['events', event.id]">{{event.name}}</a></td>
 ---------------------
 routes.ts

 export const appRoutes:Routes = [
  { path: '', component: EventsListComponent },
  { path: 'events/:eventId', component: EventDetailsComponent }
]
________________________________________________________________________________________________

## Navigating from Code

<div class="back">
     <button class="btn btn-primary" (click)="returnToEvents()">Back to events</button>
   </div>
   ----------------
constructor( private router: Router) {
   
   returnToEvents() {   
   this.router.navigate(['events'])
  }
  ------
  ROuter
  export const appRoutes:Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/:eventId', component: EventDetailsComponent },
  { path: '', redirectTo: '/events', pathMatch:'full' },
]
________________________________________________________________________________________________

## Preventing a Route from Activating

import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router"
import { Injectable } from "@angular/core"
import { EventService } from './event.service'

@Injectable()
export class EventDetailsActivator implements CanActivate { 
  constructor(private eventService:EventService, private router:Router) {

  }

  canActivate(route:ActivatedRouteSnapshot) {
    let event = this.eventService.getEvent(+route.params['eventId'])

    return !!event
  }
}
------
<tr>
        <td><a [routerLink]="['/events', 42]">Invalid Event</a></td>
        <td>N/A</td>      
        <td>N/A</td>
        <td>N/A</td>
      </tr>

 -------------
 export const appRoutes:Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/:eventId', component: EventDetailsComponent, canActivate: [EventDetailsActivator]  },
  { path: '', redirectTo: '/events', pathMatch:'full' },
]     
__________________________________________________

## Preventing a Route from De-activating

Router

export const appRoutes:Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/:eventId', 
    component: EventDetailsComponent, 
    canActivate: [EventDetailsActivator],  
    canDeactivate: [EventDetailsActivator]
  },
  { path: '', redirectTo: '/events', pathMatch:'full' },
]
-------------------------
service

import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router"
import { Injectable } from "@angular/core"
import { EventService } from './event.service'
import { EventDetailsComponent } from './event-details.component'

@Injectable()
export class EventDetailsActivator implements CanActivate, CanDeactivate { 
  constructor(private eventService:EventService, private router:Router) {

  }

  canActivate(route:ActivatedRouteSnapshot) {
    let event = this.eventService.getEvent(+route.params['eventId'])

    return !!event
  }
  
  canDeactivate(component:EventDetailsComponent) {
    return component.reviewed
  }
}
-----------------
<div class="pad-top">
      <input type="checkbox" (click)="toggleReviewed()" /> Reviewed
    </div>
    ---------------
    export class EventDetailsComponent {
  event:any
  reviewed:boolean=false
  
  constructor(private eventService:EventService, private activatedRoute:ActivatedRoute) {
    
  }
  ngOnInit() {
    this.event = this.eventService.getEvent(+this.activatedRoute.snapshot.params['eventId'])
  }
  toggleReviewed() {
    this.reviewed = !this.reviewed
    console.log(this.reviewed)
  }
}
________________________________________________________________________________________________

## Resolve Pre-loading Data for a Component

event.service

getEvents():Observable<any> {
    let subject = new Subject<any>()
    setTimeout(() => {subject.next(this.EVENTS); subject.complete(); }, 3000)
    return subject
  }

  -------------
  router.ts

  import { Routes } from '@angular/router'

import { EventsListComponent} from './events-list.component'
import { EventsListResolver } from './events-list-resolver.service'

export const appRoutes:Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events:EventsListResolver} },
  { path: '', redirectTo: '/events', pathMatch:'full' },
]

--------------
resolve.service

import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router"
import { Injectable } from "@angular/core"
import { EventService } from './event.service'
import { EventDetailsComponent } from './event-details.component'

@Injectable()
export class EventsListResolver implements Resolve<any> { 
  constructor(private eventService:EventService) {

  }

  resolve() {
    return this.eventService.getEvents().map(events => events)
  }
}

--------------
event.ts


import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { EventService } from './event.service'

@Component({
  selector: 'event-details',
  templateUrl: 'app/events-list.component.html',
  styles: [`
    th, td { font-size: 16px; padding:5px 10px;}
    td a { color: #df691a }
  `]
})
export class EventsListComponent {
  constructor(private eventService:EventService, private route:ActivatedRoute) {
    
  }
  
  ngOnInit() {
    this.events = this.route.snapshot.data['events']
  }
}


`````````````````````````````````````````````````````````````````````````

@Injectable()
export class UserResolver implements Resolve<IUser> {            
     constructor(private http: HttpClient) { }
     resolve(): Observable<IUser> {
           return this.http.post('/getUser');
     }
}
export const routes: Routes = [,
    {
        path: 'superapp',
        component: MainComponent,
        resolve: {
              resolvedUser: UserResolver
        },
        children: [
            {
              ...
///
export class MainComponent {
      
       constructor(private activatedRoute: ActivatedRoute) {}
   
       ngOnInit() {
            this.user = this.activatedRoute
                            .snapshot.data['resolvedUser'];
        }
}

________________________________________________________________________________________________

## Styling Active Links

 <li class="nav-item">
            <a [routerLink] = "['/events']"
            routerLinkActive="active"
            [routerLinkActiveOptions] = "{exact:true}">All Events</a>
          </li>
          <li class="nav-item">
            <a [routerLink] = "['/events/new']" 
            routerLinkActive="active"
            href="">Create Event</a>
          </li>
CSS
          li > a.active{
    color:#f97924;
}
________________________________________________________________________________________________

## Validating a Template-based Form

<div>
  <form  #eventForm="ngForm" (ngSubmit)="saveEvent(eventForm.value)">
    <div class="form-group" [ngClass]="{'error': eventForm.controls.name?.invalid && eventForm.controls.name?.touched}">
      <label for="event-name">Event Name: </label>
      <input (ngModel)="name" name="name" id="event-name" type="text" required/>
      <em *ngIf="eventForm.controls.name?.invalid && eventForm.controls.name?.touched">Required</em>
    </div>
    <div class="form-group" [ngClass]="{'error': eventForm.controls.date?.invalid && eventForm.controls.date?.touched}">
      <label for="date">Date: </label>
      <input (ngModel)="date" name="date" id="date" type="text" required/>
      <em *ngIf="eventForm.controls.date?.invalid && eventForm.controls.date?.touched">Required</em>
    </div>
    <div class="form-group" [ngClass]="{'error': eventForm.controls.time?.invalid && eventForm.controls.time?.touched}">
      <label for="time">Time: </label>
      <input (ngModel)="time" name="time"  id="time" type="text" required/>
      <em *ngIf="eventForm.controls.time?.invalid && eventForm.controls.time?.touched">Required</em>
    </div>
    <div ngModelGroup="location">
      <div class="form-group" [ngClass]="{'error': eventForm.controls.location?.controls.address.invalid && eventForm.controls.location?.controls.address.touched}">
        <label for="address">Address: </label>
        <input (ngModel)="address" name="address" id="address" type="text" required/>
        <em *ngIf="eventForm.controls.location?.controls.address.invalid && eventForm.controls.location?.controls.address.touched">Required</em>
      </div>
      <div class="form-group" [ngClass]="{'error': eventForm.controls.location?.controls.city.invalid && eventForm.controls.location?.controls.city.touched}">
        <label for="city">City: </label>
        <input (ngModel)="city" name="city"  id="city" type="text" required/>
        <em *ngIf="eventForm.controls.location?.controls.city.invalid && eventForm.controls.location?.controls.city.touched">Required</em>
      </div>
      <div class="form-group" [ngClass]="{'error': eventForm.controls.location?.controls.country.invalid && eventForm.controls.location?.controls.country.touched}">
        <label for="country">Country: </label>
        <input (ngModel)="country" name="country" id="country" type="text" required pattern="[A-Z]{2}"/>
        <em *ngIf="eventForm.controls.location?.controls.country.errors?.required && eventForm.controls.location?.controls.country.touched">Required</em>
        <em *ngIf="eventForm.controls.location?.controls.country.value && eventForm.controls.location?.controls.country.errors?.pattern && eventForm.controls.location?.controls.country.touched">Must be a two-letter country code</em>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="eventForm.invalid">Save</button>
    <button type="button" class="btn btn-default" (click)="cancel(eventForm)">Cancel</button>
  </form>
</div>

-----------
styles
form { margin-top: 10px; }
    label { display: block; }
    .form-group { margin-top: 5px; }
    em {color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
________________________________________________________________________________________________


## Preparing to store Data on the server

npm install ngf-server -S
----------
packge.json
"scripts": {
     ...
    "server":" node node_modules/ngf-server/server.js",
    "e2e": "ng e2e"
  },
 --------------
 npm run server
 ------
 npm start

 add to package json
 "scripts": {
    ..
    "start": "ng serve --proxy-config proxy.config.json",
    ...

  },
  -----
  add to app.module
  import { HttpClientModule} from '@angular/common/http';
________________________________________________________________________________________________

## making Request

export class ParentComponent {
  movieList;

  constructor(private http: HttpClient) {}
  url = 'http://swapi.dev/api/films/';
  makeRequest() {
      this.http.get("this.url").subscribe((data: any) => {
      this.movieList = data.results;
    });
  }
}
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
________________________________________________________________________________________________