import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // canLoad: [IntroGuard, AutoLoginGuard] // Check if we should show the introduction or forward to inside
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    // canLoad: [AuthGuard] // Secure all child pages

  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'parkings/:id',
    loadChildren: () => import('./pages/parking-detail/parking-detail.module').then( m => m.ParkingDetailPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'parkings/:id/reservation-first-step',
    loadChildren: () => import('./pages/reservation-first-step/reservation-first-step.module').then( m => m.ReservationFirstStepPageModule)
  },
  {
    path: 'parkings/:id/reservation-second-step',
    loadChildren: () => import('./pages/reservation-second-step/reservation-second-step.module').then( m => m.ReservationSecondStepPageModule)
  },
  {
    path: 'register-co',
    loadChildren: () => import('./pages/register-co/register-co.module').then( m => m.RegisterCoPageModule)
  },
  {
    path: 'register-po',
    loadChildren: () => import('./pages/register-po/register-po.module').then( m => m.RegisterPoPageModule)
  },
  {
    path: 'edit-account-co',
    loadChildren: () => import('./pages/edit-account-co/edit-account-co.module').then( m => m.EditAccountCoPageModule)
  },
  {
    path: 'edit-account-po',
    loadChildren: () => import('./pages/edit-account-po/edit-account-po.module').then( m => m.EditAccountPoPageModule)
  },
  {
    path: 'edit-planning-po',
    loadChildren: () => import('./pages/edit-planning-po/edit-planning-po.module').then( m => m.EditPlanningPoPageModule)
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
