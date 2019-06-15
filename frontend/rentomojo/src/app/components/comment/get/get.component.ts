import { Component, OnInit, OnDestroy,OnChanges,DoCheck ,AfterViewChecked} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import {AuthService} from '../../../services/auth.service';
import {VoteService} from '../../../services/vote.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit, DoCheck{
  isLoading;
  data;
  getComment;
  getUpvote;
  getDownvote;
  token;
  isAuth;
  constructor(private comments: CommentService, private auth: AuthService,private router: Router, private vote: VoteService) {}

 ngOnInit() {
    this.isLoading = true;
    this.comments.getComment().subscribe(data => {
      this.data = data;
      // this.getComment = data;
      console.log(this.data);
    });
  }
 /* ngOnChanges(){
    this.comments.getComment().subscribe(data => {
      this.data = data;
      // this.getComment = data;
      console.log(this.data);
    });
  }*/
  ngDoCheck() {
    this.comments.getComment().subscribe(data => {
      this.data = data;
      // this.getComment = data;
    });

  }
  upvote(commentid: string){
    this.token = this.auth.getToken();
    this.isAuth = this.auth.getIsAuth();
    if(this.token){
     // console.log('commentup', commentid);
       this.vote.createUpvote(commentid, null);

    } else {
      this.router.navigate(['auth/login']);
    }
  }
  downvote(commentid: string){
    this.token = this.auth.getToken();
    this.isAuth = this.auth.getIsAuth();
    if (this.token) {
   //   console.log('commentdown', commentid);
      this.vote.createDownvote(commentid, null);
    } else {
      this.router.navigate(['auth/login']);

    }


  }

}
