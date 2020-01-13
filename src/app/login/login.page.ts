import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentication-service';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private loadingController: LoadingController,
        private authService: AuthenticationService,
        private alertController: AlertController,
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
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });

        loading.present();

        this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
            .then(data => {
                    this.router.navigate(['dashboard']);
                    loading.dismiss();
                },
                err => {
                    loading.dismiss();
                    this.showBasicAlert('Error', err.message);
                });
    }

    async googleLogin() {
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });

        loading.present();

        await this.authService.GoogleAuth()
            .then(data => {
                    loading.dismiss();
                    this.authService.ngZone.run(() => {
                        this.router.navigate(['dashboard']);
                    });
                    this.authService.SetUserData(data.user);
                },
                err => {
                    loading.dismiss();
                    this.showBasicAlert('Error', err.message);
                });
    }

    async showBasicAlert(title, text) {
        const alert = await this.alertController.create({
            header: title,
            message: text,
            buttons: ['OK']
        });
        alert.present();
    }
}
