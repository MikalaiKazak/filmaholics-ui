import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(public authenticationService: AuthenticationService, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return new Promise(async (resolve, reject) => {
            try {
                this.authenticationService.isLoggedIn().then(
                    (val) => {
                        if (val) {
                            resolve(val);
                        } else {
                            reject(val);
                            this.router.navigateByUrl('/login');
                            console.log(val);
                        }
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(async (resolve, reject) => {
            try {
                this.authenticationService.isLoggedIn().then(
                    (val) => {
                        if (val) {
                            reject('user logged in');
                            this.router.navigateByUrl('/home');
                        } else {
                            resolve(true);
                        }
                    }
                );
            } catch (error) {
                resolve(true);
            }
        });
    }
}
