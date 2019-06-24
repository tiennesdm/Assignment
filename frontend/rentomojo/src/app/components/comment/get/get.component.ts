import { Component, OnInit, DoCheck, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services/auth.service';
import { VoteService } from '../../../services/vote.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit, DoCheck {
  isLoading;
  data;
  getComment = [];
  getUpvote;
  getDownvote;
  token;
  isAuth;
  autoauth;
  comments2;
  updatedData;
  i; j;
  id2;
  item;
  @Output() valueChange = new EventEmitter();
  private postsSub: Subscription;
  constructor(private comments: CommentService, private auth: AuthService, private router: Router, private vote: VoteService) { }

  ngOnInit() {
  //  console.log('this', this.comments.getComment());
    this.data = this.comments.getComment();
    this.data = this.comments.getArrayResponse();

    // this.comments2 = this.comments.getComments();
    // console.log('comment',this.comments2);
    this.isLoading = true;
    /* this.comments.getComment().subscribe(data => {
       this.data = data;
       // this.getComment = data;
    //   console.log(this.data);
     });
  /*  this.postsSub = this.comments.getPostUpdateListener().subscribe((data) => {
       console.log('updated', data);
     }); */
    /* this.postsSub = this.postsService
       .getPostUpdateListener()
       .subscribe((postData: { posts: Post[]; postCount: number }) => {
         this.isLoading = false;
         this.totalPosts = postData.postCount;
         this.posts = postData.posts;
       }); */
  }
  ngDoCheck() {
    // this.updatedData = this.comments.getUpdatedComment();
    //  this.data.push(this.updatedData);
    //console.log('this rray', this.comments.getArrayResponse());

    this.data = this.comments.getArrayResponse();
    if(this.vote.getCountPost().length > 0){
      this.data = this.vote.getCountPost();
    }


   // console.log('this data', this.data);
   // console.log('commentget', this.getComment);
    //  this.data.splice(data2);

    //console.log()
   /* this.data[this.data.findIndex((el: any) =>
       el.id === this.id2.id)] = this.data;
    console.log('this.data', this.data); */

  }
  upvote(commentid: string) {

    this.autoauth = this.auth.autoAuthUser();
    this.token = this.auth.getToken();
    if (this.token) {
      this.vote.createUpvote(commentid, null);

    } else {
      this.router.navigate(['auth/login']);
    }
  }
  downvote(commentid: string) {
    this.autoauth = this.auth.autoAuthUser();
    this.token = this.auth.getToken();
    this.isAuth = this.auth.getIsAuth();
    if (this.token) {
      //   console.log('commentdown', commentid);
      this.vote.createDownvote(commentid, null);
    } else {
      this.router.navigate(['auth/login']);

    }


  }
  /*  ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
  */
}
