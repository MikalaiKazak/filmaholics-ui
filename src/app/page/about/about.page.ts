import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

    constructor(public activatedRoute: ActivatedRoute,
                public route: Router,
                public movieService: MovieService,
                public coreService: CoreService,
                public nav: NavController) {
        this.coreService.menuEnable = true;
    }

    ngOnInit() {
    }

    goBack() {
        this.nav.back();
    }


    openSearchPage() {
        this.route.navigateByUrl('/search').then((resolve) => {
            setTimeout(() => {
            }, 150);
        });
    }
}
