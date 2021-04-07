import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/components/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PatientsOverviewComponent} from './pages/patients-overview/patients-overview.component';

export const CaretakerRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'patients',
        component: PatientsOverviewComponent
      }
    ]
  }
];
