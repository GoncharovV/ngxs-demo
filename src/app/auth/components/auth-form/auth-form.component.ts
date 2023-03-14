import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../../core/services/alerts.service';
import { LoginData } from 'src/app/app/services/auth-api.service';

@Component({
    selector: 'ngxs-demo-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {

    public loading = false;

    public authForm = new FormGroup({
        login: new FormControl('Vadim', [Validators.required]),
        password: new FormControl('123', [Validators.required]),
    })

    public constructor(
       private readonly auth: AuthService,
       private readonly alerts: AlertsService,
    ) {}

    public async login() {
        if (this.authForm.invalid) {
            this.alerts.error('Все поля формы должны быть заполнены');
            return;
        }

        this.loading = true;

        await this.auth.login(this.authForm.getRawValue() as LoginData);

        this.loading = false;
    }

}
