import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GenrePage} from './genre.page';

const routes: Routes = [
    {
        path: '',
        component: GenrePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GenrePageRoutingModule {
}
