import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MantenedorPageRoutingModule } from './mantenedor-routing.module';

import { MantenedorPage } from './mantenedor.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MantenedorPageRoutingModule
  ],
  declarations: [MantenedorPage]
})
export class MantenedorPageModule {}
