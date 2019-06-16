import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy,DoCheck {
  isToken;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.isToken = this.authService.getToken();
   // console.log(this.isToken);
  }
  ngDoCheck(){
this.isToken = this.authService.getToken();
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
