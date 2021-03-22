import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

type Domains = 'admin' | 'caretaker';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.authService.isLoggedIn()) {
        this.navigateToCorrectDomain();
      }
      resolve(true);
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.canActivate(route);
  }

  private navigateToCorrectDomain() {
    const domain: Domains = this.getDomainToNavigateTo();
    this.router.navigate([domain])
  }

  private getDomainToNavigateTo(): Domains {
    if (this.authService.isAdmin()) {
      return 'admin';
    }
    if (this.authService.isCaretaker()) {
      return 'caretaker';
    }
    throw new Error(`Incorrect user type`);
  }

}
