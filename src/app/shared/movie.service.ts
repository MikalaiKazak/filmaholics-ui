import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie, MovieResponse, MovieReview, MovieReviewResponse} from '../model/movie';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cast, CastResponse} from '../model/cast';
import {TrailerResponse} from '../model/trailer';
import {AuthenticationService} from './authentication-service';
import {AngularFireDatabase} from '@angular/fire/database';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {GenreResponse} from '../model/genre';


@Injectable({
    providedIn: 'root'
})
export class MovieService {

    public readonly databaseUrl = 'https://filmaholics.firebaseio.com/';

    constructor(public http: HttpClient, public authService: AuthenticationService, public db: AngularFireDatabase, public afStore: AngularFirestore) {
    }

    getLatestMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            page: pageNumber.toString()
        };
        return this.http.get(`${environment.tmdbUrl}` + '/movie/latest', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getGenre() {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`
        };
        return this.http.get(`${environment.tmdbUrl}` + '/genre/movie/list', {params: queryParams}).pipe(
            map((response: GenreResponse) => {
                return response.genres;
            })
        );
    }

    getPopularMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            page: pageNumber.toString()
        };
        return this.http.get(`${environment.tmdbUrl}` + '/movie/popular', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getTopRatedMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            page: pageNumber.toString()
        };

        return this.http.get(`${environment.tmdbUrl}` + '/movie/top_rated', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getTopUpcomingMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            page: pageNumber.toString()
        };

        return this.http.get(`${environment.tmdbUrl}` + '/movie/upcoming', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getTopNowPlayingMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            page: pageNumber.toString()
        };

        return this.http.get(`${environment.tmdbUrl}` + '/movie/now_playing', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    searchMovie(searchText: string, region: string, year: string, adult: boolean, pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            query: searchText,
            include_adult: (adult ? 'true' : 'false'),
            page: pageNumber.toString()
        };

        if (region && !(region === ' ')) {
            Object.assign(queryParams, {region});
        }

        if (year && !(year === ' ')) {
            Object.assign(queryParams, {year});
        }

        console.log(queryParams);

        return this.http.get(`${environment.tmdbUrl}` + '/search/movie', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                console.log(response);
                return response.results;
            }),
            catchError(err => {
                return throwError('err');
            })
        );
    }

    getMovieDetail(movieID: string): Observable<Movie> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
        };
        return this.http.get(`${environment.tmdbUrl}` + '/movie/' + movieID, {params: queryParams}).pipe(
            map((response: Movie) => {
                return response;
            })
        );
    }

    getMovieCast(movieID: string): Observable<Cast[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
        };
        const url = `${environment.tmdbUrl}` + '/movie/' + movieID + '/credits';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: CastResponse) => {
                return response.cast;
            })
        );
    }

    getSimilarMovies(movieID: string): Observable<Movie[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
        };
        const url = `${environment.tmdbUrl}` + '/movie/' + movieID + '/similar';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getCategoryMovies(genderID: string, page: number): Observable<Movie[]> {
        const queryParams: any = {
            api_key: `${environment.tmdbApiKey}`,
            with_genres: genderID,
            page,
        };
        const url = `${environment.tmdbUrl}` + '/discover/movie';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getMovieTrailerURL(movieID: string): Observable<string> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
        };
        const url = `${environment.tmdbUrl}` + '/movie/' + movieID + '/videos';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: TrailerResponse) => {
                const trailerList = response.results.filter(x => {
                    return x.site === 'YouTube';
                });
                return trailerList.length !== 0 ? 'https://www.youtube.com/watch?v=' + trailerList[0].key : null;
            })
        );
    }

    getMovieReview(movieID: string, pageNumber: number): Observable<MovieReview[]> {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`,
            page: pageNumber.toString()
        };
        const url = `${environment.tmdbUrl}` + '/movie/' + movieID + '/reviews';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: MovieReviewResponse) => {
                return response.results;
            })
        );
    }

    getUserMovieReview(movieID: string) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}/review/${movieID}`).get();
    }

    addMovieReview(movieID: string, content: string) {
        const user = this.authService.getActiveUser();

        const review: MovieReview = {
            id: 0,
            author: user.displayName,
            content,
            url: 'no_url'
        };

        return this.afStore.doc(`data/${user.uid}`).collection('review').doc(`${movieID}`).set(review);
    }

    addToFavorites(movie: Movie) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}`).collection('favorite').doc(`${movie.id}`).set(movie);
    }

    getFavorites() {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}`).collection('favorite').valueChanges();
    }

    isMovieFavorite(movie: Movie) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}/favorite/${movie.id}`).get();
    }

    removeFromFavorite(data: Movie) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}/favorite/${data.id}`).delete();
    }

    addToWatchList(movie: Movie) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}`).collection('watchlist').doc(`${movie.id}`).set(movie);
    }

    getWatchList() {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}`).collection('watchlist').valueChanges();
    }

    isAtWatchList(movie: Movie) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}/watchlist/${movie.id}`).get();
    }

    removeFromWatchList(data: Movie) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}/watchlist/${data.id}`).delete();
    }

    addRating(movie: Movie, rating: number) {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}`).collection('ratings').doc(`${movie.id}`).set(rating);
    }

    getRating() {
        const userUid = this.authService.getActiveUser().uid;
        return this.afStore.doc(`data/${userUid}`).collection('ratings').valueChanges();
    }

    getMovieVideo(movieId: string) {
        return 'http://localhost:8080/api/v1/files/' + movieId;
    }

    getRecommendations(movieID: number) {
        const queryParams = {
            api_key: `${environment.tmdbApiKey}`
        };
        const url = `${environment.tmdbUrl}` + '/movie/' + movieID + '/recommendations';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }
}
