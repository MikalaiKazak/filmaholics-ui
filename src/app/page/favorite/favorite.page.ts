import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {CoreService} from '../../shared/core.service';
import {MovieService} from '../../shared/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication-service';
import {Movie} from '../../model/movie';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.page.html',
    styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    favorites: Movie[];

    constructor(private coreService: CoreService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private route: Router, private authService: AuthenticationService) {
        coreService.menuEnable = true;
    }

    ngOnInit(): void {
        this.movieService.getFavorites().subscribe((data: Movie[]) => {
            if (data) {
                this.favorites = data;
            } else {
                this.favorites = [];
            }
        });
    }

    async deleteFromFavorite(movie: Movie) {
        await this.movieService.removeFromFavorite(movie).then(() => {
           this.coreService.showToastMessage('Movie delete form favorites', 2000, 'bottom');
        });
    }
}
