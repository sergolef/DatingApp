import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css']
})
export class MembersDetailsComponent implements OnInit {

  member:Member;
  images: GalleryItem[] = [] as GalleryItem[];
  constructor(private croute:ActivatedRoute, private membersService:MembersService) { }

  ngOnInit(): void {
    this.getMember()
  }

  getMember(){
    this.membersService.getMember(this.croute.snapshot.paramMap.get('username'))
    .subscribe(member => {
      this.member = member;
      for (let p in member.photos) {
        if (Object.prototype.hasOwnProperty.call(member.photos, p)) {
          const element = member.photos[p];
          this.images.push(
            new ImageItem({ src: element.url, thumb: element.url })
          );
        }
      }
    });
  }
}
