import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import localePt from '@angular/common/locales/pt';

import { JwtModule } from '@auth0/angular-jwt';

import { routes } from './app.routes';
import { SegurancaGuard } from './configuration/guard/seguranca.guard';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ErrorHandlerService } from './configuration/core/error-handler.service';
import { SegurancaDeactivateGuard } from './configuration/guard/seguranca.deactivate.guard';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './configuration/interceptors/token.interceptor';
import { LoadingService } from './configuration/core/loading.service';
import { AuthorizationService } from './configuration/security/authorization.service';
import { SystemService } from './configuration/core/system.service';
import { environment } from '../environments/environment';

registerLocaleData(localePt, 'pt-BR');

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideHttpClient(),
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
      }),
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
    AuthorizationService,
    SegurancaGuard,
    SegurancaDeactivateGuard,
    ErrorHandlerService,
    LoadingService,
    SystemService,
  ]
};