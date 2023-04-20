import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginationResult } from "../models/paginationresult.model";

export function getPaginationParams(currentPage: number, pageSize:number, http:HttpClient) {
  let params = new HttpParams();

  params = params.append('PageNumber', currentPage.toString());
  params = params.append('PageSize', pageSize.toString());

  return params;
}

export function getPaginatedResults<T>(url: string, paginationParams: HttpParams, http:HttpClient) {
  let paginationResult: PaginationResult<T> = new PaginationResult<T>();
  return http.get<T>(url, { observe: 'response', params: paginationParams }).pipe(
    map(response => {
      paginationResult.result = response.body;
      if (response.headers.get('X-Pagination') !== null) {
        paginationResult.pagination = JSON.parse(response.headers.get('X-Pagination'));
      }
      return paginationResult;
    })
  );
}
