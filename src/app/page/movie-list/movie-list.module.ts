import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MovieListPageRoutingModule} from './movie-list-routing.module';

import {MovieListPage} from './movie-list.page';
import {ComponentsModule} from '../../core/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MovieListPageRoutingModule,
        ComponentsModule
    ],
    declarations: [MovieListPage]
})
export class MovieListPageModule {
}
