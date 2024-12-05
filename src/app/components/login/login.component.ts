import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthorizationService } from '../../configuration/security/authorization.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule],
})
export class LoginComponent implements OnInit {
  
  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {}

  login() {
    this.authorizationService.login();
  }

}