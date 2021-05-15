import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {IList} from "../interfaces/list";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Update} from "@ngrx/entity";

@Injectable()
export class ListDataService extends DefaultDataService<IList> {
  url: string;
  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('List', httpClient, httpUrlGenerator);
    this.url = `${environment.protocol}${environment.apiBaseUrl}${environment.listRoute}`;
  }

  getWithQuery(userId:string): Observable<IList[]> {
    return this.http.get(`${this.url}getAll/${userId}`).pipe(
      map(res => res['data'])
    );
  }

  add(list: IList): Observable<IList> {
    return this.http.post<IList>(`${this.url}insert`, list).pipe(
      map(res => res['data'])
    );
  }


  update(list: Update<IList>): Observable<IList> {
    return this.http.put<IList>(`${this.url}edit/${list.changes._id}`, list.changes).pipe(
      map(res => res['data'])
    );
  }

  delete(listId: string): Observable<string> {
    return this.http.delete<string>(`${this.url}delete/${listId}`).pipe(
      map(res => res['message'])
    );
  }
}
