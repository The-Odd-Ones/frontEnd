import { Injectable, NgZone } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../services/http/http.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardClient implements CanActivate {
  constructor(public router: Router, private http: HttpService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token")) {
      return this.http.get("/users/verify").pipe(
        map((one: any) => {
          if (one.success) {
            if (one.user.isAdmin) {
              this.router.navigate(["dashboard"]);
              return false;
            } else if (!one.user.isVerified) {
              this.router.navigate(["verify"]);
            } else {
              if (!localStorage.community) {
                this.router.navigate(["community"]);
              } else return true;
            }
          } else {
            this.router.navigate([""]);
            return false;
          }
        })
      );
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private router: Router, private http: HttpService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token")) {
      return this.http.get("/users/verify").pipe(
        map((one: any) => {
          if (one.success) {
            if (one.user.isAdmin) {
              return true;
            } else if (!one.user.isVerified) {
              this.router.navigate(["verify"]);
            } else {
              this.router.navigate(["home"]);
              return false;
            }
          } else {
            this.router.navigate([""]);
            return false;
          }
        })
      );
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class AuthGuardGuest implements CanActivate {
  constructor(private router: Router, private http: HttpService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token")) {
      return this.http.get("/users/verify").pipe(
        map((one: any) => {
          if (one.success) {
            if (one.user.isAdmin) {
              this.router.navigate(["dashboard"]);
              return false;
            } else if (!one.user.isVerified) {
              this.router.navigate(["verify"]);
            } else {
              this.router.navigate(["home"]);
              return false;
            }
          } else return true;
        })
      );
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class AuthGuardVerify implements CanActivate {
  constructor(private router: Router, private http: HttpService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token")) {
      return this.http.get("/users/verify").pipe(
        map((one: any) => {
          if (one.success) {
            console.log(one);
            if (one.user.isAdmin) {
              this.router.navigate(["dashboard"]);
              return false;
            } else if (!one.user.isVerified) {
              return true;
            } else {
              this.router.navigate(["home"]);
              return false;
            }
          } else {
            this.router.navigate([""]);
            return false;
          }
        })
      );
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class AuthGuardCommunity implements CanActivate {
  constructor(public router: Router, private http: HttpService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token")) {
      return this.http.get("/users/verify").pipe(
        map((one: any) => {
          if (one.success) {
            if (one.user.isAdmin) {
              this.router.navigate(["dashboard"]);
              return false;
            } else if (!one.user.isVerified) {
              this.router.navigate(["verify"]);
            } else {
              if (localStorage.community) {
                this.router.navigate(["home"]);
              } else return true;
            }
          } else {
            this.router.navigate([""]);
            return false;
          }
        })
      );
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}

// canActivateChild(
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ):
//   | Observable<boolean | UrlTree>
//   | Promise<boolean | UrlTree>
//   | boolean
//   | UrlTree {
//   return true;
// }
// canLoad(
//   route: Route,
//   segments: UrlSegment[]
// ): Observable<boolean> | Promise<boolean> | boolean {
//   return true;
// }
