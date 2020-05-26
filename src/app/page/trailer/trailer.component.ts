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

    constructor(public params: NavParams,
                public navCtrl: NavController,
                public sanitizer: DomSanitizer,
                public viewCtrl: ModalController) {

        const paramUrl = this.params.get('url');
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(paramUrl.replace('watch?v=', 'embed/') + '?autoplay=1');
    }


    ngOnInit() {
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
