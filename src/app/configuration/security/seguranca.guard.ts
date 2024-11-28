import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SegurancaService } from './seguranca.service';

@Injectable()
export class SegurancaGuard implements CanActivate {

  constructor(
    private segurancaService: SegurancaService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.segurancaService.isAccessTokenInvalido()) {
        this.segurancaService.limparAccessToken();
      } else if (next.data['authorities']) {
        this.router.navigate(['/nao-autorizado']);
        return false;
      }

      return true;

  }

}