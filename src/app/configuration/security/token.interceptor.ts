import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';

import { SegurancaService } from './seguranca.service';

export class NotAuthenticatedError {}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let router = inject(Router);
  let segurancaService = inject(SegurancaService);

  if(segurancaService.isAccessTokenInvalido()){
    segurancaService.limparAccessToken();
    router.navigateByUrl('login');
  }else{
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }  

  return next(req);

}