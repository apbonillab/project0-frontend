import { Component, OnInit } from '@angular/core';
import { AuthenticatedService } from '../core/services/authenticated.service';
import { Login } from '../core/interfaces/login';
import swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  login: Login = null;
  constructor(private auth: AuthenticatedService,    private router: Router) { }
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
      this.router.navigate(['/historical']);
    },error=>{
      console.log(error); // cuando hay error
      swal(
        'ERROR!',
        'Error de Autenticación!!',
        'error'
      );
    })
  }

  register(){
    
    this.login = new Login(this.email,this.password);
    this.auth.register(this.login).subscribe(res => {
        swal(
        'OK!',
        'Registro exitoso!!',
        'success'
      );
      this.authenticate();
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
