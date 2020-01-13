import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentication-service';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

    public registrationForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private authService: AuthenticationService,
        private router: Router,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    async signUp() {
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });

        loading.present();

        this.authService.RegisterUser(this.registrationForm.value.email, this.registrationForm.value.password)
            .then(data => {
                    this.authService.SendVerificationMail().then(() => {
                        loading.dismiss();
                        this.router.navigate(['login']);
                    });
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
