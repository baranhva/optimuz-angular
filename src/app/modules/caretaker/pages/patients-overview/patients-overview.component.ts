import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PatientCreationDialogComponent} from '../../component/patient-creation-dialog/patient-creation-dialog.component';

@Component({
  selector: 'opt-patients-overview',
  templateUrl: './patients-overview.component.html',
  styleUrls: ['./patients-overview.component.scss']
})
export class PatientsOverviewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPatientCreationDialog() {
    const dialogRef = this.dialog.open(PatientCreationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
