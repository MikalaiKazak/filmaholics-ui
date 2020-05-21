import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

import {AuthenticationService} from './shared/authentication-service';
import {AuthGuard} from './shared/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {CustomErrorHandler} from './core/custom-error-handler';
import {TrailerComponent} from './page/trailer/trailer.component';

@NgModule({
    declarations: [AppComponent, TrailerComponent],
    entryComponents: [TrailerComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: ErrorHandler, useClass: CustomErrorHandler},
        AuthenticationService,
        AngularFirestoreModule,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
