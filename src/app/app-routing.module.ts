import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'login',
        loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule), canLoad: [AuthGuard]
    },
    {
        path: 'registration',
        loadChildren: () => import('./page/registration/registration.module').then(m => m.RegistrationPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./page/dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadChildren: () => import('./page/home/home-page.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
    },
    {
        path: 'movie-list/:category',
        loadChildren: () => import('./page/movie-list/movie-list.module').then(m => m.MovieListPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'search',
        loadChildren: () => import('./page/search/search.module').then(m => m.SearchPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'movie-detail/:movieId',
        loadChildren: () => import('./page/movie-detail/movie-detail.module').then(m => m.MovieDetailPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: () => import('./page/account/account.module').then(m => m.AccountPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'favorite',
        loadChildren: () => import('./page/favorite/favorite.module').then(m => m.FavoritePageModule), canActivate: [AuthGuard]
    },
    {
        path: 'watchlist',
        loadChildren: () => import('./page/watchlist/watchlist.module').then(m => m.WatchlistPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'movieplay/:movieId',
        loadChildren: () => import('./page/movieplay/movieplay.module').then(m => m.MovieplayPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'genre',
        loadChildren: () => import('./page/genre/genre.module').then(m => m.GenrePageModule), canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
