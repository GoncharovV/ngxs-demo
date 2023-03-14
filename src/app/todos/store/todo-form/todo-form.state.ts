import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';

type TodoFormType = Partial<Todo>;

@State<TodoFormType>({
    name: 'todoForm',
    defaults: {}
})
@Injectable()
export class TodoFormState {}
