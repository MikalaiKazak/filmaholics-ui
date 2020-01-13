import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/authentication-service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    public passwordRecoverForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private authService: AuthenticationService,
        private router: Router,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.passwordRecoverForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])]
        });
    }

    async passwordRecover() {
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });

        loading.present();

        this.authService.PasswordRecover(this.passwordRecoverForm.value.email)
            .then(data => {
                    loading.dismiss();
                    this.showBasicAlert('Success', 'Please check your email now.');
                    this.router.navigate(['login']);
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
