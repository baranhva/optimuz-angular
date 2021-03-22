import {InjectionToken} from '@angular/core';
import {SidebarItem} from './sidebar-item';

export const LAYOUT_SIDEBAR_ITEMS = new InjectionToken<SidebarItem[]>('SIDEBAR_ITEMS');
