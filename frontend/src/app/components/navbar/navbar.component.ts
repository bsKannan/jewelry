import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iscollapsed = true; 

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onLogoutClick(){
   
    // this.authSerivce.logout();
    // this.flashMessage.show('You are logged out',{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
    return false;
  }

}
