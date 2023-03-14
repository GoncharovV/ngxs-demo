import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../state/auth.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'ngxs-demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @Select(AuthState.isAuthorized) isAuthorized$!: Observable<boolean>;
}
