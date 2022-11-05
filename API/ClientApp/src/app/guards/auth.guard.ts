import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService, private toastr:ToastrService){}
  canActivate(): Observable<boolean>{
    
    return this.accountService.curentUser$.pipe(
      map( user => {
        if(user) return true;
        this.toastr.error('You have to register first!');
    }));
  }
  
}
