import { Component, OnInit } from '@angular/core';
import { GetSolutionService } from 'src/app/service/get-solution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private getSolutionService: GetSolutionService,
    private router: Router,
  ) { }

  isUserLoggedIn: any;
  ngOnInit() {
    this.getSolutionService.isLoggedIn.subscribe(data => {
      this.isUserLoggedIn = data;
    })
  }
  logout() {
    console.log('logout');
    this.getSolutionService.isLoggedIn.next(false);
    this.getSolutionService.isLoggedIn.subscribe(data => {
      this.isUserLoggedIn = data;
    });
    this.router.navigateByUrl("");
    sessionStorage.clear();
  }
}
