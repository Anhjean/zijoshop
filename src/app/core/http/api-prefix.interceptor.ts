/** Angular Imports */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Environment Configuration */
import { environment } from '../../../environments/environment';

// encode base64 by btoa() function
let keyEncode=btoa(`${environment.prestashop.apiKey}:`)
console.log('Key:',keyEncode);
/** Http request options headers. */
let httpOptions: { [key: string]: { [key: string]: string } } = {
  headers: {
    'Authorization': `Basic ${keyEncode}`,
    'Accept':'*/*',
  }
};

/**
 * Http request interceptor to prefix a request with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  /**
   * Intercepts a Http request and prefixes it with `environment.serverUrl`.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Ignore URLs that are complete for i18n
     */
    if (
      !request.url.includes('http:') &&
      !request.url.includes('https:') &&
      !request.url.includes('assets')
    ) {

        // request = request.clone({
        //   url: environment.prestashop.shopUrl + request.url+`&ws_key=${environment.prestashop.apiKey}`,
        //   setHeaders: httpOptions.headers
        // });
        request = request.clone({
          url: environment.prestashop.shopUrl + request.url,
          setHeaders: httpOptions.headers
        });



      console.log(request);
    }

    return next.handle(request);
  }
}
