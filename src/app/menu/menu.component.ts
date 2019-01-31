import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  closeSession(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
