import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {SliderComponent} from '../../core/slider/slider.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    @ViewChild('popularMovieSlider', {static: false}) popularMovieSlider: IonSlides;
    @ViewChild('upcomingMovieSlider', {static: false}) upcomingMovieSlider: IonSlides;
    @ViewChild('nowPlayingSlider', {static: false}) nowPlayingSlider: IonSlides;
    @ViewChild('topRatedMovieSlider', {static: false}) topRatedMovieSlider: IonSlides;

    popularMovieList: Movie[] = [];
    upcomingMovieList: Movie[] = [];
    nowPlayingMovieList: Movie[] = [];
    topRatedMovieList: Movie[] = [];

    isPopularMovieListLoaded = false;
    isUpcomingMovieListLoaded = false;
    isNowPlayingMovieListLoaded = false;
    isTopRatedMovieListLoaded = false;

    constructor(private movieService: MovieService, private coreService: CoreService, public slider: SliderComponent) {
    }

    ngOnInit(): void {
        this.getMovies('upcoming', 1);
        this.getMovies('popular', 1);
        this.getMovies('nowPlaying', 1);
        this.getMovies('topRated', 1);
    }

    private getMovies(category: string, pageNumber: number) {
        this.isPopularMovieListLoaded = false;
        this.isUpcomingMovieListLoaded = false;
        this.isNowPlayingMovieListLoaded = false;
        this.isTopRatedMovieListLoaded = false;

        switch (category) {
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
            default:
                break;
        }
    }
}
