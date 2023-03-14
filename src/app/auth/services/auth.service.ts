import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../app/state/auth.actions';
import { AlertsService } from '../../core/services/alerts.service';
import { LoginData } from '../../app/services/auth-api.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private readonly store: Store,
        private readonly alerts: AlertsService,
        private readonly router: Router,
    ) {
    }

    public async login(data: LoginData) {
        try {
            await firstValueFrom(this.store.dispatch(new AuthActions.Login(data)));

            this.alerts.success('Добро пожаловать!');

            this.router.navigate(['']);
        } catch (err: unknown) {
            this.alerts.error('Произошла ошибка');
        }
    }

    public async logout() {
        try {
            const confirmed = confirm('Вы точно хотите выйти?');

            if (confirmed) {
                await firstValueFrom(this.store.dispatch(new AuthActions.Logout()));

                this.router.navigate(['auth']);
            }
        } catch (err: unknown) {
        }
    }
}
