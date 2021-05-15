import {createAction, props} from "@ngrx/store";

export const getUsername = createAction(
  '[Home page], Get username',
  props<{username: string}>()
)

export const updateUser = createAction(
  '[Edit Profile Dialog] Edit profile',
  props<{username: string}>()
)
