import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthorizedComponent } from '../../configuration/security/authorized/authorized.component';


@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [AuthorizedComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit {

  constructor(
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle ('Fênix');
  }

}