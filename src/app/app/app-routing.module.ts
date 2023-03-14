import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

export const menuItems: Routes = [
    {
        title: 'TODO-лист',
        path: 'todos',
        canActivate: [AuthGuard],
        loadChildren: () => import('../todos/todos.module').then(m => m.TodosModule)
    },
    {
        title: 'Посты',
        path: 'posts',
        canActivate: [AuthGuard],
        loadChildren: () => import('../posts/posts.module').then(m => m.PostsModule)
    },
    {
        title: 'Пользователи',
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
    },
    {
        path: '**',
        redirectTo: 'todos',
    }
];


const routes: Routes = [
    {
        title: 'Авторизация',
        path: 'auth',
        canActivate: [NotAuthGuard],
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    },
    ...menuItems
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
