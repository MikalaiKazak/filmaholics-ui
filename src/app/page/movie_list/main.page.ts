import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, IonSlides} from '@ionic/angular';
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

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    @ViewChild('popularMovieSlider', {static: false}) popularMovieSlider: IonSlides;

    movieList: Movie[] = [];
    pageCount: number = 1;
    selectedCategory: string = 'popular';
    isDataLoaded: boolean = false;

    constructor(private movieService: MovieService, private coreService: CoreService, public slider: SliderComponent) {
    }

    ngOnInit(): void {
        this.getMovies('popular', 1);
    }

    loadMoreMovies() {
        this.pageCount = this.pageCount + 1;
        this.getMovies(this.selectedCategory, this.pageCount);
    }

    changeCategory(category: string) {
        this.movieList = [];
        this.pageCount = 1;
        this.getMovies(category, 1);
    }

    async getMovies(category: string, pageNumber: number) {
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
            default:
                break;
        }
    }
}
