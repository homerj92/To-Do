import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {IAuth} from "../interfaces/auth";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class AuthService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.protocol}${environment.apiBaseUrl}${environment.userRoute}`;
  }

  signUp(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(`${this.url}signup`, user);
  }

  login(email: string, password: string): Observable<IAuth> {
    return this.httpClient.post<IAuth>(`${this.url}login`, { email, password }).pipe(
      map(res => res['data'])
    );
  }
}
