import { LayoutadminModule } from './Core/layoutAdmin/layoutadmin.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserGuard} from './Auth/Guard/user.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./Core/layoutAdmin/layoutadmin.module').then(m => m.LayoutadminModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user/panel',
    loadChildren: () => import('./Core/layoutUser/layoutuser.module').then(m => m.LayoutuserModule),
    canActivate:[UserGuard]
  },

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
