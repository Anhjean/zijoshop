import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SharedModule {}
