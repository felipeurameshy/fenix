import {
  Directive,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: 'input[upperCase]:not([lowerCase]),textarea[upperCase]:not([lowerCase])',
})
export class UpperCaseDirective {

  @Input() upperCase: string = "";

  private getCaret (el:any) {

    return {
      start: el.selectionStart,
      end: el.selectionEnd,
    };

  }

  private setCaret (el:any, start:any, end:any) {

    el.selectionStart = start;
    el.selectionEnd = end;

    el.focus();

  }

  private dispatchEvent (el:any, eventType:any) {

    const event = document.createEvent('Event');
    event.initEvent(eventType, false, false);
    el.dispatchEvent(event);

  }

  private convertValue (el:any, value:any) {

    el.value = value.toUpperCase();
    //el.value = this.removerAcentuacao(el.value);

    this.dispatchEvent(el, 'input');

  }

  @HostListener('blur', ['$event.target', '$event.target.value'])
  onBlur (el: any, value: string): void {

    if ((!this.upperCase || 'blur' === this.upperCase) && 'function' === typeof value.toUpperCase && value.toUpperCase() !== value) {

      this.convertValue(el, value);
      this.dispatchEvent(el, 'blur'); // in case updateOn is set to blur

    }

  }

  @HostListener('input', ['$event.target', '$event.target.value'])
  onInput (el: any, value: string): void {

    if (!this.upperCase && 'function' === typeof value.toUpperCase && value.toUpperCase() !== value) {

      let { start, end } = this.getCaret(el);

      if (value[0] === ' ' && start === 1 && end === 1) {

        start = 0;
        end = 0;

      }

      this.convertValue(el, value);

      this.setCaret(el, start, end);

    }

  }

  removerAcentuacao(palavra:any){
    palavra = palavra.replace(new RegExp('[ÁÀÂÃ]','gi'), 'A');
    palavra = palavra.replace(new RegExp('[ÉÈÊ]','gi'), 'E');
    palavra = palavra.replace(new RegExp('[ÍÌÎ]','gi'), 'I');
    palavra = palavra.replace(new RegExp('[ÓÒÔÕ]','gi'), 'O');
    palavra = palavra.replace(new RegExp('[ÚÙÛ]','gi'), 'U');
    palavra = palavra.replace(new RegExp('[Ç]','gi'), 'C');
    palavra = palavra.replace(new RegExp('[Ñ]','gi'), 'N');
    return palavra;
  }

}