import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SearchComponent } from './search/search.component';
import { SearchbarComponent } from './searchbar/searchbar/searchbar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CreateformComponent } from './create/createform/createform.component';
import { AcoountGuard } from './acoount.guard';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';


const routes: Routes = [
  { path: '', component: SearchbarComponent },
  { path: 'login', component: LoginComponent, canActivate: [OktaAuthGuard] },
  // { path: 'search', component: SearchbarComponent },
  { path: 'admin', component: AdminComponent, canActivate: [OktaAuthGuard] },
  { path: 'createForm', component: CreateformComponent, canActivate: [OktaAuthGuard] },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
