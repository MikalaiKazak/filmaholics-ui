import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {CoreService} from '../../shared/core.service';
import {MovieService} from '../../shared/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/movie';
import {AuthenticationService} from '../../shared/authentication-service';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.page.html',
    styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    watchList: Movie[];

    constructor(private coreService: CoreService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private route: Router, private authService: AuthenticationService) {
        coreService.menuEnable = true;
    }

    ngOnInit(): void {
        this.movieService.getWatchList().subscribe((data: Movie[]) => {
            if (data) {
                this.watchList = data;
            } else {
                this.watchList = [];
            }
        });
    }

    async deleteFormWatchList(movie: Movie) {
        await this.movieService.removeFromWatchList(movie).then(() => {
            this.coreService.showToastMessage('Movie delete form Watchlist', 2000, 'bottom');
        });
    }
}
