import { Todo, TodoCreateDto, TodoUpdateDto } from '../../core/models/todo.model';

export interface TodoFormData {
    formValue?: Partial<Todo>;

    onSubmit(todoDto: TodoCreateDto | TodoUpdateDto): Promise<boolean>;

    useStore: boolean;
}
