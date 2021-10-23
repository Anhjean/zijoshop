import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MagentoApiServiceService } from 'app/modules/shop/magento-service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private magentoApi: MagentoApiServiceService) { }

  ngOnInit(): void {
    this.magentoApi.getCategory().subscribe( (res:any) => console.log('category: ', res))
    this.magentoApi.mapCategory2Navbar();
  }

}
