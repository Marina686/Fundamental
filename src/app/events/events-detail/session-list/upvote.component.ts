import { Component, Input, OnInit , EventEmitter, Output} from '@angular/core'; 
import { ISession } from '../../shared';
import { VoterService } from './vote.service'

@Component({
  selector: 'upvote',
  styleUrls: ['./upvote.component.css'],
  template: `
  <div class="votingWidgetContainer pointable" (click)="onClick()">
     <div class="well votingWidget">
       <div class="votingButton">
        <i  class="glyphicon glyphicon-heart" [style.color]="iconColor"></i> 
       </div>
       <div class="badge badge-inverse votingCount">
         <div>{{count}}</div>
       </div>
     </div>
  </div>
  `
})
export class UpvoteComponent implements OnInit {
  @Input() count:number;
  @Input() set voted(val){
    this.iconColor = val ? 'red' : 'white';
  };
  @Output() vote = new EventEmitter(); 
  iconColor:string;
  constructor(private voterService:VoterService) { }

  ngOnInit(): void {
  }

  onClick(){
      this.vote.emit({})
  }
  
}