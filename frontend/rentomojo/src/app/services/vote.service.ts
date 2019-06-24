import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
import { VoteData} from '../model/vote.model';

const BACKEND_URL = environment.apiUrl + '/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  responseCount = [];

  private voteStatusListener = new Subject<boolean>();
  private array = [];
  i;

  constructor(private http: HttpClient, private router: Router) {}
  createUpvote(commentId: string, creator: string) {
    const voteData: VoteData = { commentId, creator: null };
 //   console.log('vote', voteData);
    this.http.post(BACKEND_URL + '/upvote', voteData).subscribe(
      (count: any) => {
        console.log('count', count.post);
       // this.responseCount = [];
        this.array = [];
        this.router.navigate(['/']);
       // console.log('postdata', postdata);
        for (this.i = 0; this.i < count.post.length;this.i++){
          this.array.push(count.post[this.i]);
        }
       // this.responseCount.push(count.post);
      //  console.log('count', count);
      },
      error => {
     //   console.log(error);
        this.voteStatusListener.next(false);
      }
    );
  }
  createDownvote( commentId: string, creator: string) {
    const voteData: VoteData = {commentId, creator:null };
   // console.log('voteId', voteData);
    this.http.post(BACKEND_URL + '/downvote', voteData).subscribe(
      (count: any) => {
        this.array = [];
        this.router.navigate(['/']);
        for (this.i = 0; this.i < count.post.length;this.i++){
          this.array.push(count.post[this.i]);
        }
        // console.log('count', count.post);
       // this.responseCount = [];
       // this.responseCount.push( count.post);
      },
      error => {
     //   console.log(error);
        this.voteStatusListener.next(false);
      }
    )

  }
  getCountPost(){
    return this.array;
  }
}
