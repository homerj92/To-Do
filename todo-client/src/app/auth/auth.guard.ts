import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable, of} from 'rxjs';
import {isLoggedIn} from './auth.selectors';
import {tap} from 'rxjs/operators';
import {login} from "./auth.actions";

@Injectable()
export class AuthGuard  implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const userAuth = sessionStorage.getItem('userAuth');

    if (userAuth) {
      this.store.dispatch(login({ userAuth: JSON.parse(userAuth) }));
      return of(true);
    }

    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) { this.router.navigateByUrl('/login'); }
      })
    );
  }
}
