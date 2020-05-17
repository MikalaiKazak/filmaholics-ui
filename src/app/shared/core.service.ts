import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
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
        private modalCtrl: ModalController
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

    async showLoadingIcon() {
        this.loadingIcon = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loadingIcon.present();
    }

    hideLoadingIcon() {
        console.log('Hide Before');
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
