import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './errors/errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ListsComponent } from './members/lists/lists.component';
import { MembersDetailsComponent } from './members/members-list/members-details/members-details.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MessagesComponent } from './members/messages/messages.component';
import { MemberDetailesResolver } from './resolvers/member-details.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'members', component: MembersListComponent, canActivate: [AuthGuard] },
  { path: 'members/:username', component: MembersDetailsComponent, resolve: {member: MemberDetailesResolver} },
  { path: 'member/edit', component:MemberEditComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'errors-t', component: ErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
