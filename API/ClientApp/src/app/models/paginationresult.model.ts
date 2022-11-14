import { Pagination } from "./pagination.model";

export class PaginationResult<T> {
  result: T;
  pagination: Pagination;
}
