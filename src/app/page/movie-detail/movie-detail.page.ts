import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/movie';
import {Cast} from '../../model/cast';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.page.html',
    styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

    movie: Movie;
    castList: Cast[] = [];
    similarMovies: Movie[] = [];

    private movieID = '';
    private trailerURL: any = null;

    constructor(private activatedRoute: ActivatedRoute,
                private route: Router,
                private movieService: MovieService,
                private coreService: CoreService) {
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
            const tmpCastList = d;
            this.castList = tmpCastList.length > 10 ? tmpCastList.slice(0, 10) : tmpCastList;
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
