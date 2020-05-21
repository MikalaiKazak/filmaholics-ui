/* Core */
import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';

/* Servies */


@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    searchText = '';
    movieList: Array<Movie> = [];
    @ViewChild('searchbar', {static: false}) searchbar: IonSearchbar;
    private isDataLoaded = true;

    constructor(private movieService: MovieService, private coreService: CoreService, private nav: NavController,) {
        coreService.menuEnable = true;
    }


    ngOnInit() {
        setTimeout(() => {
            this.searchbar.setFocus();
        }, 150);
    }

    searchMovie(word: string) {
        const search = word.trim();
        this.isDataLoaded = false;
        this.movieService.searchMovie(search).subscribe(d => {
            this.movieList = d;
            this.isDataLoaded = true;
        }, (error: any) => {
            this.movieList = [];
            this.isDataLoaded = true;
        });
    }

    goBack() {
        this.nav.back();
    }
}
