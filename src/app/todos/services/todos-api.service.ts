import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Todo } from '../../core/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {

  constructor(
      private readonly http: HttpClient,
  ) { }

    public async fetch() {
      // return new Promise<Todo[]>(async resolve => {
      //     const todos = await firstValueFrom(this.http.get<Todo[]>('http://localhost:5000/todos'))
      //
      //       setTimeout(() => {
      //           resolve(todos);
      //       }, 5_000);
      //   })

        return await firstValueFrom(this.http.get<Todo[]>('http://localhost:5000/todos'));
    }

    public async create(todo: Todo) {
        return new Promise<Todo>(async resolve => {
            const newTodo = await firstValueFrom(this.http.post<Todo>('http://localhost:5000/todos', todo))

            setTimeout(async () => {
                resolve(newTodo);
            }, 5_000);
        })

        // return await firstValueFrom(this.http.post<Todo>('http://localhost:5000/todos', todo));
    }

    public async update(todo: Partial<Todo>) {
        return await firstValueFrom(this.http.put<Todo>(`http://localhost:5000/todos/${todo.id}`, todo));
    }

    public async deleteById(todoId: Todo['id']) {
        return await firstValueFrom(this.http.delete<void>(`http://localhost:5000/todos/${todoId}`));
    }
}
