import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: `${environment.tmdbUrl}${request.url}`,
            setParams: {
                api_key: `${environment.tmdbApiKey}`
            }
        });

        return next.handle(request);
    }
}
