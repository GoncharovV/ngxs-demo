import { Todo } from '../../../core/models/todo.model';


export namespace TodosActions {

    export class Fetch {
        static readonly type = '[TODO] Fetch'
    }

    export class Create {
        static readonly type = '[TODO] Create'

        public constructor(
            public todo: Todo
        ) {}
    }

    export class Update {
        static readonly type = '[TODO] Update'

        public constructor(
            public todo: Partial<Todo>
        ) {}
    }

    export class Delete {
        static readonly type = '[TODO] Delete'

        public constructor(
            public todoId: Todo['id']
        ) {}
    }
}
