import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
import { CommentData } from '../model/comment.model';
import {GetcommentData} from '../model/getComment.model';
import { map, subscribeOn } from 'rxjs/operators';
// import { webSocket } from 'rxjs/webSocket';
// const subject = webSocket(environment.apiUrl);
// import * as io from 'socket.io-client';
const BACKEND_URL = environment.apiUrl + '/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
 // private socket = io(BACKEND_URL);


  private commentStatusListener = new Subject<boolean>();
  private array_object = [];
  i;
//  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: any }>();

  constructor(private http: HttpClient, private router: Router) {}
  //subject.subscribe((data)=>{}, (err)=>{});
  createComment(comment: string, creator: string) {
    const commentData: CommentData = { comment, creator: null };
    this.http.post(BACKEND_URL + '/', commentData).subscribe(
      (responseData:any) => {
        //console.log(this.post);
      //  console.log(responseData.post);

      /*  this.array_object = {
              comment,
              creator:null,
              upvotesCount:0,
              downvotsCount:0
        } */
        this.commentStatusListener.next(true);
        this.router.navigate(['/']);
        this.array_object.push(responseData.post);
      },
      error => {
        this.commentStatusListener.next(false);
      }
    );
  }
/*  getComments(){
    let url = BACKEND_URL + '/' ;
    this.http.get<{responseData:any}>(url).pipe(map((postdata)=>{

    console.log('postdata', postdata);
    return {
      posts:postdata
    };
    })).subscribe((data)=>{
      this.postsUpdated.next({
        posts: data
      });
      console.log('data', data);
    })
  }*/
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getComment() {
    let url = BACKEND_URL + '/' ;
    this.http.get(url).subscribe(
      (postdata: any) =>{
      //  console.log('postdata', postdata);
        for (this.i = 0; this.i < postdata.length;this.i++){
          this.array_object.push(postdata[this.i]);
        }


      }
    );
  }
  getArrayResponse() {
    return this.array_object;
  }

  getCommentStatusListener() {
    return this.commentStatusListener.asObservable();
  }
 /* getUpdatedComment() {
    return this.array_object;
  }*/
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
