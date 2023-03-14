import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Post } from '../../core/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public async fetch() {
        return new Promise<Post[]>(async resolve => {
            const posts = await firstValueFrom(this.http.get<Post[]>('http://localhost:5000/posts'))

            setTimeout(() => {
                resolve(posts);
            }, 2_000);
        })

        // return await firstValueFrom(this.http.get<Post[]>('http://localhost:5000/posts'));
    }

    public async create(post: Post) {
        return await firstValueFrom(this.http.post<Post>('http://localhost:5000/posts', post));
    }

    public async update(post: Partial<Post>) {
        return await firstValueFrom(this.http.put<Post>(`http://localhost:5000/posts/${post.id}`, post));
    }

    public async deleteById(post: Post['id']) {
        return await firstValueFrom(this.http.delete<void>(`http://localhost:5000/posts/${post}`));
    }

}
