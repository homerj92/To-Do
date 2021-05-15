import {createAction, props} from "@ngrx/store";
import {IAuth} from "./interfaces/auth";

export const showSignupForm = createAction(
  '[Login Page] Show signup form ',
  props<{ showSignupForm: boolean }>()
)

export const signup = createAction(
  '[Login Page] Signup user'
)

export const login = createAction(
  '[Login Page] Login user',
  props<{ userAuth: IAuth }>()
)

export const logout = createAction(
  '[Home Page] Logout user'
)
