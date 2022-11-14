import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isRegisterToggled:boolean = false;
  users:User[];

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {

  }

  registerToggle(){
    this.isRegisterToggled = !this.isRegisterToggled;
  }

  cancelRegistration(event:boolean){
    this.isRegisterToggled = event;
  }




}
