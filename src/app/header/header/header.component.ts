import { Component, OnInit } from '@angular/core';
import { GetSolutionService } from 'src/app/service/get-solution.service';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { APP_CONSTANT } from '../../app.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(
    private getSolutionService: GetSolutionService,
    private router: Router,
    public oktaAuth: OktaAuthService
  ) { }

  isUserLoggedIn: any;
  async ngOnInit() {
    this.isUserLoggedIn = await this.oktaAuth.isAuthenticated();
    this.getUser();
    this.oktaAuth.$authenticationState.subscribe((isAuthenticated: boolean) => {
      this.isUserLoggedIn = isAuthenticated;
      this.getUser();
    });
  }
  logout() {
    this.oktaAuth.logout('/');
    sessionStorage.clear();
  }
  async getUser() {
    this.user = await this.oktaAuth.getUser();
    console.log(this.user);
    if (this.user && APP_CONSTANT.SUPER_ADMIN.includes(this.user.email)) {
      this.getSolutionService.isAdmin.next(true);
    }
  }
}
