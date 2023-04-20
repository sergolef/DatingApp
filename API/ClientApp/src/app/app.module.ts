import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailsComponent } from './members/members-list/members-details/members-details.component'
import { ListsComponent } from './members/lists/lists.component';
import { MessagesComponent } from './members/messages/messages.component';
import { SharedModule } from './modules/shared.module';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ErrorsComponent } from './errors/errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AuthInterceptorService } from './interceptors/auth.interceptor';
import { MemberCardComponent } from './members/members-list/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MemberFotoSettingsComponent } from './members/member-edit/member-foto-settings/member-foto-settings.component';
import { DatepikerComponent } from './datepiker/datepiker.component';
import { MessagesTabComponent } from './members/member-edit/messages-tab/messages-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersListComponent,
    MembersDetailsComponent,
    ListsComponent,
    MessagesComponent,
    ErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    MemberFotoSettingsComponent,
    DatepikerComponent,
    MessagesTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,

   // NgxFontAwesomeModule

  ],
  providers: [HttpClientModule,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi:true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
