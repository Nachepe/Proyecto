import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebafirebasePage } from './pruebafirebase.page';

const routes: Routes = [
  {
    path: '',
    component: PruebafirebasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebafirebasePageRoutingModule {}
