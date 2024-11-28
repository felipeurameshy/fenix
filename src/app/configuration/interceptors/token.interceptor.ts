import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthorizationService } from '../security/authorization.service';

export class NotAuthenticatedError {}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let router = inject(Router);
  let authorizationService = inject(AuthorizationService);

  if(authorizationService.isAccessTokenInvalido()){
    authorizationService.limparAccessToken();
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