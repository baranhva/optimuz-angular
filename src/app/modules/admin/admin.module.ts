import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AdminRoutes} from './admin.routes';

import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LAYOUT_SIDEBAR_ITEMS} from '../../shared/components/layout/layout.tokens';
import {AdminSidebarItems} from './admin.sidebar-items';
import { UsersOverviewComponent } from './pages/users-overview/users-overview.component';
import {UserService} from './service/user.service';
import { CaretakerCreationDialogComponent } from './component/caretaker-creation-dialog/caretaker-creation-dialog.component';


@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes),
    SharedModule
  ],
  declarations: [DashboardComponent, UsersOverviewComponent, CaretakerCreationDialogComponent],
  providers: [
    UserService,
    {provide: LAYOUT_SIDEBAR_ITEMS, useValue: AdminSidebarItems}
  ]
})
export class AdminModule {
}
