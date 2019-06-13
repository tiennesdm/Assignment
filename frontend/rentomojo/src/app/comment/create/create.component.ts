import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isLoading = false;
  constructor( private router: Router) { }

  ngOnInit() {
  }
  onComment(form: NgForm){
    if(localStorage.getItem('token') !='' || localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') == 'null' ){
      console.log('yes I am', localStorage.getItem('token'));
      this.router.navigate['/get']
      // this.router.navigate['auth/login'];

    }
    else{
      console.log(form.value.comment);
      alert('Thankyou');
    }

  }

}
