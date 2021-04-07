import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CaretakerRoutes} from './caretaker.routes';

import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LAYOUT_SIDEBAR_ITEMS} from '../../shared/components/layout/layout.tokens';
import {CaretakerSidebarItems} from './caretaker.sidebar-items';
import { PatientsOverviewComponent } from './pages/patients-overview/patients-overview.component';
import { PatientCreationDialogComponent } from './component/patient-creation-dialog/patient-creation-dialog.component';
import {PatientService} from './service/patient.service';


@NgModule({
  imports: [
    RouterModule.forChild(CaretakerRoutes),
    SharedModule
  ],
  declarations: [DashboardComponent, PatientsOverviewComponent, PatientCreationDialogComponent],
  providers: [
    PatientService,
    {provide: LAYOUT_SIDEBAR_ITEMS, useValue: CaretakerSidebarItems}
  ]
})
export class CaretakerModule { }
