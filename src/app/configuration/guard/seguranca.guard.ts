import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../security/authorization.service';
import { MenuService } from '../core/menu.service';

@Injectable()
export class SegurancaGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authorizationService.isAccessTokenInvalido()) {
        this.authorizationService.limparAccessToken();
      } else if (next.data['roles']) {
        this.router.navigate(['/nao-autorizado']);
        return false;
      }

      return true;

  }

}