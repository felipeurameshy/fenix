import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { MenuComponent } from './components/menu/menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './configuration/core/loading.service';
import { SystemService } from './configuration/core/system.service';
import { MenuService } from './configuration/core/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule, CommonModule, RouterOutlet, ToastModule, ConfirmDialogModule, MenuComponent, LoadingComponent]
})
export class AppComponent implements OnInit {
  
  @ViewChild(MenuComponent) menuComponent!: MenuComponent
  title = 'Fênix';
  tipoServidor!: boolean;
  mostrarLoading: boolean = false;
  mostrarMenu: boolean = false;

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    public systemService: SystemService,
    public loadingService: LoadingService,
    public menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    
    this.systemService.validarTipoServidor()
    .then(dados => {
      this.tipoServidor = dados;
    })
    
    this.loadingService.loading$.subscribe((val) => {
      this.mostrarLoading = val;
      this.cdr.detectChanges();
    });

    this.menuService.mostrarMenu$.subscribe((val) => {
      this.mostrarMenu = val;
      this.cdr.detectChanges();
    });
    
  }

}