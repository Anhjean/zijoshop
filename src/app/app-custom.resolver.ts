import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { NavigationService } from './core/navigation/navigation.service';
import { UserService } from './core/user/user.service';
import { ShortcutsService } from './layout/common/shortcuts/shortcuts.service';
// import { MessagesService } from './layout/common/messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AppCustomResolver implements Resolve<boolean> {
  constructor(
    // private _messagesService: MessagesService,
    private _navigationService: NavigationService,
    // private _notificationsService: NotificationsService,
    // private _quickChatService: QuickChatService,
    // private _shortcutsService: ShortcutsService,
    // private _userService: UserService
){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

   // Fork join multiple API endpoint calls to wait all of them to finish
   return forkJoin([
    this._navigationService.get(),
    // this._messagesService.getAll(),
    // this._notificationsService.getAll(),
    // this._quickChatService.getChats(),
    // this._shortcutsService.getAll(),
    // this._userService.get()
]);
    
  }
}
