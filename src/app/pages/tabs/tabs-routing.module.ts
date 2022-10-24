import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        /* canActivate: [AuthGuard] */
      },
      {
        path: 'clases/:rut',
        loadChildren: () => import('../clases/clases.module').then( m => m.ClasesPageModule),
      },
      {
        path: 'qr/:rut',
        loadChildren: () => import('../qr/qr.module').then( m => m.QrPageModule),
        
      },
      {
        path: 'asistencia/:rut',
        loadChildren: () => import('../asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      },
      {
        path: 'admin',
    
        loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule),
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
