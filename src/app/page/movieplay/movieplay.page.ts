import {Component, OnInit} from '@angular/core';
import {CoreService} from '../../shared/core.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../shared/movie.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-movieplay',
    templateUrl: './movieplay.page.html',
    styleUrls: ['./movieplay.page.scss'],
})
export class MovieplayPage implements OnInit {

    videoUrl: any;
    movieID: any;

    constructor(private activatedRoute: ActivatedRoute,
                private route: Router,
                private nav: NavController,
                private sanitizer: DomSanitizer,
                private coreService: CoreService,
                private moviService: MovieService) {
        this.coreService.menuEnable = true;
        this.movieID = this.activatedRoute.snapshot.paramMap.get('movieId');

        const movieUrl = moviService.getMovieVideo(this.movieID);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(movieUrl);
    }


    ngOnInit() {
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
}
