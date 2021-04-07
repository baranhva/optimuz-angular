import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthService} from './core/service/auth.service';
import {LoginGuard} from './core/guard/login.guard';
import {AdminType, CaretakerType} from './shared/interface/user.interface';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthService],
    canActivate: [AuthService],
    data: {
      type: AdminType
    }
  },
  {
    path: 'caretaker',
    loadChildren: () => import('src/app/modules/caretaker/caretaker.module').then(m => m.CaretakerModule),
    canLoad: [AuthService],
    canActivate: [AuthService],
    data: {
      type: CaretakerType
    }
  }
]
