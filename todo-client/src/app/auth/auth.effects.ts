import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthActions} from "./action-types";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {iif, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import {UserService} from "../list/services/user.service";
import {getUsername} from "../list/actions/user.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(action => sessionStorage.setItem('userAuth', JSON.stringify(action.userAuth))),
    concatMap(action => iif(() => !sessionStorage.getItem('username'), this.userService.getUsername(action.userAuth.id), of(sessionStorage.getItem('username')))),
    map(username => getUsername({username: username }))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(action => {
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    })
  ), {dispatch: false});
}
