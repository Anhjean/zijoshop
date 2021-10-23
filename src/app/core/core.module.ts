import { HttpClient } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { AddToHomeScreenService } from './add-to-home-screen.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { HttpCacheService } from './http/http-cache.service';
import { HttpService } from './http/http.service';
import { PouchdbService } from './pouchdb/pouchdb.service';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ],
    providers:[
        HttpCacheService,
        ApiPrefixInterceptor,
        ErrorHandlerInterceptor,
        CacheInterceptor,
        {
          provide: HttpClient,
          useClass: HttpService
        },
        AddToHomeScreenService,
        PouchdbService
    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
