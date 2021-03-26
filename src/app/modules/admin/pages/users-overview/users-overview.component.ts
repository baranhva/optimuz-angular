import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'opt-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'type'];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
