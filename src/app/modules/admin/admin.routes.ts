import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared/components/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UsersOverviewComponent} from './pages/users-overview/users-overview.component';

export const AdminRoutes: Routes = [
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
        path: 'users',
        component: UsersOverviewComponent
      }
    ]
  }
];
