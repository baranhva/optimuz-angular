import {Component, Inject, OnInit} from '@angular/core';
import {SidebarItem} from './sidebar-item';
import {LAYOUT_SIDEBAR_ITEMS} from './layout.tokens';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'opt-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(@Inject(LAYOUT_SIDEBAR_ITEMS) public sidebarItems: SidebarItem[] = [], public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
