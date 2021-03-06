import {Component, OnInit} from '@angular/core';
import {CoreService} from '../../shared/core.service';
import {NavController} from '@ionic/angular';
import {MovieService} from '../../shared/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Genre} from '../../model/genre';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.page.html',
    styleUrls: ['./genre.page.scss'],
})
export class GenrePage implements OnInit {

    isDataLoaded = false;
    genreList: Genre[] = [];

    constructor(public coreService: CoreService,
                public nav: NavController,
                public movieService: MovieService, public activatedRoute: ActivatedRoute, public route: Router) {
        coreService.menuEnable = true;
    }

    ngOnInit() {
        this.genreList = [];
        this.isDataLoaded = false;
        setTimeout(() => {
            this.getGenre();
        }, 500);
    }

    openSearchPage() {
        this.route.navigateByUrl('/search').then((resolve) => {
            setTimeout(() => {
            }, 150);
        });
    }

    goBack() {
        this.nav.back();
    }

    public getGenre() {
        this.isDataLoaded = false;
        this.movieService.getGenre().subscribe(genres => {
            this.genreList = genres;
            this.coreService.hideLoadingIcon();
            this.isDataLoaded = true;
        });
    }
}
