import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../auth/services/auth.service";
import { Observable } from "rxjs";

@Injectable({providedIn : 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
     if (this.authService.ValidateToken()) {
        this.router.navigate(["/home"]);
        return false;
        
     } else {
        return true;
     }   
  
  }
}
