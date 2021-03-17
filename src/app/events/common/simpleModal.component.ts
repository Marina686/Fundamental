import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { JQ_TOKEN } from './JQuery.service';

@Component({
    selector: 'simple-modal',
    template: `
        <div id="{{elementId}}"   class="modal fade"    tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" (click)="closeModal()">
                <ng-content></ng-content>
              </div> 
            </div>
          </div>
        </div>
    `,
    styles: [`
       .modal-body:{height: 250px; overflow-y:scroll;}
    `]
})

export class SimpleModalComponent{
    @Input() title: string;
    @Input() elementId:string;
    @Input() closeOnBodyClick: string
    @ViewChild('modalContainer') containerEl:ElementRef;

    /**
     *
     */
    constructor(@Inject(JQ_TOKEN) private $:any ){}
        
     

    closeModal(){
        if(this.closeOnBodyClick.toLocaleLowerCase()=== "true"){
        this.$(this.containerEl.nativeElement).modal('hide');
     }
    }
}