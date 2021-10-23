import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MaterialModule } from '../core/material.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../core/pipes/pipes.module';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { SwiperModule } from 'swiper/angular';

const ComponentArray=[
    ProductComponent,
    ProductListComponent,
    HeroSectionComponent
]

@NgModule({
  declarations:ComponentArray,
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    SwiperModule
  ],
  exports: ComponentArray
})
export class ComponentsModule { }
