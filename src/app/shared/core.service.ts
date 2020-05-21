import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {TrailerComponent} from '../page/trailer/trailer.component';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    menuEnable = false;
    private loadingIcon: any;

    constructor(
        private alertController: AlertController,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController
    ) {
    }

    async showAlertMessage(header: string, message: string) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK']
        });

        await alert.present();
    }

    async showToastMessage(message: string, dur: number, pos: string) {
        const toast = await this.toastCtrl.create({
            position: 'bottom',
            message,
            duration: dur
        });

        await toast.present();
    }

    async showLoadingIcon() {
        this.loadingIcon = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loadingIcon.present();
    }

    hideLoadingIcon() {
        if (this.loadingIcon) {
            this.loadingIcon.dismiss();
        }
    }

    async showBrowser(url: string) {
        const trailerModal = await this.modalCtrl.create({
                component: TrailerComponent,
                componentProps: {url},
                animated: true,
                keyboardClose: true,
                cssClass: 'trailer-modal'

            }
        );
        return await trailerModal.present();
    }

    handleImgError(event: any) {
        event.target.src = '../assets/image/no-image-poster.png';
    }
}
