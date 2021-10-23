import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { PouchdbService } from 'app/core/pouchdb/pouchdb.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private _navigationService: NavigationService,
              private pdb:PouchdbService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.pdb.getShopItem("navbar1");
    // console.log('pdb: ', this.pdb.getItem("navbar1"))
    this.pdb.getShopItem("navbar1").then( res => {
      console.log('Response: ', res);
      this._navigationService.setNav(res.navbar);
    })
    
    
    
  }

  // ngAfterContentInit(){
  //   this._navigationService.setNav();
  //   this.cdr.detectChanges();
  // }

}
