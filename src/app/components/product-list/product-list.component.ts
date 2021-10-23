import { Component, OnInit } from '@angular/core';
import { PrestaService } from 'src/app/core/presta/presta.service';


@Component({
  selector: 'shop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList:any;
  constructor(private shop: PrestaService) {}

  ngOnInit(): void {
    this.shop.getProducts().subscribe((res) => {
      this.productList = res;
      console.log('hone product list:', this.productList);
    });
  }

  getImageByUrl(url:any){
    return `${url}?${this.shop.getImageKey()}`;
  }

  getImageById(resourceId:any,imageId:any){
    if(imageId.attrUrl) {
      return this.getImageByUrl(imageId.attrUrl)
    }else{
    return this.shop.getImageLink(resourceId,imageId);
    }
  }

  getProductName(productName:any){
    if(productName.language){
      return productName.language[0].data;
    } else{
      return productName[0].value;
    }
  }
}
