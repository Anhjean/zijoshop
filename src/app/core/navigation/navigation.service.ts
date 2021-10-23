import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    // private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    

    // demo menu
    navList: FuseNavigationItem[] = [
        {
            title:"Bánh",
            type:"collapsable",
            children:[{
                title:'children 1',
                type:'basic'
            }]
        },
        {
            title:"Trái cây",
            type:"basic",
        },

    ]
    demoNav: Navigation={
        default: this.navList,
        horizontal: this.navList,
        compact: this.navList,
        futuristic:this.navList
    }

    private _navigation: BehaviorSubject<Navigation> = new BehaviorSubject<Navigation>(this.demoNav);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
        // this.demoNav.default = this.navList;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
        // this._navigation.next(this.demoNav)
        // return this._navigation.next(this.demoNav)

    }

    setNav(navMenu?:FuseNavigationItem[]):void{
      
        
        if (navMenu){
            let newMenu: Navigation={
                default: navMenu,
                horizontal: navMenu,
                compact: navMenu,
                futuristic:navMenu
            }
            console.log ('newMenus', newMenu)
            this._navigation.next(newMenu)
        }else{
        this._navigation.next(this.demoNav);
        }
    }
}
