import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs/operators';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user:User;
  member:Member;

  @ViewChild('editForm') editForm:NgForm;

  constructor(
    private accountService:AccountService,
    private membersService:MembersService,
    private toastr:ToastrService
  ) {
    this.accountService.curentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {

    this.getMember();
  }

  getMember() {
    this.membersService.getMember(this.user.username).subscribe( member => {
      this.member = member;
      console.log('ggg', this.member);
    })
  }

  onFormSubmit(){
    console.log(this.member);
    console.log(this.editForm.form);
    this.membersService.updateMember(this.member).subscribe(updated => {
      console.log('upd member result', updated);
      this.toastr.success('Member entity is updated!');
    });
  }

  onResetFrom() {
    this.editForm.form.reset();
  }

}
