import {createReducer, on} from "@ngrx/store";
import {UserActions} from "../action-user-types";

export interface UserState {
  username: string,
}

export const initialUserState: UserState = {
  username: undefined,
};

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.getUsername, (state, action) => {
    return { username: action.username }
  }),

  on(UserActions.updateUser, (state, action) => {
    return { username: action.username }
  })
)
