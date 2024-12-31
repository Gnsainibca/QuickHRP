import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SharedModule,
  ]
})
export class SetupModule { }
