import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamService {


  navData: any;
  constructor() { }

  set(obj) {
    this.navData = obj;
  }

  get() {
    if(this.navData === null || this.navData === undefined){
      return 0;
    }
    return this.navData;
  }
}
