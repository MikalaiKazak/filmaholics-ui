import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie, MovieResponse} from '../model/movie';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cast, CastResponse} from '../model/cast';
import {TrailerResponse} from '../model/trailer';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) {
    }

    getLatestMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            page: pageNumber.toString()
        };
        return this.http.get('/movie/latest', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getPopularMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            page: pageNumber.toString()
        };
        return this.http.get('/movie/popular', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getTopRatedMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            page: pageNumber.toString()
        };

        return this.http.get('/movie/top_rated', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getTopUpcomingMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            page: pageNumber.toString()
        };

        return this.http.get('/movie/upcoming', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getTopNowPlayingMovies(pageNumber: number): Observable<Movie[]> {
        const queryParams = {
            page: pageNumber.toString()
        };

        return this.http.get('/movie/now_playing', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    searchMovie(searchText: string): Observable<Movie[]> {
        const queryParams = {
            query: searchText
        };

        return this.http.get('/search/movie', {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            }),
            catchError(err => {
                console.log(err);
                return throwError('err');
            })
        );
    }

    getMovieDetail(movieID: string): Observable<Movie> {
        return this.http.get('/movie/' + movieID).pipe(
            map((response: Movie) => {
                return response;
            })
        );
    }

    getMovieCast(movieID: string): Observable<Cast[]> {
        const url = '/movie/' + movieID + '/credits';
        return this.http.get(url).pipe(
            map((response: CastResponse) => {
                return response.cast;
            })
        );
    }

    getSimilarMovies(movieID: string): Observable<Movie[]> {
        const url = '/movie/' + movieID + '/similar';
        return this.http.get(url).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getCategoryMovies(genderID: string, page: number): Observable<Movie[]> {
        const queryParams: any = {
            with_genres: genderID,
            page: page,
        };
        const url = '/discover/movie';
        return this.http.get(url, {params: queryParams}).pipe(
            map((response: MovieResponse) => {
                return response.results;
            })
        );
    }

    getMovieTrailerURL(movieID: string): Observable<string> {
        const url = '/movie/' + movieID + '/videos';
        return this.http.get(url).pipe(
            map((response: TrailerResponse) => {
                const trailerList = response.results.filter(x => {
                    return x.site === 'YouTube';
                });
                return trailerList.length !== 0 ? 'https://www.youtube.com/watch?v=' + trailerList[0].key : null;
            })
        );
    }
}
