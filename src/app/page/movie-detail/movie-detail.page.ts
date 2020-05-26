import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie, MovieReview} from '../../model/movie';
import {Cast} from '../../model/cast';
import {SliderComponent} from '../../core/slider/slider.component';
import {AlertController, IonSlides, NavController, ToastController} from '@ionic/angular';
import {AuthenticationService} from '../../shared/authentication-service';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.page.html',
    styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

    @ViewChild('similarMovieSlider', {static: false}) similarMovieSlider: IonSlides;
    @ViewChild('crewSlider', {static: false}) crewSlider: IonSlides;

    isExistAtFavorite: boolean;
    isExistAtWatchList: boolean;
    isSimilarMovieLoad: boolean;
    isMovieReviewLoad: boolean;
    isCastLoad: boolean;
    movie: Movie;
    rate: number = 0;
    castList: Cast[] = [];
    similarMovies: Movie[] = [];
    reviews: MovieReview[] = [];

    public movieID = '';
    public trailerURL: any = null;

    constructor(public activatedRoute: ActivatedRoute,
                public route: Router,
                public movieService: MovieService,
                public coreService: CoreService,
                public nav: NavController,
                public slider: SliderComponent,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                public authService: AuthenticationService) {
        this.coreService.menuEnable = true;
    }


    ngOnInit() {
        this.isCastLoad = false;
        this.isSimilarMovieLoad = false;
        this.isExistAtWatchList = false;
        this.isExistAtFavorite = false;
        this.isMovieReviewLoad = false;
        this.movieID = this.activatedRoute.snapshot.paramMap.get('movieId');
        setTimeout(() => {
            this.getMovieDetail();
            this.getMovieCast();
            this.getSimilarMovies();
            this.getMovieTrailer();
            this.getMovieReview();
        }, 500);
    }

    async checkIfMovieAlreadyAtWatchList() {
        await this.movieService.isAtWatchList(this.movie).subscribe(result => {
            this.isExistAtWatchList = result.exists;
        });
    }

    async addToWatchList() {
        if (this.isExistAtWatchList) {
            await this.coreService.showToastMessage('This movie is already added to your watchlist!', 2000, 'bottom');
            return;
        }

        const alert = await this.alertCtrl.create({
            message: 'Do you really want to add this item to watchlist?',
            buttons: [{
                text: 'Yes',
                handler: () => {
                    this.authService.getCurrentUser()
                        .then(() => {
                            this.movieService.addToWatchList(this.movie).then(
                                () => {
                                    this.isExistAtWatchList = true;
                                    this.coreService.showToastMessage('Item added to watchlist!', 2000, 'bottom');
                                });
                        });
                }
            },
                {
                    text: 'No',
                    role: 'cancel'
                }
            ]
        });
        await alert.present();
    }

    async checkIfMovieAlreadyAtFavorite() {
        await this.movieService.isMovieFavorite(this.movie).subscribe(result => {
            this.isExistAtFavorite = result.exists;
        });
    }

    async addToFavorite() {
        if (this.isExistAtFavorite) {
            await this.coreService.showToastMessage('This movie is already added to your favorites!', 2000, 'bottom');
            return;
        }

        const alert = await this.alertCtrl.create({
            message: 'Do you really want to add this item to favorites?',
            buttons: [{
                text: 'Yes',
                handler: () => {
                    this.authService.getCurrentUser()
                        .then(() => {
                            this.movieService.addToFavorites(this.movie).then(
                                () => {
                                    this.isExistAtFavorite = true;
                                    this.coreService.showToastMessage('Item added to favorites!', 2000, 'bottom');
                                });
                        });
                }
            },
                {
                    text: 'No',
                    role: 'cancel'
                }
            ]
        });
        await alert.present();
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
            this.checkIfMovieAlreadyAtFavorite();
            this.checkIfMovieAlreadyAtWatchList();
        });
    }

    showMovieTrailer() {
        this.coreService.showBrowser(this.trailerURL);
    }

    getMovieCast() {
        this.isCastLoad = false;
        this.movieService.getMovieCast(this.movieID).subscribe(d => {
            this.castList = d;
            this.isCastLoad = true;
        });
    }

    getMovieTrailer() {
        this.movieService.getMovieTrailerURL(this.movieID).subscribe(d => {
            this.trailerURL = d;
        });
    }

    getSimilarMovies() {
        this.isSimilarMovieLoad = false;
        this.movieService.getSimilarMovies(this.movieID).subscribe(d => {
            if (d && d.length > 0) {
                this.similarMovies = d;
                this.isSimilarMovieLoad = true;
            }
        });
    }

    goBack() {
        this.nav.back();
    }

    public getMovieReview() {
        this.isMovieReviewLoad = false;
        this.movieService.getMovieReview(this.movieID, 1).subscribe(d => {
            if (d && d.length > 0) {
                this.reviews = d;
                this.isMovieReviewLoad = true;
            }
        });
    }

    rateMovie(i: any) {
        if (i === this.rate) {
            this.rate = 0;
        } else {
            this.rate = i;
        }
    }
}
