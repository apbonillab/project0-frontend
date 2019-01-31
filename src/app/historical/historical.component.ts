import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../core/services/events.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {
  listEvent : Event[];
  eventDetail : Event;
  isUpdate = false; 

  constructor(private event: EventsService,  private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
      this.event.getAll(localStorage.getItem('user')).subscribe((events:any)=>{
          this.listEvent = events;
          debugger;
      },()=>{
        swal(
          'ERROR!',
          'Error listando eventos por usuario',
          'error'
        );
      })
  }
  openModal(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', backdrop : 'static'});
  }


  DetailEditEvent(idEvent,content){
    this.event.DetailUpdate(idEvent).subscribe((event:any)=>{
        this.eventDetail = event;
        this.isUpdate = false;
        this.openModal(content);
    },()=>{
      swal(
        'ERROR!',
        'Error mostrando detalle de Evento',
        'error'
      );
    })
}

closeModal(){
  this.getAll();
  this.modalService.dismissAll();
}

Detail(idEvent,content){
  this.event.DetailUpdate(idEvent).subscribe((event:any)=>{
      this.eventDetail = event;
        this.isUpdate = true;
      this.openModal(content);
  },()=>{
    swal(
      'ERROR!',
      'Error mostrando detalle de Evento',
      'error'
    );
  })
}

deleteEvent(idEvent){
  this.event.deleteEvent(idEvent).subscribe((event:any)=>{
    this.getAll();
    swal(
      'OK!',
      'Se elimino evento Exitosamente',
      'success'
    );
},()=>{
  swal(
    'ERROR!',
    'Error eliminando Evento',
    'error'
  );
})
}

}
