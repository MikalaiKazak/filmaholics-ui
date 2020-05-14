import {Injectable} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    private loadingIcon: any;

    constructor(
        private alertController: AlertController,
        private loadingCtrl: LoadingController
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

    // showBrowser(url: string) {
    //     return this.browserController.show({
    //         url: url,
    //         hidden: false,
    //         animated: false,
    //         transition: 'slide',
    //         enterReaderModeIfAvailable: true,
    //         tintColor: '#ff0000'
    //     });
    // }
}
