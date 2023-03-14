
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    status: string;
}

export const TodoStatuses = ['Не начато', 'В процессе', 'Отложено']

export type TodoCreateDto = Omit<Todo, 'id' | 'completed'>

export type TodoUpdateDto = Omit<Todo, 'userId'>
