import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    public constructor(
        private readonly store: Store,
        private readonly router: Router,
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthorized = this.store.selectSnapshot(AuthState.isAuthorized)

        if (!isAuthorized) {
            this.router.navigate(['auth']);
            return false;
        }

        return true;
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }


}
