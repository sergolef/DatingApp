import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { config, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService implements OnInit{
  BaseUrl:string = environment.baseApiUrl;
  constructor(private http:HttpClient) { }
  members: Member[] = [];


  ngOnInit(): void {
    console.log('Init members service');
  }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.BaseUrl+'/users').pipe(
      map( members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(name:string){
    const member = this.members.find(f => f.userName === name);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.BaseUrl+'/users/'+name);
  }

  updateMember(member:Member){
    return this.http.put(this.BaseUrl+'/users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...member};
      })
    );
  }
}
