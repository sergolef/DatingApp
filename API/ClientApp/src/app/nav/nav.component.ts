import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user:User;
  ddShow: boolean;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {

  }

  ddToggle(){
    this.ddShow = !this.ddShow;
  }

  setCurrentUser() {
    const user:User = JSON.parse(localStorage.getItem("userData"));
    this.accountService.setCurrentUser(user); 
  }

  login(ngForm:NgForm){
    console.log(ngForm.form.value);
    this.accountService.login(ngForm.form.value).subscribe( {
      next: (res) => {
        console.log(res);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  logout(){
    this.user = {} as User;
    this.accountService.logout();
  }



}
