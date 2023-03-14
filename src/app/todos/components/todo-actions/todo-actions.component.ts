import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'ngxs-demo-todo-actions',
  templateUrl: './todo-actions.component.html',
  styleUrls: ['./todo-actions.component.scss']
})
export class TodoActionsComponent {

    public constructor(
        public readonly todosService: TodosService,
    ) {}

}
