import { User } from "./user.model";

export class UserParams {
  currentPage: number = 1;
  pageSize: number=10;
  gender: string;
  minAge:number = 18;
  maxAge: number = 60;
  orderBy: string = "city";
  constructor(user:User){
    this.gender = (user.gender === 'male') ? 'female' : 'male';
  }
}
