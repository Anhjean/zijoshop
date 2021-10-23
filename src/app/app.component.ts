import { Component, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { AddToHomeScreenService } from './core/add-to-home-screen.service';
import { AlertService } from './core/alert/alert.service';
import { SnackBarService } from './core/alert/snack-bar.service';
import { PouchdbService } from './core/pouchdb/pouchdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'zijoshop';
  @HostListener('window:beforeinstallprompt', ['$event'])
  onEventFire(e: any) {
    this.a2hs.deferredPrompt = e;
  }
  constructor(
    private alertService: AlertService,
    private notiService: SnackBarService,
    private update: SwUpdate,
    private a2hs: AddToHomeScreenService,
    // private idb: IndexedDBService
    private pdb: PouchdbService
  ) {}

  ngOnInit() {
    /** Init alert Service */
    this.alertService.alertEvent.subscribe((alertEvent: any) => {
      this.notiService.open(alertEvent.message);
    });
    /** Service Worker Service */

    if (this.update.isEnabled) {
      this.update.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}
