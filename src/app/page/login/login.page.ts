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

    loginForm: FormGroup;

    constructor(
        private coreService: CoreService,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private router: Router
    ) {
        coreService.menuEnable = false;
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
                    this.router.navigate(['home']);
                    this.coreService.hideLoadingIcon();
                    this.coreService.menuEnable = true;
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
                        this.router.navigate(['home']);
                        this.coreService.menuEnable = true;
                    });
                    this.authService.SetUserData(data.user);
                },
                err => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Error', err.message);
                });
    }
}
