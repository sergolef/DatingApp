import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyCounter:number = 0;
  constructor(private spinner: NgxSpinnerService) { }

  busy(){
    console.log('basy-----');
    this.spinner.show();
    this.busyCounter++;

  }

  idle(){
    console.log('idle----');
    this.busyCounter--;
    if(this.busyCounter <= 0){
      this.busyCounter = 0;
      this.spinner.hide();
    }
  }
}
