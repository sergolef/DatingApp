import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Member } from "../models/member.model";
import { MembersService } from "../services/members.service";

@Injectable({
  providedIn: 'root'
})
export class MemberDetailesResolver implements Resolve<Member>{

  constructor(private memberService:MembersService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member> {
    return this.memberService.getMember(route.paramMap.get('username'));
  }

}
