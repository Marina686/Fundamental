 
import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';

import {
    EventsComponent,
    EventListResolvedService, 
    EventsDetailComponent,
    CreateSessionComponent, 
    EventResolverService
  } from './events/index';

import { CreateEventComponent } from './events/create-event/create-event.component'; 

export const appRoutes:Routes = [
    {path: 'events', component: EventsComponent, 
     resolve:{events:EventListResolvedService}},

    {path: 'events/new', component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']},

    {path: 'events/session/new', component: CreateSessionComponent},

    {path: 'events/:id', component: EventsDetailComponent, resolve:{event:EventResolverService} }, 

    {path: '404', component: Error404Component}, 


    {path: '', redirectTo: '/events', pathMatch:'full'},

    {path: 'user', loadChildren: './user/user.module#UserModule'}
]   