import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../shared/core.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private coreService: CoreService,
        private formBuilder: FormBuilder,
        public authService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }

    async logIn() {
        this.coreService.showLoadingIcon();

        this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
            .then(() => {
                    this.router.navigate(['dashboard']);
                    this.coreService.hideLoadingIcon();
                },
                err => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Error', err.message);
                });
    }

    async googleLogin() {
        this.coreService.showLoadingIcon();

        await this.authService.GoogleAuth()
            .then(data => {
                    this.coreService.hideLoadingIcon();
                    this.authService.ngZone.run(() => {
                        this.router.navigate(['dashboard']);
                    });
                    this.authService.SetUserData(data.user);
                },
                err => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Error', err.message);
                });
    }
}
