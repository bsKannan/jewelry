import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  constructor(private authService:AuthService,private router:Router) {
        
    }

  canActivate(){
    if(this.authService.loggedIn()){
        return true;
    }else{
        this.router.navigate(['/login']);
        return false;
    }
}
}
