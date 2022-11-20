import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private router:Router, private memberService:MembersService, private tostrService:ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member:Member){
    console.log('add like click');
    this.memberService.addLike(member.userName).subscribe( res => {
      console.log('add like result',res);
      this.tostrService.success("You successfuly liked "+member.knownAs);
    });
  }
}
