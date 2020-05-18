import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/movie';
import {Cast} from '../../model/cast';
import {SliderComponent} from '../../core/slider/slider.component';
import {IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.page.html',
    styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

    @ViewChild('similarMovieSlider', {static: false}) similarMovieSlider: IonSlides;
    @ViewChild('crewSlider', {static: false}) crewSlider: IonSlides;

    movie: Movie;
    castList: Cast[] = [];
    similarMovies: Movie[] = [];

    private movieID = '';
    private trailerURL: any = null;

    constructor(private activatedRoute: ActivatedRoute,
                private route: Router,
                private movieService: MovieService,
                private coreService: CoreService,
                private slider: SliderComponent) {
        this.coreService.menuEnable = true;
    }


    ngOnInit() {
        this.movieID = this.activatedRoute.snapshot.paramMap.get('movieId');
        setTimeout(() => {
            this.getMovieDetail();
            this.getMovieCast();
            this.getSimilarMovies();
            this.getMovieTrailer();
        }, 500);
    }

    openSearchPage() {
        this.route.navigateByUrl('/search').then((resolve) => {
            setTimeout(() => {
            }, 150);
        });
    }

    getMovieDetail() {
        this.movieService.getMovieDetail(this.movieID).subscribe(d => {
            this.movie = d;
            console.log(this.movie);
        });
    }

    showMovieTrailer() {
        this.coreService.showBrowser(this.trailerURL);
    }

    getMovieCast() {
        this.movieService.getMovieCast(this.movieID).subscribe(d => {
            this.castList = d;
        });
    }

    getMovieTrailer() {
        this.movieService.getMovieTrailerURL(this.movieID).subscribe(d => {
            this.trailerURL = d;
        });
    }


    getSimilarMovies() {
        this.movieService.getSimilarMovies(this.movieID).subscribe(d => {
            this.similarMovies = d;
        });
    }
}
