import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { config, map, Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LikeParams } from '../models/likesparams.model';
import { Member } from '../models/member.model';
import { PaginationResult } from '../models/paginationresult.model';
import { UserParams } from '../models/userparams.model';
import { AccountService } from './account.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService implements OnInit{
  BaseUrl:string = environment.baseApiUrl;
  constructor(private http:HttpClient, private accountServise:AccountService) { }
  members: Member[] = [];



  ngOnInit(): void {
    console.log('Init members service');
  }

  getMembers(userParams:UserParams){

    let paginationParams = this.getPaginationParams(userParams.currentPage, userParams.pageSize);

    paginationParams = paginationParams.append('minAge', userParams.minAge.toString());
    paginationParams = paginationParams.append('maxAge', userParams.maxAge.toString());
    paginationParams = paginationParams.append('gender', userParams.gender);
    paginationParams = paginationParams.append('orderBy', userParams.orderBy);

    console.log('--ParamS--', paginationParams);
    //if(this.members.length > 0) return of(this.members);
    return this.getPaginatedResults<Member[]>(this.BaseUrl + '/users', paginationParams);
  }

  getPaginationParams(currentPage: number, pageSize:number) {
    let params = new HttpParams();

    params = params.append('PageNumber', currentPage.toString());
    params = params.append('PageSize', pageSize.toString());

    return params;
  }

  getPaginatedResults<T>(url: string, paginationParams: HttpParams) {
    let paginationResult: PaginationResult<T> = new PaginationResult<T>();
    return this.http.get<T>(url, { observe: 'response', params: paginationParams }).pipe(
      map(response => {
        paginationResult.result = response.body;
        if (response.headers.get('X-Pagination') !== null) {
          paginationResult.pagination = JSON.parse(response.headers.get('X-Pagination'));
        }
        return paginationResult;
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
        this.members[index] = member;
      })
    );
  }

  updateMemberImage(id:number){
    return this.http.put(this.BaseUrl+'/users/set-main-photo/'+id, {});
  }

  deleteMemberImage(id:number){
    return this.http.delete(this.BaseUrl+'/users/delete-photo/'+id);
  }

  getLikes(likeParams: LikeParams){
    let paginationParams = this.getPaginationParams(likeParams.currentPage, likeParams.pageSize);

    paginationParams = paginationParams.append('predicate', likeParams.predicate);

    return this.getPaginatedResults<Member[]>(this.BaseUrl + '/likes', paginationParams);
  }

  addLike(username:string){
    console.log('add member like');
    return this.http.post(this.BaseUrl+'/likes/'+username, {});
  }
}
