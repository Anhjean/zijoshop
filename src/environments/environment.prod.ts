export const environment = {
    production: true,
    shop:{
        access_token:'j1rsw1bruknvjuon1x9rfmya46m2xsb1',
        consumer_token:'pdrn55jbp1e7s6ad6kzj7rvrlzvz9g3y',
        apiEndpoint:'https://mage2.kiotthe.app',
        shopdbUrl:'https://jl-family.com/couchdb/shop',
        customerdbUrl: 'https://jean:Anhnh7383#@jl-family.com/couchdb/',
        
    }
};

environment.shop.apiEndpoint = `${environment.shop.apiEndpoint}/`
