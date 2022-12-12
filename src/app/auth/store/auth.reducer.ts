import { LOGIN_START } from "./auth.actions";
import { User } from "../user.model";
import * as AuthActions from ".//auth.actions";

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    case AuthActions.SIGNUP_START:
      return {
        ...state,
        user: null,
        authError: null,
        loading: true,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,

        authError: null,
      };

    default:
      return state;
  }
}
