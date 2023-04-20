import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

import { GalleryItem, ImageItem } from 'ng-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css']
})
export class MembersDetailsComponent implements OnInit {
@ViewChild('memberTabs', {static: true}) memberTabs:TabsetComponent;
messages: Message[] = [];

activeTab:TabDirective;

  member:Member;
  images: GalleryItem[] = [] as GalleryItem[];
  constructor(private croute:ActivatedRoute,
    private membersService:MembersService,
     private messagesService:MessagesService
  ) { }

  ngOnInit(): void {
    this.croute.data.subscribe(data => {
      this.member = data.member;
    });

    this.croute.params.subscribe(params => {
      params?.tab ? this.toTab(params.tab) : this.toTab(0)
    });
    //this.getMember()
    this.getImages();
  }

  getImages(){
    for (let p in this.member.photos) {
      if (Object.prototype.hasOwnProperty.call(this.member.photos, p)) {
        const element = this.member.photos[p];
        this.images.push(
          new ImageItem({ src: element.url, thumb: element.url })
        );
      }
    }
  }

  // getMember(){
  //   this.membersService.getMember(this.croute.snapshot.paramMap.get('username'))
  //   .subscribe(member => {
  //     this.member = member;

  //   });
  // }

  toTab(tabId:number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onSelectTab(tab:TabDirective){
    this.activeTab = tab;
    if(this.activeTab.heading === "Messages" && this.messages.length <= 0 ){
      this.getMessages();
    }
  }

  getMessages(){
    this.messagesService.getMessagesThread(this.member.userName).subscribe(messages => {
      this.messages = messages;
    });
  }
}
