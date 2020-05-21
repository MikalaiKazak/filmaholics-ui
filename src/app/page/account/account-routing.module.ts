import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountPage} from './account.page';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/account/favorite',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AccountPage,
        children: [
            {
                path: 'watchlist',
                loadChildren: () => import('../watchlist/watchlist.module').then(m => m.WatchlistPageModule)
            },
            {
                path: 'favorite',
                loadChildren: () => import('../favorite/favorite.module').then(m => m.FavoritePageModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountPageRoutingModule {
}
