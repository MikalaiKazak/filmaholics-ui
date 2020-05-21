import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../shared/core.service';
import {ToastController} from '@ionic/angular';

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
        private toastCtrl: ToastController,
        private authService: AuthenticationService,
        private router: Router
    ) {
        this.coreService.menuEnable = false;
    }

    ngOnInit() {
        this.coreService.menuEnable = false;
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }

    async logIn() {
        await this.coreService.showLoadingIcon();
        await this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
            .then((res) => {
                    if (res === 'success') {
                        this.router.navigate(['home']);
                        this.coreService.hideLoadingIcon();
                        this.coreService.menuEnable = true;
                    } else if (res === 'password') {
                        this.coreService.showToastMessage('Please check login details', 2000, 'bottom');
                        this.coreService.hideLoadingIcon();
                    } else if (res === 'verify') {
                        this.toastWithEmailVerification();
                        this.coreService.hideLoadingIcon();
                    } else {
                        this.coreService.showToastMessage('There was an error. Please try again', 2000, 'bottom');
                        this.coreService.hideLoadingIcon();
                    }
                },
                err => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Error', err.message);
                }).catch(err => {
                this.coreService.showToastMessage('There was an error. Please try again', 2000, 'bottom');
                this.coreService.hideLoadingIcon();
                console.error(err);
            });
    }

    async toastWithEmailVerification() {
        const toast = await this.toastCtrl.create({
            position: 'bottom',
            message: 'Verify your email before logging in',
            duration: 2000,
            buttons: [
                {
                    side: 'end',
                    icon: 'star',
                    text: 'Send again',
                    handler: () => {
                        this.authService.SendVerificationMail();
                    }
                }
            ]
        });

        await toast.present();
    }

    async googleLogin() {
        await this.coreService.showLoadingIcon();

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
