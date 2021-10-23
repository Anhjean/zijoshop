// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  prestashop: {
    apiKey: 'RQ6HVF1E1GVREA54QS74MC2UE45PSERH',
    imageApiKey: 'YCJEIKIHK68HIARSH2MXS75DG7M78TZX', // for loading image
    shopUrl: 'https://zijoshop.com/api/',
    unitFormat:{
      defaultCurrency:'đ',
      currencyPrecious:0,
    },
    defaultJSON: false,// set default output format
  },
  notiGatewayURL: "https://jl-family.com",
  notiGatewayPrefix: '/notification',
  remotePdbUrl: 'https://jean:Anhnh7383#@jl-family.com/couchdb/',
  cdnUrl:'https://cdn.kiotthe.app',
};
environment.notiGatewayURL = `${environment.notiGatewayURL}${environment.notiGatewayPrefix}`;

