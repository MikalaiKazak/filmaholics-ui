import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-trailer',
    templateUrl: './trailer.component.html',
    styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent implements OnInit {

    videoUrl: any;

    constructor(private params: NavParams,
                private navCtrl: NavController,
                private sanitizer: DomSanitizer,
                private viewCtrl: ModalController) {

        const paramUrl = this.params.get('url');
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(paramUrl.replace('watch?v=', 'embed/') + '?autoplay=1');
        console.log(this.videoUrl)
    }


    ngOnInit() {
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
