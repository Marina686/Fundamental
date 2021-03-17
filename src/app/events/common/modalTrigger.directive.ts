import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQ_TOKEN } from './JQuery.service';

@Directive({
    selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit{
    private el:HTMLElement;
    @Input('modal-trigger') modalId:string;

    /**
     *
     */
    constructor(ref:ElementRef,  @Inject(JQ_TOKEN) private jq : any) { 
        this.el = ref.nativeElement;
    }
    ngOnInit(){
        this.el.addEventListener('click', e =>{
            this.jq(`#(${this.modalId})`).modal()
        })
      
    }

}