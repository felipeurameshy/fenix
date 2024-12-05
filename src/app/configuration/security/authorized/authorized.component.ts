import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent implements OnInit {

  code : any= '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.code) {
        this.authorizationService.obterNovoAccessTokenComCode(params.code, params.state)
          .then(() => {
            this.authorizationService.carregarToken();
            this.route.navigate(['/principal'])
          })
          .catch((e: any) => {
            this.route.navigate(['/login'])
          });
      } else {
        if(this.authorizationService.temPermissao('MENU_DASHBOARD')){
          this.route.navigate(['/dashboard/geral']);
        }else{
          this.route.navigate(['/principal']);
        }
      }
    });
  }

}