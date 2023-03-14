import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TodoCreateDto, TodoStatuses, TodoUpdateDto } from '../../../core/models/todo.model';
import { AlertsService } from '../../../core/services/alerts.service';
import { TodoFormData } from '../../interfaces/todo-form-data';
import { Store } from '@ngxs/store';
import { ResetForm } from '@ngxs/form-plugin';

@Component({
  selector: 'ngxs-demo-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

    public readonly TODO_STATUSES = TodoStatuses;

    public loading = false;

    public get useStore() {
        return this.context.data.useStore;
    }

    public get isEditing() {
        return Boolean(this.context.data.formValue);
    }

    public todoForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
    })

    constructor(
        private readonly alertsService: AlertsService,
        private readonly store: Store,

        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<undefined, TodoFormData>,
    ) {
        if (this.context.data.formValue) {
            this.todoForm.patchValue(this.context.data.formValue);
        }
    }

    public reset() {
        this.store.dispatch(new ResetForm({ path: 'todoForm' }));
    }

    public close() {
        this.context.completeWith(undefined);
    }

    public async submit() {
        if (this.todoForm.invalid) {
            this.todoForm.markAllAsTouched();
            this.alertsService.error('Все поля формы должны быть заполнены');
            return;
        }

        await this.sendFormData();
    }

    private async sendFormData() {
        try {
            this.loading = true;

            const success = await this.context.data.onSubmit({
                ...this.context.data.formValue,
                ...this.todoForm.getRawValue(),
            } as TodoCreateDto | TodoUpdateDto);

            if (success) {
                this.context.completeWith(undefined);
            }
        } catch (error: unknown) {
            this.alertsService.error('Неизвестная ошибка');
        } finally {
            this.loading = false;
        }
    }
}
