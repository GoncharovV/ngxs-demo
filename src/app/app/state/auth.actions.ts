import { LoginData } from '../services/auth-api.service';

export namespace AuthActions {

    export class Login {
        public static readonly type = '[AUTH] Login'

        constructor(
            public data: LoginData,
        ) {}
    }

    export class Logout {
        public static readonly type = '[AUTH] Logout'

        constructor() {}
    }


}
