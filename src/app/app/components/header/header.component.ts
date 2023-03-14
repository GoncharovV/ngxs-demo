import { Component } from '@angular/core';
import { menuItems } from '../../app-routing.module';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'ngxs-demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public menuItems = menuItems;

    public constructor(
        public readonly auth: AuthService,
    ) {}
}
