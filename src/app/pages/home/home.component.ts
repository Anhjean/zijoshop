import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { BehaviorSubject, Observable } from 'rxjs';
import { PouchdbService } from '../../core/pouchdb/pouchdb.service';
import { PrestaService } from 'src/app/core/presta/presta.service';
// import Swiper core and required modules

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  productList: any;
  imageList: any;


  constructor(
    private shop: PrestaService,
    private pdb: PouchdbService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.shop.fetchForm('carts',true,true).subscribe( res => console.log('Cart form: ', res));
    this.shop.fetchForm('orders',true,true).subscribe( res => console.log('Order form: ', res));
  }


}
