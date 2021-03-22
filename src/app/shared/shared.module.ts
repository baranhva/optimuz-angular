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

const MaterialModules = [
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule
];

const Components = [
  LayoutComponent
];

@NgModule({
  declarations: [...Components],
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
    ...Components
  ]
})
export class SharedModule { }
