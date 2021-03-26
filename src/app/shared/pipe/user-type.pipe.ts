import { Pipe, PipeTransform } from '@angular/core';
import {AdminType, CaretakerType, PatientType, UserType} from '../../core/service/auth.service';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(type: UserType): "Admin" | "Caretaker" | "Patient" {
    switch (type) {
      case AdminType:
        return 'Admin';
      case CaretakerType:
        return 'Caretaker';
      case PatientType:
        return 'Patient';
      default:
        return null;
    }
  }

}
