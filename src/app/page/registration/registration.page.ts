import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../shared/core.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

    public registrationForm: FormGroup;

    constructor(
        public nav: NavController,
        public coreService: CoreService,
        public formBuilder: FormBuilder,
        public authService: AuthenticationService,
        public router: Router,
    ) {
        coreService.menuEnable = false;
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    async signUp() {
        this.coreService.showLoadingIcon();

        this.authService.RegisterUser(this.registrationForm.value.email, this.registrationForm.value.password)
            .then(() => {
                    this.authService.SendVerificationMail().then(() => {
                        this.coreService.hideLoadingIcon();
                        this.router.navigate(['login']);
                    });
                },
                err => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Error', err.message);
                });
    }

    goBack() {
        this.nav.back();
    }
}
