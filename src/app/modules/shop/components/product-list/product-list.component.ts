import { Component, OnInit } from "@angular/core";

@Component({
  selector: "shop-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productList = [
    {
      image_url : "assets/images/products/sneakers-01-320x200.jpg",
      image_alt : "",
      title : "Sneaker-1",
      price : "$240.00",
    },
    {
      image_url : "assets/images/products/sneakers-01-320x200.jpg",
      image_alt : "",
      title : "Sneaker-2",
      price : "$240.00",
    },
    {
      image_url : "assets/images/products/sneakers-01-320x200.jpg",
      image_alt : "",
      title : "Sneaker-3",
      price : "$240.00",
    },
    {
      image_url : "assets/images/products/sneakers-01-320x200.jpg",
      image_alt : "",
      title : "Sneaker-4",
      price : "$240.00",
    },
    {
      image_url : "assets/images/products/sneakers-01-320x200.jpg",
      image_alt : "",
      title : "Sneaker-5",
      price : "$240.00",
    },
    {
      image_url : "assets/images/products/sneakers-01-320x200.jpg",
      image_alt : "",
      title : "Sneaker-6",
      price : "$240.00",
    },
  ];
  imgUrl: string = "assets/images/products/sneakers-01-320x200.jpg";
  constructor() {}

  ngOnInit(): void {}
}
