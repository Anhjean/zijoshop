import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() image_url:string="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg";
  @Input() image_alt:string="Tall slender porcelain bottle with natural clay textured body and cork stopper."
  @Input() title:string="Title"
  @Input() price:string="25.000 đ"
  constructor() { }

  ngOnInit(): void {

  }

}
