import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { AppResolverService } from './app-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    resolve: {
      data: AppResolverService
    },
    data: {
      loggedIn: false
    }
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {
      data: AppResolverService
    },
    data: {
      loggedIn: true
    }
  },
  {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadModule',
    canLoad: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    resolve: {
      data: AppResolverService
    },
    data: {
      loggedIn: true
    }
  },
  {
    path: 'user',
    loadChildren: './user-manage/user-manage.module#UserManageModule',
    canLoad: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    resolve: {
      data: AppResolverService
    },
    data: {
      loggedIn: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
