import { Component, OnInit } from '@angular/core';
import { LikeParams } from 'src/app/models/likesparams.model';
import { Member } from 'src/app/models/member.model';
import { Pagination } from 'src/app/models/pagination.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  predicate:string = "liked";
  members:Member[];
  pagination:Pagination;
  likeParams:LikeParams;

  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    this.likeParams = new LikeParams();
    this.getLikes();
  }

  getLikes(){
    console.log('TEST--',this.likeParams);
    this.memberService.getLikes(this.likeParams).subscribe( res => {
      this.members = res.result;
      this.pagination = res.pagination;;
    });
  }

}
