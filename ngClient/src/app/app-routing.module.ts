import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ItemviewComponent } from './itemview/itemview.component';
import { UserviewComponent } from './userview/userview.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard/ideas', ////***REMEMBER TO CHANGE THIS***//
    component: DashboardComponent,
    pathMatch: 'full'
  },

  {
    path: 'dashboard/users/:id',
    component: UserviewComponent,
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
