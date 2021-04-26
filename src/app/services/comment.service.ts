import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  postComment( body: any) {
      return this.http.post( environment.apiUrl + '/comments/' + body.newsId, body);
  }

  getPosts(){
    return this.http.get( environment.apiUrl + '/comments/get');
  }
}
