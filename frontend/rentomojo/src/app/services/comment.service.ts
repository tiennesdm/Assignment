import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { environment } from '../../environments/environment.prod';
import { CommentData } from '../model/comment.model';
import { map, subscribeOn } from 'rxjs/operators';
// import { webSocket } from 'rxjs/webSocket';
// const subject = webSocket(environment.apiUrl);
import * as io from 'socket.io-client';
const BACKEND_URL = environment.apiUrl + '/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
 // private socket = io(BACKEND_URL);

  private commentStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}
  //subject.subscribe((data)=>{}, (err)=>{});
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
  getComments(){
    let url = BACKEND_URL + '/' ;
    this.http.get<{responseData:any}>(url).pipe(map((postdata)=>{
    console.log('postdata', postdata);
    })).subscribe((data)=>{
      console.log('data', data);
    })
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
/*
 subject.subscribe(
  msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
  err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
  () => console.log('complete') // Called when connection is closed (for whatever reason).
);*/


}
