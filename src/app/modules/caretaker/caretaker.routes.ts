import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/components/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

export const CaretakerRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];
