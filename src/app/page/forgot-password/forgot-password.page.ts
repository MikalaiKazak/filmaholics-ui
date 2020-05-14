import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/authentication-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../shared/core.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    public passwordRecoverForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
        private coreService: CoreService,
    ) {
        coreService.menuEnable = false;
    }

    ngOnInit() {
        this.passwordRecoverForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])]
        });
    }

    async passwordRecover() {
        this.coreService.showLoadingIcon();

        this.authService.PasswordRecover(this.passwordRecoverForm.value.email)
            .then(() => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Success', 'Please check your email now.');
                    this.router.navigate(['login']);
                },
                err => {
                    this.coreService.hideLoadingIcon();
                    this.coreService.showAlertMessage('Error', err.message);
                });
    }
}
