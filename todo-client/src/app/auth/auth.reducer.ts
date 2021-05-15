import {createReducer, on} from "@ngrx/store";
import {AuthActions} from "./action-types";
import {IAuth} from "./interfaces/auth";

export interface AuthState {
  showSignupForm: boolean;
  userAuth: IAuth
}

export const initialState: AuthState = {
  showSignupForm: false,
  userAuth: undefined
}

export const authReducer = createReducer(
  initialState,

  on(AuthActions.showSignupForm, (state, action) => {
    return { showSignupForm: action.showSignupForm, userAuth: undefined }
  }),

  on(AuthActions.signup, (state, action) => {
    return { showSignupForm: state.showSignupForm, userAuth: undefined }
  }),

  on(AuthActions.login, (state, action) => {
    return { showSignupForm: state.showSignupForm, userAuth: action.userAuth }
  }),

  on(AuthActions.logout, (state, action) => {
    return {showSignupForm: state.showSignupForm, userAuth: undefined}
  })
)
