import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {CommentRoutingModule} from './comment-routing.module';

@NgModule({
  declarations: [CreateComponent, GetComponent],
  imports: [
    CommonModule,
     AngularMaterialModule,
     FormsModule,
    CommentRoutingModule]
})
export class CommentModule { }
