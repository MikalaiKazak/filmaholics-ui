import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ComponentsModule} from '../../core/components.module';
import {SearchPage} from './search.page';
import {IonicContextMenuModule} from 'ionic-context-menu';


const routes: Routes = [
    {
        path: '',
        component: SearchPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        IonicContextMenuModule,
    ],
    declarations: [SearchPage]
})
export class SearchPageModule {
}
