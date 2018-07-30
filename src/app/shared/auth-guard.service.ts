import {Injectable} from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }
  // Used to Check if user is admin
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return new Observable<boolean>(observer => {
      this.userService.checkAccess().subscribe(res => {
        if (res) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      })
    });
  }
}
