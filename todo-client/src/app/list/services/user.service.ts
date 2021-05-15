import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.protocol}${environment.apiBaseUrl}${environment.userRoute}`;
  }

  getUsername(userId: string): Observable<string> {
    return this.http.get<string>(`${this.url}${userId}`).pipe(
      map(res => res['data'].username)
    );
  }

  updateUser(userId: string, username: string): Observable<string> {
    return this.http.put<string>(`${this.url}update/${userId}`, {username}).pipe(
      map(res => res['data'].username)
    );
  }
}
