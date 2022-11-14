import { Component, Input, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { Pagination } from 'src/app/models/pagination.model';
import { User } from 'src/app/models/user.model';
import { UserParams } from 'src/app/models/userparams.model';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  members:Member[];
  pagination:Pagination;
  pageNumber = 1;
  pageSize = 5;
  userParams:UserParams;
  user:User;

  genderList: [{v:'male', title:'Male'}, {v:'female', title:'Female'}];

  constructor(private membersService: MembersService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.curentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
      this.getMembersList();
    });


  }


  getMembersList() {

    console.log('User params', this.userParams);
    this.membersService.getMembers(this.userParams).subscribe(res => {
      console.log('New search:',res.result);
      console.log('items count:', res.result.length);

      this.members = res.result;
      this.pagination = res.pagination;
    })
  }

  pageChanged(e:any){
    console.log(e);
    this.userParams.currentPage= e.page;
    this.userParams.pageSize = e.itemsPerPage;
    this.getMembersList();
  }

  onChangeGender(e:any){
    console.log(this.userParams);
    //this.userParams.gender = e.gender;
    this.getMembersList()
  }
}
