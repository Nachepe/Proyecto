import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebafirebasePageRoutingModule } from './pruebafirebase-routing.module';

import { PruebafirebasePage } from './pruebafirebase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebafirebasePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PruebafirebasePage]
})
export class PruebafirebasePageModule {}
