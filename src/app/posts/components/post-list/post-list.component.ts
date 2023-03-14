import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PostsState } from '../../store/posts/posts.state';
import { Observable } from 'rxjs';
import { Post } from '../../../core/models/post.model';
import { PostActions } from '../../store/posts/posts.actions';

@Component({
  selector: 'ngxs-demo-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

    @Select(PostsState.entities()) posts$!: Observable<Post[]>;

    @Select(PostsState.loading()) loading$!: Observable<boolean>;

    public constructor(
        private readonly store: Store,
    ) {
    }

    public ngOnInit() {
        this.store.dispatch(new PostActions.Fetch())
    }
}
