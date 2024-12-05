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
      errorResponse.error.forEach(function (value: any) {  
        msg = value.mensagem + ", " + msg;
      });                     
      msg = msg.substr(0,msg.length - 2);
      
    } else {
      msg = errorResponse
    }

    this.messageService.add({severity:'error', summary:'Erro', detail: msg });
  }
}