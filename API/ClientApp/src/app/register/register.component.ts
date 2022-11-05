import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OutletContext } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelReg = new EventEmitter();
  @Input() users:User[];


  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  onSumbit(formData:NgForm){
    console.log(formData);
    this.accountService.register(formData.value).subscribe({
      next: res => {
        console.log(res);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  cancelRegistration(){
    this.cancelReg.emit(false);
  }
 

}
