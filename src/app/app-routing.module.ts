import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SearchComponent } from './search/search.component';
import { SearchbarComponent } from './searchbar/searchbar/searchbar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CreateformComponent } from './create/createform/createform.component';
import { AcoountGuard } from './acoount.guard';


const routes: Routes = [
  { path: '', component: SearchbarComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'search', component: SearchbarComponent },
  { path: 'admin', component: AdminComponent,canActivate : [AcoountGuard] },
  { path: 'createForm', component: CreateformComponent,canActivate : [AcoountGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
