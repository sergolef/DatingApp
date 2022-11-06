import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BASE_URL:string = 'https://localhost:5001/api';
  private curentUserSource = new ReplaySubject<User>(1); 
  curentUser$ = this.curentUserSource.asObservable();


  constructor(private http:HttpClient, private router:Router) { }

  login(loginData){
    return this.http.post(this.BASE_URL+'/account/login', loginData).pipe(
      map((user:User) => {
        if(user){
          localStorage.setItem('userData', JSON.stringify(user));
          this.curentUserSource.next(user);
        }
        return user;
      })
    )
  }

  register(userData){
    return this.http.post<User>(this.BASE_URL+'/account/register', userData).pipe(
      map((user:User) => {
        if(user){
          localStorage.setItem('userData', JSON.stringify(user));
          this.curentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user:User){
    this.curentUserSource.next(user);
  }

  logout(){
    localStorage.clear();
    this.curentUserSource.next(null);
    this.router.navigateByUrl('/');
    
  }
}

