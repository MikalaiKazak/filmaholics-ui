import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GenrePageRoutingModule} from './genre-routing.module';

import {GenrePage} from './genre.page';
import {ComponentsModule} from '../../core/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GenrePageRoutingModule,
        ComponentsModule
    ],
    declarations: [GenrePage]
})
export class GenrePageModule {
}
