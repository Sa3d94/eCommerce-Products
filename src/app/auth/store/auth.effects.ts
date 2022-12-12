import { AuthService } from "./../auth.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import * as AuthActions from "./auth.actions";
import { User } from "../user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem("userData", JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};
const handleError = (error: any) => {
  let errorMessage = "An unknown error occurred!";
  if (!error.error || !error.error.error) {
    // We have to retun a non Error Observable
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (error.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "This email exists already";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "This email does not exist.";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "This password is not correct.";
      break;
  }

  return of(new AuthActions.AuthenticateFail(errorMessage));
};
// So That we Can Inject Into this Class
@Injectable()
export class AuthEffects {
  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),

      switchMap((authdata: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
              environment.firebaseAPIKey,
            {
              email: authdata.payload.email,
              password: authdata.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.SetLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData: AuthResponseData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((error) => {
              return handleError(error);
            })
          );
      })
    );
  });

  authLogin = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      // Creating a new Observable by Taking another Observable data
      switchMap((authdata: AuthActions.LoginStart) => {
        return this.http
          .post<any>(
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
              environment.firebaseAPIKey,
            {
              email: authdata.payload.email,
              password: authdata.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.SetLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData: AuthResponseData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((error) => {
              return handleError(error);
            })
          );
      })
    );
  });

  authRedirect = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap((action) => {
          if (action.type === AuthActions.LOGOUT) {
            this.router.navigate(["/auth"]);
          } else {
            this.router.navigate(["/"]);
          }
        })
      );
    },
    { dispatch: false }
  );

  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          return { type: "DUMMY" };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.SetLogoutTimer(expirationDuration);
          // this.user.next(loadedUser);
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
          });

          // this.autoLogout(expirationDuration);
        }

        return { type: "DUMMY" };
      })
    );
  });

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem("userData");
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
