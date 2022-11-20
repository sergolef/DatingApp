import { User } from "./user.model";

export class LikeParams {
  currentPage: number = 1;
  pageSize: number=10;
  predicate: string = "liked";
}
