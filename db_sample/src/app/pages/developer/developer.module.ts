import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeveloperPageRoutingModule } from './developer-routing.module';

import { DeveloperPage } from './developer.page';

//New import
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeveloperPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DeveloperPage]
})
export class DeveloperPageModule {}
