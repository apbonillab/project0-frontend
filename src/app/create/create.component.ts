import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '../core/interfaces/EventCreate';
import { GeneralListService } from '../core/services/general-list.service';
import swal from 'sweetalert2';
import { EventsService } from '../core/services/events.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  crearform: FormGroup;
  public _lists: any  = [];
  eventCreate: Event = null;
  constructor(private frmBuilder: FormBuilder , 
              private _generalList: GeneralListService,
              private eventService:EventsService) { }
  @Input() eventDetail : Event;
  @Input() isDetail:boolean;
  @Output() close =  new EventEmitter();
  textButton = "Crear";
  dateJson : NgbDateStruct;
  dateJsonEnd : NgbDateStruct;
  ngOnInit() {
    let value;
    if(this.eventDetail){
       value = this.eventDetail[0];

    }
    

    
    if(value){
      if(value.init_date){
        let withouthour = value.init_date.split("T");
        let date = withouthour[0].split("-");
        let json = {
          "year": parseInt(date[0]),
          "month":parseInt(date[1]),
          "day":parseInt(date[2])
        }
        this.dateJson=json;
      }
      if(value.end_date){
        let withouthourEnd = value.end_date.split("T");
        let dateEnd = withouthourEnd[0].split("-");
        let jsonEnd = {
          "year": parseInt(dateEnd[0]),
          "month":parseInt(dateEnd[1]),
          "day":parseInt(dateEnd[2])
        }
        this.dateJsonEnd=jsonEnd;
      }
     
      this.crearform = this.frmBuilder.group({
        idevent: [value.idevent, [] ],
        nombre: [value.name, [Validators.required ] ],
        place: [value.place, [Validators.required ]] ,
        address: [value.address, [Validators.required ]],
        initDate: [this.dateJson , [Validators.required ]],
        endDate : [this.dateJsonEnd, [Validators.required ]],
        event_type : [value.event_type , [Validators.required ]],
        category : [value.category, [Validators.required  ]],
  
      });
      if(this.isDetail)
          this.textButton = "Cerrar";
      else
          this.textButton = "Actualizar";
        
    }else{
      this.crearform = this.frmBuilder.group({
        nombre: [null, [Validators.required,Validators.minLength(2)] ],
        place: ['', [Validators.required,Validators.minLength(2)]] ,
        address: ['', [Validators.required,Validators.minLength(2)]],
        initDate: [ '' , [Validators.required,Validators.minLength(2)]],
        endDate : ['', [Validators.required,Validators.minLength(2)]],
        event_type : ['' , [Validators.required,Validators.minLength(1)]],
        category : ['', [Validators.required,Validators.minLength(1) ]],
  
      });
    }
    if(this.isDetail)
       this.crearform.disable();
    
    this.loadlists();
  }

  loadlists(): void {
    this._generalList.getCategory().subscribe( (resp: any) => this._lists.category = resp);
    this._generalList.getEventType().subscribe( (resp: any) => this._lists.event_type = resp);
 
  }

 crear(): void {
  
  if ( this.crearform.invalid) {
    swal(
      'ERROR!',
      'Error, Faltan campos requeridos!!',
      'error'
    );
    return;
  }
  let year = this.crearform.value.initDate.year;
  let month = this.crearform.value.initDate.month;
  let day = this.crearform.value.initDate.day;
  let dayformatInit =  year+'/'+month+'/'+day;
  let yearEnd = this.crearform.value.endDate.year;
  let monthEnd = this.crearform.value.endDate.month;
  let dayEnd = this.crearform.value.endDate.day;
  let dayformatEnd =  yearEnd+'/'+monthEnd+'/'+dayEnd;
  this.eventCreate = new Event(
    this.crearform.value.idevent,
    this.crearform.value.place,
    this.crearform.value.nombre,
    this.crearform.value.address,
    dayformatInit,
    dayformatEnd,
    parseInt(localStorage.getItem('user')),
    this.crearform.value.category,
    this.crearform.value.event_type,
    ""
 );
 if( this.eventDetail){
      if(this.isDetail)
          this.close.emit();
    else
        this.updateEvent()
 }else{
   this.createEvent();
 }
 
    
  }

  updateEvent() : void {
    this.eventService.updateEvent( this.eventCreate).subscribe(
      respon => {
        this.crearform.reset();
        this.close.emit();
       console.log(respon); // validar la respuesta
       swal(
         'OK!',
         'Actualizado Exitosamente',
         'success'
       );
    },
    err => {
     console.log(err); // cuando hay error
     swal(
       'ERROR!',
       'Error actualizando el evento',
       'error'
     );
    } );
  }

  createEvent() : void {
    this.eventService.add( this.eventCreate).subscribe(
      respon => {
        this.crearform.reset();
       console.log(respon); // validar la respuesta
       swal(
         'OK!',
         'Creado Exitosamente',
         'success'
       );
    },
    err => {
     console.log(err); // cuando hay error
     swal(
       'ERROR!',
       'Error creando el evento',
       'error'
     );
    } );
  }
}

