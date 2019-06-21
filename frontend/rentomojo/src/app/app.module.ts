import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooMaterialModule } from './shared/angular-material/ngx-bootstrap.module';
import {AngularMaterialModule} from './shared/angular-material/angular-material.module';
import {AuthModule} from './components/auth/auth.module';
import {CommentModule} from './components/comment/comment.module';
import { TabsModule } from 'ngx-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './components/error/error.component';
import { environment } from '../environments/environment';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const BACKEND_URL = environment.apiUrl;

//const config: SocketIoConfig = { url: BACKEND_URL, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BooMaterialModule,
    AuthModule,
    CommentModule,
    HttpClientModule,
  //  SocketIoModule.forRoot(config),
    TabsModule.forRoot()

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
