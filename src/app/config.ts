import {FormControl} from '@angular/forms';

export const EmailRegex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export function EmailValidator(control: FormControl): {[s: string]: boolean} {
  if (!control.value.match(EmailRegex)) {
    return {invalidSku: true};
  }
}
