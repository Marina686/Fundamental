import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import {
  EventsComponent,
  EventListComponent,
  EventResolverService,
     EventListResolvedService,
  EventService,
  EventsDetailComponent, 
  SessionListComponent,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  CreateSessionComponent,
  DurationPipe
} from './events/index';

import {JQ_TOKEN, 
  TOASTR_TOKEN, 
  Toastr,
   ColapsibleWellComponent,
   SimpleModalComponent,
   ModalTriggerDirective
  } from './events/common/index';

import { AppComponent } from './app.component';  
import { NavComponent } from './nav/nav.component';  
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { Error404Component } from './errors/404.component'; 
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  

   let toastr:Toastr = window['toastr'];
   let jQuery = window['$'];

@NgModule({ 
  declarations: [
    AppComponent,
    EventsComponent,
    EventListComponent,
    NavComponent,
    EventsDetailComponent,
    CreateEventComponent,
    CreateSessionComponent,
    Error404Component, 
    SessionListComponent,
    ColapsibleWellComponent,
    SimpleModalComponent,
    UpvoteComponent,
    DurationPipe,
    LocationValidator,
    ModalTriggerDirective,
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    RouterModule.forRoot(appRoutes),
     
  ],
  providers: [EventService, 
     {provide:TOASTR_TOKEN, useValue: toastr}, 
     {provide:JQ_TOKEN, useValue: jQuery},  
     AuthService,
     EventResolverService,
     EventListResolvedService,
     VoterService, 
     {provide:'canDeactivateCreateEvent', useValue:checkDirtyState}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty){
  return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
