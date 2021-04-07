import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PatientCreationDialogComponent} from '../../component/patient-creation-dialog/patient-creation-dialog.component';
import {PatientService} from '../../service/patient.service';

@Component({
  selector: 'opt-patients-overview',
  templateUrl: './patients-overview.component.html',
  styleUrls: ['./patients-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class PatientsOverviewComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName'];

  constructor(public patientService: PatientService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPatientCreationDialog() {
    const dialogRef = this.dialog.open(PatientCreationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
