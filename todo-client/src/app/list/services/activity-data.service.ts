import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Update} from "@ngrx/entity";
import {IActivity} from "../interfaces/activity";


@Injectable()
export class ActivityDataService extends DefaultDataService<IActivity> {
  url: string;

  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Activity', httpClient, httpUrlGenerator);
    this.url = `${environment.protocol}${environment.apiBaseUrl}${environment.activityRoute}`;
  }

  getWithQuery(listId:string): Observable<IActivity[]> {
    return this.http.get(`${this.url}getAll/${listId}`).pipe(
      map(res => res['data'])
    );
  }

  add(activity: IActivity): Observable<IActivity> {
    return this.http.post<IActivity>(`${this.url}insert`, activity).pipe(
      map(res => res['data'])
    );
  }


  update(activity: Update<IActivity>): Observable<IActivity> {
    return this.http.put<IActivity>(`${this.url}edit/${activity.changes._id}`, activity.changes).pipe(
      map(res => res['data'])
    );
  }

  delete(activityId: string): Observable<string> {
    return this.http.delete<string>(`${this.url}delete/${activityId}`).pipe(
      map(res => res['message'])
    );
  }
}
