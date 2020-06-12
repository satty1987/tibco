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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';



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
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule





  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [DialogBoxComponent],
})
export class AppModule { }
