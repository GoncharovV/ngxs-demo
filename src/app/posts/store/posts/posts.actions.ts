import { Post } from '../../../core/models/post.model';


export namespace PostActions {

    export class Fetch {
        public static readonly type = '[POST] Fetch'
    }

    export class Create {
        public static readonly type = '[POST] Create'

        public constructor(
            public post: Post
        ) {}
    }

    export class Update {
        public static readonly type = '[POST] Update'

        public constructor(
            public post: Partial<Post>
        ) {}
    }

    export class Delete {
        public static readonly type = '[POST] Delete'

        public constructor(
            public postId: Post['id']
        ) {}
    }
}
