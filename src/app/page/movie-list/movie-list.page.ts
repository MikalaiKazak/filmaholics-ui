import {Component, OnInit, ViewChild} from '@angular/core';
import {CoreService} from '../../shared/core.service';
import {MovieService} from '../../shared/movie.service';
import {IonInfiniteScroll, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.page.html',
    styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    movieList: Movie[] = [];
    pageCount = 1;
    selectedCategory = 'popular';
    isDataLoaded = false;

    constructor(private coreService: CoreService,
                private nav: NavController,
                private movieService: MovieService, private activatedRoute: ActivatedRoute, private route: Router) {
        coreService.menuEnable = true;
    }

    ngOnInit(): void {
        this.isDataLoaded = false;
        this.movieList = [];
        this.pageCount = 1;
        this.selectedCategory = this.activatedRoute.snapshot.paramMap.get('category');
        setTimeout(() => {
            this.getMovies(this.selectedCategory, 1);
        }, 500);
    }

    loadMoreMovies() {
        this.pageCount = this.pageCount + 1;
        this.getMovies(this.selectedCategory, this.pageCount);
    }

    openSearchPage() {
        this.route.navigateByUrl('/search').then((resolve) => {
            setTimeout(() => {
            }, 150);
        });
    }

    goBack() {
        this.nav.back();
    }

    private getMovies(category: string, pageNumber: number) {
        this.isDataLoaded = false;
        switch (category) {
            case 'upcoming':
                this.selectedCategory = 'upcoming';
                this.movieService.getTopUpcomingMovies(pageNumber).subscribe(movieResponse => {
                    this.movieList = this.movieList.concat(movieResponse);
                    this.infiniteScroll.complete();
                    this.isDataLoaded = true;
                });
                break;
            case 'popular':
                this.selectedCategory = 'popular';
                this.movieService.getPopularMovies(pageNumber).subscribe(movieResponse => {
                    this.movieList = this.movieList.concat(movieResponse);
                    this.infiniteScroll.complete();
                    this.coreService.hideLoadingIcon();
                    this.isDataLoaded = true;
                });
                break;
            case 'nowPlaying':
                this.selectedCategory = 'nowPlaying';
                this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
                    this.movieList = this.movieList.concat(movieResponse);
                    this.infiniteScroll.complete();
                    this.isDataLoaded = true;
                });
                break;
            case 'topRated':
                this.selectedCategory = 'topRated';
                this.movieService.getTopRatedMovies(pageNumber).subscribe(movieResponse => {
                    this.movieList = this.movieList.concat(movieResponse);
                    this.infiniteScroll.complete();
                    this.isDataLoaded = true;
                });
                break;
            case 'category':
                this.selectedCategory = 'category';
                const genre = this.activatedRoute.snapshot.queryParamMap.get('genre');
                this.movieService.getCategoryMovies(genre, pageNumber).subscribe(movieResponse => {
                    this.movieList = this.movieList.concat(movieResponse);
                    this.infiniteScroll.complete();
                    this.isDataLoaded = true;
                });
                break;
            default:
                break;
        }
    }
}
