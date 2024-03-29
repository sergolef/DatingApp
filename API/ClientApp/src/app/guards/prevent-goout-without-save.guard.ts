import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventGooutWithoutSaveGuard implements CanActivate {
  canActivate(component: MemberEditComponent):  boolean  {

    if(component.editForm.dirty){
      return confirm("are you sure to go out without saving. All data will reset.");
    }
    return true;
  }

}
