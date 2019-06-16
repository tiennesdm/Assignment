import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {CommentService} from '../../../services/comment.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isLoading = false;
  istoken;
  isAuth;
  message;
  commentForm;
  constructor( private router: Router, private auth: AuthService, private comment: CommentService) { }

  ngOnInit() {
  }
  onComment(form: NgForm) {
    console.log('comment', form.value.comment );
    this.istoken = this.auth.getToken();
    this.isAuth = this.auth.getIsAuth();
  //  console.log('is Auth', this.isAuth);
    if(this.istoken) {
      this.commentForm = form.value.comment;

      if(this.commentForm === ''){
        this.message = 'Please Write the Comment';
      } else {
        this.comment.createComment(this.commentForm,null);
        form.reset();
        this.message = '';
      }

    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}
