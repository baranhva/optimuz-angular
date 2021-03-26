import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LayoutComponent} from './components/layout/layout.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { UserTypePipe } from './pipe/user-type.pipe';
import { UserCreateFormComponent } from './components/user-create-form/user-create-form.component';
import {MatDialogModule} from '@angular/material/dialog';

const MaterialModules = [
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule
];

const Components = [
  LayoutComponent
];

@NgModule({
  declarations: [...Components, UserTypePipe, UserCreateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialModules
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialModules,
    ...Components,
    UserTypePipe,
    UserCreateFormComponent
  ]
})
export class SharedModule { }
