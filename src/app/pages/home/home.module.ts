import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../core/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';


import { FooterComponent } from '../footer/footer.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  providers: [
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ]
})
export class HomeModule { }
