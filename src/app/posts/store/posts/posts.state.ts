import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BaseLoadableState, LoadableStateType } from '../../../core/state/loadable.state';
import { Post } from '../../../core/models/post.model';
import { PostsApiService } from '../../services/posts-api.service';
import { PostActions } from './posts.actions';


export type PostsStateType = LoadableStateType<Post[]>

@State<PostsStateType>({
    name: 'posts',
    defaults: {
        loading: false,
        entities: [],
        error: null,
    }
})
@Injectable()
export class PostsState extends BaseLoadableState {

    public constructor(
        private readonly postsApi: PostsApiService,
    ) {
        super();
    }


    @Action(PostActions.Fetch, { cancelUncompleted: true })
    public async fetch(ctx: StateContext<PostsStateType>) {
        ctx.patchState({ loading: true });

        const posts = await this.postsApi.fetch();

        ctx.patchState({
            loading: false,
            entities: posts,
        });
    }

    @Action(PostActions.Create)
    public async create(ctx: StateContext<PostsStateType>, {post}: PostActions.Create) {
        await this.postsApi.create(post);

        return ctx.dispatch(new PostActions.Fetch());
    }

    @Action(PostActions.Update)
    public async update(ctx: StateContext<PostsStateType>, {post}: PostActions.Update) {
        await this.postsApi.update(post);

        return ctx.dispatch(new PostActions.Fetch());
    }

    @Action(PostActions.Delete)
    public async deleteById(ctx: StateContext<PostsStateType>, action: PostActions.Delete) {
        await this.postsApi.deleteById(action.postId);

        return ctx.dispatch(new PostActions.Fetch());
    }
}
