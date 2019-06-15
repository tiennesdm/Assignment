import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';

const routes: Routes = [
  { path: '', component: CreateComponent },
  { path: 'get', component: GetComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CommentRoutingModule {}
