import { Component, OnInit } from '@angular/core';
import { AuthenticatedService } from '../core/services/authenticated.service';
import { Login } from '../core/interfaces/login';
import swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  login: Login = null;
  constructor(private auth: AuthenticatedService) { }
  email :string;
  password: string;
  ngOnInit() {
  }

  authenticate(){
    this.login = new Login(this.email,this.password);
    console.log(".. "+this.email);
    this.auth.login(this.login).subscribe(res => {
      localStorage.setItem("token",res.token);
      localStorage.setItem('user',res.user);
    },error=>{
      console.log(error); // cuando hay error
      swal(
        'ERROR!',
        'Error de Autenticación!!',
        'error'
      );
    })
  }
}
