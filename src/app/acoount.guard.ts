import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetSolutionService } from './service/get-solution.service';

@Injectable({
  providedIn: 'root'
})
export class AcoountGuard implements CanActivate {
  isUserLoggedIn: any;
  constructor(private getSolutionService: GetSolutionService,
    private router: Router,
  ) {
    this.getSolutionService.isLoggedIn.subscribe(data => {
      this.isUserLoggedIn = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('');
    }

  }

}
