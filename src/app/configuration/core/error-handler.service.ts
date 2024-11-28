import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle (errorResponse: any) {
    let msg: string;      

    if(typeof errorResponse == 'string') {

      msg = errorResponse;

    }else if(errorResponse.status == 0){

      return this.messageService.add({severity:'error', summary:'Erro', detail: 'Servidor da API está inacessível' });

    }else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      
      msg = "";
      console.log(errorResponse.error)                 
      msg = errorResponse.error;
      
    } else {
      msg = errorResponse.error.message;
    }

    this.messageService.add({severity:'error', summary:'Erro', detail: msg });
  }
}