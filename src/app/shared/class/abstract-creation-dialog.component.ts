import {MatDialogRef} from '@angular/material/dialog';


export class AbstractCreationDialogComponent {

  private _isBusyCreating: boolean = false;

  constructor(public dialogRef: MatDialogRef<any>) {
  }

  isBusyCreating(): boolean {
    return this._isBusyCreating;
  }

  startCreatingProcess(): void {
    this._isBusyCreating = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSuccess = () => {
    this._isBusyCreating = false;
    this.closeDialog();
  }

  onError = (error) => {
    console.error(error);
    this._isBusyCreating = false;
  }

}
