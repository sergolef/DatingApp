import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  BASE_URL = "https://localhost:5001/api";
  ngOnInit(): void {
  }
  gotoerror(rnum:number){
    let urlSufix = "";
    switch (rnum) {
      case 400:
        urlSufix = "/buggy/bad-request";
        break;
      case 401:
        urlSufix = "/buggy/auth";
        break;

      case 404:
        urlSufix = "/buggy/not-found";
        break;

      case 500:
        urlSufix = "/buggy/server-error";
        break;

      case 4:
        urlSufix = "/account/register";
        this.http.post(this.BASE_URL+urlSufix, {}).subscribe({
          next: res => {
            console.log(res);
          },
          error: error => {
            console.log(error);
          }
        });
        return;
        break;

      default:
        break;
    }

    this.http.get(this.BASE_URL+urlSufix).subscribe({
      next: res => {
        console.log(res);
      },
      error: error => {
        console.log(error);
      }
    });

  }

}
