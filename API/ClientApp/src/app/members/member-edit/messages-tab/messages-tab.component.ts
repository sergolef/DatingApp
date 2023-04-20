import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/models/message.model';
import { NewMessage } from 'src/app/models/newmessage.mode';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages-tab',
  templateUrl: './messages-tab.component.html',
  styleUrls: ['./messages-tab.component.css']
})
export class MessagesTabComponent implements OnInit {
@Input() messages:Message[];
@Input() username:string;

user:User;

  newMessage:NewMessage;

  @ViewChild('messageForm') messageForm:NgForm;

  constructor(private messagesService:MessagesService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.curentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }



  onSumbite(){
    console.log(this.messageForm.form.value);
    this.newMessage = {
      content : this.messageForm.form.value.content,
      recipientName : this.username
    };

   this.messagesService.addMessage(this.newMessage).subscribe(message => {
    console.log(message);
    this.messages.push(message);
    this.messageForm.reset();
   });
  }

}
