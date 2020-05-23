import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {SliderComponent} from '../../core/slider/slider.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('latestMovieSlider', {static: false}) latestMovieSlider: IonSlides;
    @ViewChild('popularMovieSlider', {static: false}) popularMovieSlider: IonSlides;
    @ViewChild('upcomingMovieSlider', {static: false}) upcomingMovieSlider: IonSlides;
    @ViewChild('nowPlayingSlider', {static: false}) nowPlayingSlider: IonSlides;
    @ViewChild('topRatedMovieSlider', {static: false}) topRatedMovieSlider: IonSlides;
    @ViewChild('topPickForYouSlider', {static: false}) topPickForYouSlider: IonSlides;

    latestMovieList: Movie[] = [];
    popularMovieList: Movie[] = [];
    upcomingMovieList: Movie[] = [];
    nowPlayingMovieList: Movie[] = [];
    topRatedMovieList: Movie[] = [];
    topPickForYouMovieList: Movie[] = [];

    isLatestMovieListLoaded = false;
    isPopularMovieListLoaded = false;
    isTopPickForYouListLoad = false;
    isUpcomingMovieListLoaded = false;
    isNowPlayingMovieListLoaded = false;
    isTopRatedMovieListLoaded = false;

    constructor(private movieService: MovieService, private coreService: CoreService, public slider: SliderComponent, private route: Router) {
        coreService.menuEnable = true;
    }

    ngOnInit(): void {
        this.getMovies('topPickForYou', 1);
        this.getMovies('upcoming', 1);
        this.getMovies('popular', 1);
        this.getMovies('nowPlaying', 1);
        this.getMovies('topRated', 1);
        this.getMovies('latest', 1);
    }

    openSearchPage() {
        this.route.navigateByUrl('/search').then((resolve) => {
            setTimeout(() => {
            }, 150);
        });
    }

    private getMovies(category: string, pageNumber: number) {
        this.isTopPickForYouListLoad = false;
        this.isPopularMovieListLoaded = false;
        this.isUpcomingMovieListLoaded = false;
        this.isNowPlayingMovieListLoaded = false;
        this.isTopRatedMovieListLoaded = false;
        this.isLatestMovieListLoaded = false;
        switch (category) {
            case 'topPickForYou':
                this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
                    this.topPickForYouMovieList = this.topPickForYouMovieList.concat(movieResponse);
                    this.isTopPickForYouListLoad = true;
                });
                break;
            case 'upcoming':
                this.movieService.getTopUpcomingMovies(pageNumber).subscribe(movieResponse => {
                    this.upcomingMovieList = this.upcomingMovieList.concat(movieResponse);
                    this.isUpcomingMovieListLoaded = true;
                });
                break;
            case 'popular':
                this.movieService.getPopularMovies(pageNumber).subscribe(movieResponse => {
                    this.popularMovieList = this.popularMovieList.concat(movieResponse);
                    this.coreService.hideLoadingIcon();
                    this.isPopularMovieListLoaded = true;
                });
                break;
            case 'nowPlaying':
                this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
                    this.nowPlayingMovieList = this.nowPlayingMovieList.concat(movieResponse);
                    this.isNowPlayingMovieListLoaded = true;
                });
                break;
            case 'topRated':
                this.movieService.getTopRatedMovies(pageNumber).subscribe(movieResponse => {
                    this.topRatedMovieList = this.topRatedMovieList.concat(movieResponse);
                    this.isTopRatedMovieListLoaded = true;
                });
                break;
            case 'latest':
                this.movieService.getLatestMovies(pageNumber).subscribe(movieResponse => {
                    this.latestMovieList = this.latestMovieList.concat(movieResponse);
                    this.isLatestMovieListLoaded = true;
                });
                break;
            default:
                break;
        }
    }
}
