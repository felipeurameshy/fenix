import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject = new BehaviorSubject<boolean>(false);
  mostrarMenu$: Observable<boolean> = this.menuSubject.asObservable();

  exibirMenu(valor: boolean){
    this.menuSubject.next(valor);
  }

}