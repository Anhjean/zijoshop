import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop.routing';
import { SharedModule } from 'app/shared/shared.module';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MagentoApiServiceService } from './magento-service/api-service.service';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseCardModule } from '@fuse/components/card';
import { ShopComponent } from './shop.component';
import { TeamBlockComponent } from './components/team-block/team-block.component';
import { TeamMemberComponent } from './components/team-block/team-member/team-member.component';



@NgModule({
  declarations: [
    HeroSectionComponent,
    ProductComponent,
    ProductListComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    TeamBlockComponent,
    TeamMemberComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
    FuseCardModule,
    ShopRoutingModule,
  ],
  providers:[
    MagentoApiServiceService
  ]
})
export class ShopModule { }
