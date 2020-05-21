import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';
import {SliderComponent} from '../../core/slider/slider.component';
import {Router} from '@angular/router';
import {Movie} from '../../model/movie';
import {User} from '../../model/user';
import {AuthenticationService} from '../../shared/authentication-service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    selectedMenu = 'list';
    loggedUser: User;
    isSessionExist = false;
    userWatchList: Movie[] = [];
    userFavoriteList: Movie[] = [];

    constructor(private movieService: MovieService,
                private nav: NavController,
                private coreService: CoreService, public slider: SliderComponent, private route: Router, private authService: AuthenticationService) {
        this.coreService.menuEnable = true;
    }

    ngOnInit() {
        this.getAccountDetails();
    }

    getAccountDetails() {
        const user = this.authService.getActiveUser();
        if (user) {
            this.loggedUser = user;
            this.isSessionExist = true;
        }
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
