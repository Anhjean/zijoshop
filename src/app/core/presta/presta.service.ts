import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';
import * as parser from 'fast-xml-parser';
import { catchError, map } from 'rxjs/operators';
import he from 'he';
import { Observable, throwError } from 'rxjs';
import { FilterQuery, PrestaQuery } from './presta.query';

@Injectable({
  providedIn: 'root',
})
export class PrestaService {
  TAG = 'shopService';
  constructor(private http: HttpClient, private alertService: AlertService) {}
  toJson(xmlData: string) {
    xmlData = xmlData.replace(/xlink:href/g, 'attrUrl');
    let jsonObj: any;
    const options = {
      attributeNamePrefix: '',
      // attrNodeName: 'attr', //default is 'false'
      textNodeName: 'data',
      ignoreAttributes: false,
      ignoreNameSpace: false,
      allowBooleanAttributes: true,
      parseNodeValue: true,
      parseAttributeValue: true,
      trimValues: true,
      // cdataTagName: 'false', //default is 'false'
      cdataPositionChar: '\\c',
      parseTrueNumberOnly: false,
      numParseOptions: {
        hex: true,
        leadingZeros: true,
        //skipLike: /\+[0-9]{10}/
      },
      arrayMode: false, //"strict"
      attrValueProcessor: (val: any, attrName: any) =>
        he.decode(val, { isAttributeValue: true }), //default is a=>a
      tagValueProcessor: (val: any, tagName: any) => he.decode(val), //default is a=>a
      stopNodes: ['parse-me-as-string'],
    };

    if (parser.validate(xmlData) === true) {
      //optional (it'll return an object in case it's not valid)
      jsonObj = parser.parse(xmlData, options);
    } else {
      // Intermediate obj
      let tObj = parser.getTraversalObj(xmlData, options);
      jsonObj = parser.convertToJson(tObj, options);
    }

    if (jsonObj.prestashop) {
      return jsonObj.prestashop.products.product;
    } else {
      return jsonObj;
    }
  }


  getProducts(filterQuery: FilterQuery[] = [],offset: any = 0,limit: any = 10,formatJSON: boolean = environment.prestashop.defaultJSON) {
    filterQuery = [...filterQuery, { field: 'active', condition: '1' }];
    if (limit) {
      return (
        this.http
          .get(
            this.requestConstructor(
              {
                resource: 'products',
                filter: filterQuery,
                offset: offset,
                limit: limit,
              },
              formatJSON
            ),
            this.getResponseType(formatJSON)
          )
          .pipe(
            map((data: any) => (formatJSON ? data.products : this.toJson(data))),
            catchError(this.handleError)
          )
      );
    } else {
      return this.http
        .get(this.requestConstructor({ resource: 'products', filter: filterQuery }),this.getResponseType())
        .pipe(
          map((data: any) => (formatJSON ? data : this.toJson(data))),
          catchError(this.handleError)
        );
    }
  }

  getImageLink(resouceId:any, imageId:any){
    console.log('image Link: ', environment.prestashop.shopUrl+`images/products/${resouceId}/${imageId}?` + this.getImageKey())
    return environment.prestashop.shopUrl+`images/products/${resouceId}/${imageId}?` + this.getImageKey();
  }

  getImageKey() {
    return `ws_key=${environment.prestashop.imageApiKey}`;
  }

  fetchForm(resource: string,isSynopsis:boolean=true,formatJSON: boolean = environment.prestashop.defaultJSON): Observable<any> {
    // setting toJSON
    let toJSON = '';
    formatJSON ? (toJSON = 'output_format=JSON') : (toJSON = '?');
    // setting schemaType
    let schemaType='';
    isSynopsis? schemaType='&schema=synopsis':schemaType= '&schema=blank'

    return this.http.get(`${resource}?${toJSON}${schemaType}`, this.getResponseType(formatJSON))
    .pipe(
      map((data: any) => (formatJSON ? data : this.toJson(data))),
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(this.TAG + 'An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `${this.TAG} Backend returned code ${error.status}, ` +
          `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      `${this.TAG} Something bad happened; please try again later.`
    );
  }

  /*
   * [requestConstructor : analyze Query object, construct and return request url]
   * @param  {PrestaQuery}  q [Query object]
   * @return {[string]}   [request url]
   */
  requestConstructor(q: PrestaQuery, formatJSON: boolean = environment.prestashop.defaultJSON): string {
    let requestString = '';
    // check if params are set, if not set default values
    if (!q.resource) {
      q.resource = 'products';
    }

    // Check if display is set if not return results with all properties
    !q.display
      ? (q.display = `&display=full`)
      : (q.display = `&display=[${q.display}]`);

    // Generate filter query from Query.filter object if it is defined
    let filterQuery = '';

    if (q.filter) {
      // for (let property in q.filter) {
      q.filter.forEach((item) => {
        if (item) {
          filterQuery += `&filter[${item.field}]=[${item.condition}]`;
        }
      });
    }
    // console.log('filter Query:', filterQuery);

    !q.sort ? (q.sort = '') : (q.sort = `&sort=[${q.sort}]`);
    !q.limit ? (q.limit = '') : (q.limit = `&limit=${q.offset},${q.limit}`);

    // setting first argument
    let toJSON = '';
    formatJSON ? (toJSON = 'output_format=JSON') : (toJSON = '');

     // setting last argument
    let language = '&language=1';

    if (!q.search) {
      requestString =`${q.resource}?${toJSON}${q.display}${filterQuery}${q.sort}${q.limit}`;
    } else {
      requestString =`search?${toJSON}${q.display}${filterQuery}&query=${q.search}${q.language}`
    }
    console.log('Request is: ', requestString);
    return requestString;
  }



  getResponseType(formatJSON:boolean=false){
    let requestOption:{};
    if (formatJSON){
       requestOption = {responseType: 'json'}
    }else{
       requestOption = {responseType: 'text'}
    }
    return requestOption
  }
}
