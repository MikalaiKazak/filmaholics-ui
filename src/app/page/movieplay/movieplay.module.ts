import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MovieplayPageRoutingModule} from './movieplay-routing.module';

import {MovieplayPage} from './movieplay.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MovieplayPageRoutingModule
    ],
    declarations: [MovieplayPage]
})
export class MovieplayPageModule {
}
