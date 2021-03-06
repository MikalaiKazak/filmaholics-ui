import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MovieplayPage} from './movieplay.page';

const routes: Routes = [
    {
        path: '',
        component: MovieplayPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MovieplayPageRoutingModule {
}
