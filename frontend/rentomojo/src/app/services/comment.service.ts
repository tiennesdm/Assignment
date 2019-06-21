import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { environment } from '../../environments/environment.prod';
import { CommentData } from '../model/comment.model';
//import { Socket } from 'ngx-socket-io';

const BACKEND_URL = environment.apiUrl + '/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {



  private commentStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}
  createComment(comment: string, creator: string) {
    const commentData: CommentData = { comment, creator: null };
    this.http.post(BACKEND_URL + '/', commentData).subscribe(
      () => {
        this.commentStatusListener.next(true);
        this.router.navigate(['/']);
      },
      error => {
        this.commentStatusListener.next(false);
      }
    );
  }
  getComment(): Observable<CommentData[]> {
    let url = BACKEND_URL + '/' ;
    return this.http.get<CommentData[]>(url);
  }
  getCommentStatusListener() {
    return this.commentStatusListener.asObservable();
  }
 /* public getComment(): any {
    const commentObservable = new Observable(observer => {
           setTimeout(() => {
               observer.next(BACKEND_URL + '/');
           }, 1000);
    });

    return commentObservable;
} */

}
