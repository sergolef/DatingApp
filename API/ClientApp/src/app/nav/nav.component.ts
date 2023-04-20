import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user:User;
  ddShow: boolean;
  isCollapsed = false;

  constructor(public accountService: AccountService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.setCurrentUser();
    this.accountService.curentUser$.subscribe(user => {
      console.log('nav init',user);
      this.user = user;
    })
  }

  ddToggle(){
    this.ddShow = !this.ddShow;
  }

  setCurrentUser() {
    const user:User = JSON.parse(localStorage.getItem("userData"));
    this.accountService.setCurrentUser(user);
  }

  login(ngForm:NgForm){
    this.accountService.login(ngForm.form.value).subscribe( {
      next: (res) => {
        this.router.navigateByUrl('/members');
      }
    });
  }

  logout(){
    console.log('click logout in nav');
    this.user = {} as User;
    this.accountService.logout();
  }



}
