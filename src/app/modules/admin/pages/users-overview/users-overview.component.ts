import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import {CaretakerCreationDialogComponent} from '../../component/caretaker-creation-dialog/caretaker-creation-dialog.component';

@Component({
  selector: 'opt-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class UsersOverviewComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'type'];

  constructor(public userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCaretakerCreationDialog() {
    const dialogRef = this.dialog.open(CaretakerCreationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
