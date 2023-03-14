import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';


export class AuthInterceptor implements HttpInterceptor {

    public constructor(
        private readonly store: Store,
    ) {}


    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot<string>(state => state.auth.token);

        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        });

        return next.handle(req);
    }

}
