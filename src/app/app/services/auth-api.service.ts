import { Injectable } from '@angular/core';


export interface LoginData {
    login: string;
    password: string;
}

export interface AuthData {
    username: string;
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {

    public async login(data: LoginData): Promise<AuthData> {
        if (data.login === 'Vadim' && data.password === '123') {
            return Promise.resolve({
                token: 'token',
                username: 'Vadim',
            });
        }

        return new Promise((_, reject) => {
            setTimeout(reject, 3500);
        })
    }

    public async logout() {
        return Promise.resolve();
    }

}
