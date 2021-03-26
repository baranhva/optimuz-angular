import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'opt-caretaker-creation-dialog',
  templateUrl: './caretaker-creation-dialog.component.html',
  styleUrls: ['./caretaker-creation-dialog.component.scss']
})
export class CaretakerCreationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CaretakerCreationDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
