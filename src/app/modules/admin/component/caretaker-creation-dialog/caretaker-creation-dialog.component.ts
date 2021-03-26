import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../service/user.service';
import {UserForm} from '../../../../shared/components/user-create-form/user-create-form.component';

@Component({
  selector: 'opt-caretaker-creation-dialog',
  templateUrl: './caretaker-creation-dialog.component.html',
  styleUrls: ['./caretaker-creation-dialog.component.scss']
})
export class CaretakerCreationDialogComponent implements OnInit {

  isBusyCreating: boolean = false;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<CaretakerCreationDialogComponent>) { }

  ngOnInit(): void {
  }

  createNewCaretaker(user: UserForm) {
    if (!this.isBusyCreating) {
      this.isBusyCreating = true;

      this.userService.createCaretaker(user?.email, user?.firstName, user?.lastName)
        .subscribe(this.onSuccess, this.onError);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSuccess = () => {
    this.isBusyCreating = false;
    this.closeDialog()
  }

  onError = (error) => {
    console.error(error);
    this.isBusyCreating = false;
  }

}
