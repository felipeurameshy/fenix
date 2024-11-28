import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Title } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe, registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from './configuration/core/error-handler.service';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { LoadingService } from './configuration/core/loading.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { tokenInterceptor } from './configuration/security/token.interceptor';
import { SegurancaService } from './configuration/security/seguranca.service';
import { SegurancaGuard } from './configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from './configuration/security/seguranca.deactivate.guard';

registerLocaleData(localePt, 'pt-BR');

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/','.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
    provideNoopAnimations(),    
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: environment.tokenAllowedDomains,
          disallowedRoutes: environment.tokenDisallowedRoutes,
        },
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),


    //Provider Angular
    DatePipe,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    //Provider PrimeNG
    MessageService,
    ConfirmationService,
    TranslateService,

    //Provider Criados
    ErrorHandlerService,
    SegurancaService,
    SegurancaGuard,
    SegurancaDeactivateGuard,
    LoadingService

  ]
};