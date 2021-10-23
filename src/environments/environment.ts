// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    shop:{
        access_token:'j1rsw1bruknvjuon1x9rfmya46m2xsb1',
        consumer_token:'pdrn55jbp1e7s6ad6kzj7rvrlzvz9g3y',
        apiEndpoint:'https://mage2.kiotthe.app',
        shopdbUrl:'https://jean:Anhnh7383#@jl-family.com/couchdb/shop',
        customerdbUrl: 'https://jean:Anhnh7383#@jl-family.com/couchdb/',
    }
};

environment.shop.apiEndpoint = `${environment.shop.apiEndpoint}/`

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
