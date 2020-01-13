import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router) {
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
                this.authenticationService.getCurrentUser()
                    .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject('No user logged in');
                            this.router.navigateByUrl('/login');
                        }
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}
