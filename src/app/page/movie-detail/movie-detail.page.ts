import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/movie';
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
    isCastLoad: boolean;
    movie: Movie;
    castList: Cast[] = [];
    similarMovies: Movie[] = [];

    private movieID = '';
    private trailerURL: any = null;

    constructor(private activatedRoute: ActivatedRoute,
                private route: Router,
                private movieService: MovieService,
                private coreService: CoreService,
                private nav: NavController,
                private slider: SliderComponent,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController,
                private authService: AuthenticationService) {
        this.coreService.menuEnable = true;
    }


    ngOnInit() {
        this.isCastLoad = false;
        this.isSimilarMovieLoad = false;
        this.isExistAtWatchList = false;
        this.isExistAtFavorite = false;
        this.movieID = this.activatedRoute.snapshot.paramMap.get('movieId');
        setTimeout(() => {
            this.getMovieDetail();
            this.getMovieCast();
            this.getSimilarMovies();
            this.getMovieTrailer();
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
}
