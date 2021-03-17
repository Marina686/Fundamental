import { Component, EventEmitter, OnInit, Output } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';   
import { ISession } from './../../events/shared/event.model'

@Component({ 
    selector:'create-session',
  templateUrl: './create-session.component.html',
   styles:[`em{float: right;color:#e05c65;padding-left: 10px;}
.error input{ background-color: #e3c3c5;}
.error ::-webkit-input-placeholder{ color:#999;}
.error ::-moz-placeholder{ color:#999;}
.error :-moz-placeholder{color:#999;}
.error :-ms-input-placeholder{color:#999;}
input, select, textarea {margin-bottom: 1em;}
form{ margin-bottom: 2em;}
.cancelBtn{color: white;background-color: #4E5D6C;margin-left: 1em;}
.saveBtn{color: #fff;background-color: #f97924;}`]
})

export class CreateSessionComponent implements OnInit {
    @Output()  saveNewSession = new EventEmitter();
    @Output()  cancelAddSession = new EventEmitter();
    newSessionForm:FormGroup
   name :FormControl
   presenter :FormControl
   duration:FormControl
   level:FormControl
    abstract :FormControl
    
  constructor( ) { }
  
  ngOnInit(): void {
     
     this.name = new FormControl('', Validators.required)
     this.presenter = new FormControl('', Validators.required)
     this.duration = new FormControl('', Validators.required)
     this.level = new FormControl('', Validators.required)
     this.abstract = new FormControl('', [Validators.required,
        Validators.maxLength(400), this.restrictedWords])

        this.newSessionForm = new FormGroup({
            name:this.name,
            presenter: this.presenter,
            duration:this.duration ,
            level:this.level,
            abstract:this.abstract

        })

  }

  private restrictedWords(control: FormControl ): {[key:string]:any}{
      return control.value.includes('foo')
      ?{'restrictedWords' : 'foo'}
      : null
  }
  saveSession(formValue){
      //console.log(formValue)
      let session:ISession = {
          id:undefined,
          name :formValue.name,
          presenter :formValue.presenter,
          duration: +formValue.duration,  
          level:formValue.level,
          abstract :formValue.abstract,
        voters:[]
      }
      this.saveNewSession.emit(session);
  }
  cancel(){
      this.cancelAddSession.emit();
  }

}
