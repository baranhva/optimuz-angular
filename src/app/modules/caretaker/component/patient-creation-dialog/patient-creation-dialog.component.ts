import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientService} from '../../service/patient.service';
import {MatDialogRef} from '@angular/material/dialog';
import {UserForm} from '../../../../shared/components/user-create-form/user-create-form.component';
import {AbstractCreationDialogComponent} from '../../../../shared/class/abstract-creation-dialog.component';

@Component({
  selector: 'opt-patient-creation-dialog',
  templateUrl: './patient-creation-dialog.component.html',
  styleUrls: ['./patient-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class PatientCreationDialogComponent extends AbstractCreationDialogComponent implements OnInit {

  constructor(private patientService: PatientService, public dialogRef: MatDialogRef<PatientCreationDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
  }

  createNewPatient(user: UserForm) {
    if (!this.isBusyCreating()) {
      this.startCreatingProcess();

      this.patientService.createPatient(user?.email, user?.firstName, user?.lastName)
        .subscribe(this.onSuccess, this.onError);
    }
  }

}
