import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CoreService} from './shared/core.service';
import {AuthenticationService} from './shared/authentication-service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    isPhone = false;
    navigate: any;

    constructor(
        private coreService: CoreService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private auth: AuthenticationService
    ) {
        this.sideMenu();
        this.initializeApp();
    }

    ngOnInit() {
        this.isPhone = this.platform.is('mobile');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    sideMenu() {
        this.navigate =
            [
                {
                    title: 'Movies',
                    url: '/home',
                    icon: 'film',
                    visible: this.auth.isLoggedIn
                },
                {
                    title: 'Profile',
                    url: '/account',
                    icon: 'person-circle-outline',
                    visible: this.auth.isLoggedIn
                }
            ];
    }
}
