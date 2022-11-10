import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { MembersService } from 'src/app/services/members.service';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-member-foto-settings',
  templateUrl: './member-foto-settings.component.html',
  styleUrls: ['./member-foto-settings.component.css']
})
export class MemberFotoSettingsComponent implements OnInit {
  @Input() member:Member;

  BaseUrl:string = environment.baseApiUrl;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  user:User;

  constructor(private accountService:AccountService, private memberService:MembersService) { }

  ngOnInit(): void {
    this.accountService.curentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.initUploadForm();
  }

  initUploadForm(){
    this.uploader = new FileUploader({
      authToken: 'Bearer ' + this.user.token,
      url: this.BaseUrl + "/users/add-photo",
      method: 'post',
      isHTML5: true,
      autoUpload: false,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onBeforeUploadItem = () => {
        console.log("----onBeforeUploadItem");
        //add additional parameters for the serverside
        this.uploader.options.additionalParameter = {
        };
    };

    this.uploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item,responce,status, headers) => {
      if(responce){
        const photo = JSON.parse(responce);
        this.member.photos.push(photo);
      }
    }

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  setAsMain(photo:Photo){
    this.memberService.updateMemberImage(photo.id).subscribe(res => {
      console.log(res);
      this.member.photoUrl = photo.url;
      this.user.photourl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photos.forEach(p => {
        if(p.isMain)p.isMain = false;
        if(p.id===photo.id) p.isMain= true;
      })
    });
  }

  onDelete(photo:Photo){
    this.memberService.deleteMemberImage(photo.id).subscribe(res => {
      this.member.photos = this.member.photos.filter(p => p.id !== photo.id);
    });
  }

  // this.accountServise.curentUser$.pipe(take(1)).subscribe(user => {

  //   this.getMembers();
  //   const member = this.members.find( u => u.userName == user.username);
  //   console.log(member);
  //   const url = member.photos.find(p => p.id = id).url;
  //   member.photoUrl = url;
  //   // this.members[index] = {...member};
  //   // const curUrl = members[]
  //   // user.
  // });
}
