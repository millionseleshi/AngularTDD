import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from "@angular/router";
import {UserComponent} from "../user/user.component";

const routes:Routes=[{
  path:'user',component:UserComponent
}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
