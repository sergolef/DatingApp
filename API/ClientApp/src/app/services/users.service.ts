import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL:string = 'https://localhost:5001/api/users';

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.BASE_URL);
  }

}
