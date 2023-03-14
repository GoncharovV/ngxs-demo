import { Inject, Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Todo, TodoCreateDto } from '../../core/models/todo.model';
import { firstValueFrom } from 'rxjs';
import { TodosActions } from '../store/todos/todos.actions';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Store } from '@ngxs/store';
import { AlertsService } from '../../core/services/alerts.service';
import { ResetForm } from '@ngxs/form-plugin';
import { TodoFormData } from '../interfaces/todo-form-data';

@Injectable({
    providedIn: 'root'
})
export class TodosService {

    public constructor(
        private readonly store: Store,
        private readonly alertsService: AlertsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
    ) {}

    public fetchTodos() {
        this.store.dispatch(new TodosActions.Fetch())
    }

    public openEditDialog(todo: Partial<Todo>): void {
        this.openTodoFormDialog({
            useStore: false,
            formValue: todo,
            onSubmit: this.updateTodo,
        }).subscribe();
    }

    private readonly updateTodo = async (todo: Partial<Todo>) => {
        try {
            await firstValueFrom(this.store.dispatch(new TodosActions.Update(todo)));

            return true;
        } catch (err: unknown) {
            return false;
        }
    };

    public async confirmAndDeleteById(todoId: Todo['id']) {
        try {
            const confirmed = confirm('Удалить задачу?');

            if (confirmed) {
                await firstValueFrom(this.store.dispatch(new TodosActions.Delete(todoId)));
                this.alertsService.warning('Задача удалена');
            }
        } catch (err: unknown) {
            this.alertsService.error('Произошла ошибка');
        }
    }

    public openCreationDialog(): void {
        let hasTodoCreated = false;

        const onSubmit = async (todoDto: TodoCreateDto) => {
            hasTodoCreated = await this.createTodo({
                ...todoDto,
                id: Date.now(),
                completed: false,
            });
            return hasTodoCreated;
        };

        this.openTodoFormDialog({
            onSubmit: onSubmit,
            useStore: true,
        }).subscribe({
            complete: () => {
                if (!hasTodoCreated) {
                    this.alertsService.warning('Черновик сохранен');
                }
            }
        });
    }

    private readonly createTodo = async (todo: Todo) => {
        try {
            await firstValueFrom(this.store.dispatch(new TodosActions.Create(todo)));

            this.alertsService.success('Задача добавлена!');

            this.store.dispatch(new ResetForm({path: 'todoForm'}));

            return true;
        } catch (err: unknown) {

            this.alertsService.error('Произошла ошибка!');

            return false;
        }
    };

    private openTodoFormDialog(data: TodoFormData) {
        return this.dialogService.open<TodoFormData>(
            new PolymorpheusComponent(TodoFormComponent, this.injector),
            {
                dismissible: true,
                data: data,
            }
        );
    }
}
