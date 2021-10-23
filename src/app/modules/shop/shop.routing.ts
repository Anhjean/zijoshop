import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TeamBlockComponent } from './components/team-block/team-block.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {path:'', component:ShopComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'about-us',component:TeamBlockComponent}
    
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
