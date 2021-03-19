import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CaretakerRoutes} from './caretaker.routes';

import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


@NgModule({
  imports: [
    RouterModule.forChild(CaretakerRoutes),
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class CaretakerModule { }
