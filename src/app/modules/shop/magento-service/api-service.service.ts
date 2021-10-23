import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagentoApiServiceService {

  constructor(private http: HttpClient) { }

  getCategory(): Observable<any>{
   return this.http.get('rest/V1/categories');
  }

  mapCategory2Navbar(){
    let category=[]
    this.http.get('rest/V1/categories').subscribe((res:any) => { 
      console.log('....',res) ;
      category = res.children_data
      if (category){
        console.log('Category:', category);
        category.forEach(value => (
          console.log("Category value", value)
        ))
      }
    
    })
    
  }

}


