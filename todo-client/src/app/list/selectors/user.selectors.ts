import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const getUsername = createSelector(
  selectUserState,
  user => user?.username
)
