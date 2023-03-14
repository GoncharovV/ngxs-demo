import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { TodosState } from './store/todos/todos.state';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodosRoutingModule } from './todos-routing.module';
import {
    TuiActionModule,
    TuiCheckboxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputDateModule,
    TuiInputModule, TuiInputPasswordModule,
    TuiIslandModule,
    TuiRadioBlockModule, TuiSelectModule
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiPrimitiveCheckboxModule } from '@taiga-ui/core';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoActionsComponent } from './components/todo-actions/todo-actions.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';


@NgModule({
    declarations: [
        TodoListComponent,
        TodoItemComponent,
        TodoActionsComponent,
        TodoPageComponent,
        TodoFormComponent
    ],
    imports: [
        CommonModule,
        NgxsModule.forFeature([
            TodosState
        ]),
        TodosRoutingModule,
        TuiIslandModule,
        TuiCheckboxModule,
        TuiRadioBlockModule,
        TuiPrimitiveCheckboxModule,
        TuiActionModule,
        TuiButtonModule,
        NgxsFormPluginModule,
        TuiErrorModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiFieldErrorPipeModule,
        TuiInputDateModule,
        TuiSelectModule,
        TuiGroupModule,
        TuiInputPasswordModule,
        TuiDataListWrapperModule,
        CoreModule,
    ],
    bootstrap: []
})
export class TodosModule {
}
