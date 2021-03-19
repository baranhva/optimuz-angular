import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AdminRoutes} from './admin.routes';

import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes),
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class AdminModule {
}
