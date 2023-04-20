import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessagesParams } from 'src/app/models/messagesparams.model';
import { Pagination } from 'src/app/models/pagination.model';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService:MessagesService) { }

  messages: Message[];
  messageParams:MessagesParams;
  pagination: Pagination;


  ngOnInit(): void {
    this.messageParams = new MessagesParams();
    this.getMessages();
  }

  getMessages(){
    this.messagesService.getMessages(this.messageParams).subscribe(res => {
      this.messages = res.result;
      this.pagination = res.pagination;
    })
  }

}
