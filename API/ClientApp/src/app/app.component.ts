import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Test';
  users: any;
  constructor(private httpClient: HttpClient, private memberService:MembersService) { }
  ngOnInit() {

  }
}
