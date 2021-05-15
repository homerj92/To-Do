import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserActions} from "../action-user-types";
import {tap} from "rxjs/operators";


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
  ) {}

  username$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUsername),
    tap(action => sessionStorage.setItem('username', action.username))
  ), {dispatch: false})

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    tap(action => sessionStorage.setItem('username', action.username))
  ), {dispatch: false})
}
