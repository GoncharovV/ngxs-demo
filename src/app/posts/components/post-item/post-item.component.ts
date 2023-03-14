import { Component, Input } from '@angular/core';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'ngxs-demo-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

    @Input()
    public post!: Post;
}
