import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostActionsComponent } from './components/post-actions/post-actions.component';
import { TuiLoaderModule } from '@taiga-ui/core';
import { NgxsModule } from '@ngxs/store';
import { PostsState } from './store/posts/posts.state';


@NgModule({
    declarations: [
        PostsPageComponent,
        PostItemComponent,
        PostListComponent,
        PostActionsComponent
    ],
    imports: [
        CommonModule,
        PostsRoutingModule,
        TuiLoaderModule,
        NgxsModule.forFeature([
            PostsState,
        ])
    ]
})
export class PostsModule {
}
