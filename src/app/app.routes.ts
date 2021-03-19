import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminType, AuthService, CaretakerType} from './core/service/auth.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthService],
    data: {
      type: AdminType
    }
  },
  {
    path: 'caretaker',
    loadChildren: () => import('src/app/modules/caretaker/caretaker.module').then(m => m.CaretakerModule),
    canLoad: [AuthService],
    data: {
      type: CaretakerType
    }
  }
]
