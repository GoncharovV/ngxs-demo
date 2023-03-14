import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { TodoFormState } from '../todos/store/todo-form/todo-form.state';
import { AuthGuard } from './guards/auth.guard';
import { AuthState } from './state/auth.state';
import { NotAuthGuard } from './guards/not-auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,

        NgxsModule.forRoot([
            AuthState,
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsFormPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({
            key: [ TodoFormState, AuthState ]
        }),
    ],
    providers: [
        AuthGuard,
        NotAuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
