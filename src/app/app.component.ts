import { Component } from '@angular/core';
import { PouchdbService } from './core/pouchdb/pouchdb.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor( private pdb: PouchdbService)
    {
        this.pdb.init('anomynous');
    }
}
