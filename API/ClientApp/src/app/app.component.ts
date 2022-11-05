import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Test';
  users: any;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.httpClient.get('https://localhost:5001/api/users').subscribe({
      next: resp => this.users = resp,
      error: error => console.log(error)
    });
  }
}
