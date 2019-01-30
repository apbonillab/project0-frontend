import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '../core/interfaces/EventCreate';
import { GeneralListService } from '../core/services/general-list.service';
import swal from 'sweetalert2';
import { EventsService } from '../core/services/events.service';
import { debug } from 'util';
import { create } from 'domain';

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
  ngOnInit() {
    let value = this.eventDetail[0];

    
    if(value){
      this.crearform = this.frmBuilder.group({
        idevent: [value.idevent, [] ],
        nombre: [value.name, [] ],
        place: [value.place, []] ,
        address: [value.address, []],
        initDate: [ value.init_date , []],
        endDate : [value.end_date, []],
        event_type : [value.event_type , []],
        category : [value.category, [ ]],
  
      });
      if(this.isDetail)
          this.textButton = "Cerrar";
      else
          this.textButton = "Actualizar";
        
    }else{
      this.crearform = this.frmBuilder.group({
        nombre: ['', [] ],
        place: ['', []] ,
        address: ['', []],
        initDate: [ '' , []],
        endDate : ['', []],
        event_type : ['' , []],
        category : ['', [ ]],
  
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
    return;
  }

  this.eventCreate = new Event(
    this.crearform.value.idevent,
    this.crearform.value.place,
    this.crearform.value.nombre,
    this.crearform.value.address,
    this.crearform.value.initDate,
    this.crearform.value.endDate,
    parseInt(localStorage.getItem('user')),
    this.crearform.value.category,
    this.crearform.value.event_type,
    ""
 );
 if( this.eventDetail[0]){
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

