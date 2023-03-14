import { Component, Input } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
    selector: 'ngxs-demo-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {

    @Input()
    public todo!: Todo;

    public constructor(
        public readonly todosService: TodosService,
    ) {}

}
