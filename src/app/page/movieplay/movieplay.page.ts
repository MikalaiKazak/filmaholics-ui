import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';

@Component({
    selector: 'app-movieplay',
    templateUrl: './movieplay.page.html',
    styleUrls: ['./movieplay.page.scss'],
})
export class MovieplayPage implements OnInit {

    constructor(private route: Router, private movieService: MovieService, private coreService: CoreService) {
        this.coreService.menuEnable = false;
    }

    ngOnInit() {
    }

    openSearchPage() {
        this.route.navigateByUrl('/search').then((resolve) => {
            setTimeout(() => {
            }, 150);
        });
    }
}
