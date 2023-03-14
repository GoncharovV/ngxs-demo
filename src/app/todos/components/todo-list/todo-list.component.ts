import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodosState, TodosStateType } from '../../store/todos/todos.state';
import { Observable } from 'rxjs';
import { TodosActions } from '../../store/todos/todos.actions';

@Component({
  selector: 'ngxs-demo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    @Select(TodosState) todos$!: Observable<TodosStateType>;

    public constructor(
        private readonly store: Store,
    ) {
    }

    public ngOnInit() {
        this.store.dispatch(new TodosActions.Fetch())
    }
}
