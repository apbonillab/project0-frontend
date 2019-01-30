import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private static readonly errorMessages = {
    'required': () => 'Campo Requerido',
    'minlength': (params: any) => 'El Valor Minimo es: ' + params.requiredLength,
    'maxlength': (params: any) => 'El Valor Maximo es: ' + params.requiredLength,
    'pattern': () => 'Formato no Valido ',
    'email': (params: any) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  showErrors(): boolean {
    return this.control &&
      this.control.errors &&
     (this.control.dirty || this.control.touched);
  }

  errors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return (<any>ErrorComponent.errorMessages)[type](params);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
