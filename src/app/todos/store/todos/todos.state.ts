import { Action, State, StateContext } from '@ngxs/store';
import { Todo } from '../../../core/models/todo.model';
import { TodosActions } from './todos.actions';
import { TodosApiService } from '../../services/todos-api.service';
import { Injectable } from '@angular/core';


export type TodosStateType = Todo[];

@State<TodosStateType>({
    name: 'todos',
    defaults: []
})
@Injectable()
export class TodosState {

    public constructor(
        private readonly todosApi: TodosApiService,
    ) {}

    @Action(TodosActions.Fetch, {cancelUncompleted: true})
    public async fetch(ctx: StateContext<TodosStateType>) {
        const todos = await this.todosApi.fetch();

        ctx.setState(todos);
    }

    @Action(TodosActions.Create)
    public async create(ctx: StateContext<TodosStateType>, {todo}: TodosActions.Create) {
        await this.todosApi.create(todo);

        return ctx.dispatch(new TodosActions.Fetch());
    }

    @Action(TodosActions.Update)
    public async update(ctx: StateContext<TodosStateType>, {todo}: TodosActions.Update) {
        await this.todosApi.update(todo);

        return ctx.dispatch(new TodosActions.Fetch());
    }

    @Action(TodosActions.Delete)
    public async deleteById(ctx: StateContext<TodosStateType>, action: TodosActions.Delete) {
        await this.todosApi.deleteById(action.todoId);

        return ctx.dispatch(new TodosActions.Fetch());
    }

}
