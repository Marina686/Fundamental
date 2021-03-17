import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../../shared';
import { VoterService } from './vote.service'

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  @Input() sessions:ISession[];
  @Input() filterBy:string;
  @Input() eventId:number;
  @Input() sortBy:string;
  visibleSessions:ISession[]=[];

  constructor(private auth:AuthService, private voterService:VoterService) { }

  ngOnChanges(){
      if(this.sessions){
      this.filterSessions(this.filterBy);
       this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) :
       this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter){
    if(filter === 'all'){
      this.visibleSessions = this.sessions.slice(0);
    } else {
       this.visibleSessions = this.sessions.filter(session => {
         return session.level.toLocaleLowerCase() === filter;
       })
    }

  }
  ngOnInit(): void {
  }
  
  toggleVote(session:ISession){
    if(this.userHasVoted(session)){
        this.voterService.deleteVoter(this.eventId,session,this.auth.currentUser.userName)
    } else{
        this.voterService.addVoter(this.eventId,session,this.auth.currentUser.userName)
    }
     if(this.sortBy === 'votes'){
         this.visibleSessions.sort(sortByVotesDesc);
      } 
   
}
userHasVoted(session:ISession){
   return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
   //return 1;
 }
}

function sortByNameAsc(s1:ISession, s2: ISession){
  if(s1.name > s2.name) return 1;
  else if(s1.name === s2.name) return 0;
  else return -1;
}

function sortByVotesDesc(s1:ISession, s2: ISession){
 return s2.voters.length - s1.voters.length
}
