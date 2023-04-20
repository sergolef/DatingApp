import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { MessagesParams } from '../models/messagesparams.model';
import { NewMessage } from '../models/newmessage.mode';
import { getPaginatedResults, getPaginationParams } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements OnInit {
  BaseUrl:string = environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

  }

  getMessages(messageParams:MessagesParams){
    let paginationParams = getPaginationParams(messageParams.currentPage, messageParams.pageSize, this.http);

    paginationParams = paginationParams.append('Container', messageParams.container);

    return getPaginatedResults<Message[]>(this.BaseUrl + '/messages', paginationParams, this.http);

  }

  addMessage(message:NewMessage){
    return this.http.post<Message>(this.BaseUrl+'/messages', message);
  }

  getMessagesThread(username:string){
    return this.http.get<Message[]>(this.BaseUrl+'/messages/thread/'+username);
  }

}
