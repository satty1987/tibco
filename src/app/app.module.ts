import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header/header.component';
import { LoginComponent } from './login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar/searchbar/searchbar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { FooterComponent } from './footer/footer/footer.component';
import { CreateformComponent } from './create/createform/createform.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MaterialModule } from './material.module';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { UpdateComponent } from './update/update.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { ReportPostsComponent } from './report-posts/report-posts.component';
import { ReportReasonComponent } from './report-reason/report-reason.component';
import { UpdateRequestComponent } from './update-request/update-request.component';
import { NewRequestComponent } from './new-request/new-request.component';


const oktaConfig = {
  issuer: 'https://dev-337333.oktapreview.com/oauth2/default',
  clientId: '0oafkl686pfl21cP10h7',
  redirectUri: window.location.origin+'/implicit/callback',
  pkce: true,
  tokenManager: {
    storage: 'sessionStorage'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    LoginComponent,
    SearchbarComponent,
    AdminComponent,
    FooterComponent,
    CreateformComponent,
    PaginatorComponent,
    DialogBoxComponent,
    UpdateComponent,
    ReportPostsComponent,
    ReportReasonComponent,
    UpdateRequestComponent,
    NewRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    OktaAuthModule,
    NgxPaginationModule

  ],
  providers: [ { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [DialogBoxComponent, UpdateComponent,
    ReportPostsComponent, NewRequestComponent,
    UpdateRequestComponent, ReportReasonComponent],
})
export class AppModule { }
