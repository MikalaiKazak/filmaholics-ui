/* Core */
import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, IonSearchbar, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {MovieService} from '../../shared/movie.service';
import {CoreService} from '../../shared/core.service';

/* Servies */


@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    searchText = '';
    movieList: Array<Movie> = [];
    @ViewChild('searchbar', {static: false}) searchbar: IonSearchbar;
    private isDataLoaded = true;

    regions: { code: string, region: string }[] = [
        {code: ' ', region: 'Any'},
        {code: 'AL', region: 'Albania'},
        {code: 'DZ', region: 'Algeria'},
        {code: 'AD', region: 'Andorra'},
        {code: 'AO', region: 'Angola'},
        {code: 'AI', region: 'Anguilla'},
        {code: 'AQ', region: 'Antarctica'},
        {code: 'AR', region: 'Argentina'},
        {code: 'AM', region: 'Armenia'},
        {code: 'AW', region: 'Aruba'},
        {code: 'AU', region: 'Australia'},
        {code: 'AT', region: 'Austria'},
        {code: 'AZ', region: 'Azerbaijan'},
        {code: 'BS', region: 'Bahamas'},
        {code: 'BH', region: 'Bahrain'},
        {code: 'BD', region: 'Bangladesh'},
        {code: 'BB', region: 'Barbados'},
        {code: 'BY', region: 'Belarus'},
        {code: 'BE', region: 'Belgium'},
        {code: 'BZ', region: 'Belize'},
        {code: 'BJ', region: 'Benin'},
        {code: 'BM', region: 'Bermuda'},
        {code: 'BT', region: 'Bhutan'},
        {code: 'BW', region: 'Botswana'},
        {code: 'BR', region: 'Brazil'},
        {code: 'BG', region: 'Bulgaria'},
        {code: 'BI', region: 'Burundi'},
        {code: 'KH', region: 'Cambodia'},
        {code: 'CM', region: 'Cameroon'},
        {code: 'CA', region: 'Canada'},
        {code: 'CV', region: 'Cape Verde'},
        {code: 'TD', region: 'Chad'},
        {code: 'CL', region: 'Chile'},
        {code: 'CN', region: 'China'},
        {code: 'CO', region: 'Colombia'},
        {code: 'KM', region: 'Comoros'},
        {code: 'CG', region: 'Congo'},
        {code: 'CR', region: 'Costa Rica'},
        {code: 'HR', region: 'Croatia'},
        {code: 'CU', region: 'Cuba'},
        {code: 'CW', region: 'Curaçao'},
        {code: 'CY', region: 'Cyprus'},
        {code: 'CZ', region: 'Czech'},
        {code: 'DK', region: 'Denmark'},
        {code: 'DJ', region: 'Djibouti'},
        {code: 'DM', region: 'Dominica'},
        {code: 'EC', region: 'Ecuador'},
        {code: 'EG', region: 'Egypt'},
        {code: 'ER', region: 'Eritrea'},
        {code: 'EE', region: 'Estonia'},
        {code: 'ET', region: 'Ethiopia'},
        {code: 'FJ', region: 'Fiji'},
        {code: 'FI', region: 'Finland'},
        {code: 'FR', region: 'France'},
        {code: 'GA', region: 'Gabon'},
        {code: 'GM', region: 'Gambia'},
        {code: 'GE', region: 'Georgia'},
        {code: 'DE', region: 'Germany'},
        {code: 'GH', region: 'Ghana'},
        {code: 'GI', region: 'Gibraltar'},
        {code: 'GR', region: 'Greece'},
        {code: 'GL', region: 'Greenland'},
        {code: 'GD', region: 'Grenada'},
        {code: 'GP', region: 'Guadeloupe'},
        {code: 'GU', region: 'Guam'},
        {code: 'GT', region: 'Guatemala'},
        {code: 'GG', region: 'Guernsey'},
        {code: 'GN', region: 'Guinea'},
        {code: 'GY', region: 'Guyana'},
        {code: 'HT', region: 'Haiti'},
        {code: 'HN', region: 'Honduras'},
        {code: 'HK', region: 'Hong Kong'},
        {code: 'HU', region: 'Hungary'},
        {code: 'IS', region: 'Iceland'},
        {code: 'IN', region: 'India'},
        {code: 'ID', region: 'Indonesia'},
        {code: 'IQ', region: 'Iraq'},
        {code: 'IE', region: 'Ireland'},
        {code: 'IL', region: 'Israel'},
        {code: 'IT', region: 'Italy'},
        {code: 'JM', region: 'Jamaica'},
        {code: 'JP', region: 'Japan'},
        {code: 'JE', region: 'Jersey'},
        {code: 'JO', region: 'Jordan'},
        {code: 'KZ', region: 'Kazakhstan'},
        {code: 'KE', region: 'Kenya'},
        {code: 'KI', region: 'Kiribati'},
        {code: 'KR', region: 'Korea'},
        {code: 'KW', region: 'Kuwait'},
        {code: 'KG', region: 'Kyrgyzstan'},
        {code: 'LV', region: 'Latvia'},
        {code: 'LB', region: 'Lebanon'},
        {code: 'LS', region: 'Lesotho'},
        {code: 'LR', region: 'Liberia'},
        {code: 'LY', region: 'Libya'},
        {code: 'LT', region: 'Lithuania'},
        {code: 'LU', region: 'Luxembourg'},
        {code: 'MO', region: 'Macao'},
        {code: 'MG', region: 'Madagascar'},
        {code: 'MW', region: 'Malawi'},
        {code: 'MY', region: 'Malaysia'},
        {code: 'MV', region: 'Maldives'},
        {code: 'ML', region: 'Mali'},
        {code: 'MT', region: 'Malta'},
        {code: 'MQ', region: 'Martinique'},
        {code: 'MR', region: 'Mauritania'},
        {code: 'MU', region: 'Mauritius'},
        {code: 'YT', region: 'Mayotte'},
        {code: 'MX', region: 'Mexico'},
        {code: 'MC', region: 'Monaco'},
        {code: 'MN', region: 'Mongolia'},
        {code: 'ME', region: 'Montenegro'},
        {code: 'MS', region: 'Montserrat'},
        {code: 'MA', region: 'Morocco'},
        {code: 'MZ', region: 'Mozambique'},
        {code: 'MM', region: 'Myanmar'},
        {code: 'NA', region: 'Namibia'},
        {code: 'NR', region: 'Nauru'},
        {code: 'NP', region: 'Nepal'},
        {code: 'NL', region: 'Netherlands'},
        {code: 'NZ', region: 'New Zealand'},
        {code: 'NI', region: 'Nicaragua'},
        {code: 'NE', region: 'Niger'},
        {code: 'NG', region: 'Nigeria'},
        {code: 'NO', region: 'Norway'},
        {code: 'OM', region: 'Oman'},
        {code: 'PK', region: 'Pakistan'},
        {code: 'PW', region: 'Palau'},
        {code: 'PA', region: 'Panama'},
        {code: 'PY', region: 'Paraguay'},
        {code: 'PE', region: 'Peru'},
        {code: 'PH', region: 'Philippines'},
        {code: 'PN', region: 'Pitcairn'},
        {code: 'PL', region: 'Poland'},
        {code: 'PT', region: 'Portugal'},
        {code: 'PR', region: 'Puerto Rico'},
        {code: 'QA', region: 'Qatar'},
        {code: 'RE', region: 'Réunion'},
        {code: 'RO', region: 'Romania'},
        {code: 'RU', region: 'Russian'},
        {code: 'RW', region: 'Rwanda'},
        {code: 'LC', region: 'Saint Lucia'},
        {code: 'WS', region: 'Samoa'},
        {code: 'SM', region: 'San Marino'},
        {code: 'SA', region: 'Saudi Arabia'},
        {code: 'SN', region: 'Senegal'},
        {code: 'RS', region: 'Serbia'},
        {code: 'SC', region: 'Seychelles'},
        {code: 'SL', region: 'Sierra Leone'},
        {code: 'SG', region: 'Singapore'},
        {code: 'SK', region: 'Slovakia'},
        {code: 'SI', region: 'Slovenia'},
        {code: 'SO', region: 'Somalia'},
        {code: 'ZA', region: 'South Africa'},
        {code: 'ES', region: 'Spain'},
        {code: 'LK', region: 'Sri Lanka'},
        {code: 'SD', region: 'Sudan'},
        {code: 'SR', region: 'Suriname'},
        {code: 'SZ', region: 'Swaziland'},
        {code: 'SE', region: 'Sweden'},
        {code: 'CH', region: 'Switzerland'},
        {code: 'TJ', region: 'Tajikistan'},
        {code: 'TH', region: 'Thailand'},
        {code: 'TL', region: 'Timor-leste'},
        {code: 'TG', region: 'Togo'},
        {code: 'TK', region: 'Tokelau'},
        {code: 'TN', region: 'Tunisia'},
        {code: 'TR', region: 'Turkey'},
        {code: 'TM', region: 'Turkmenistan'},
        {code: 'TV', region: 'Tuvalu'},
        {code: 'UG', region: 'Uganda'},
        {code: 'UA', region: 'Ukraine'},
        {code: 'GB', region: 'United Kingdom'},
        {code: 'US', region: 'United States'},
        {code: 'UY', region: 'Uruguay'},
        {code: 'UZ', region: 'Uzbekistan'},
        {code: 'VU', region: 'Vanuatu'},
        {code: 'VN', region: 'Viet Nam'},
        {code: 'YE', region: 'Yemen'},
        {code: 'ZM', region: 'Zambia'},
        {code: 'ZW', region: 'Zimbabwe'}
    ];

    selectedRegion: string;
    selectedYear: string;
    adult: boolean;
    pageCount = 1;

    constructor(private movieService: MovieService, private coreService: CoreService, private nav: NavController,) {
        coreService.menuEnable = true;
    }


    ngOnInit() {
        setTimeout(() => {
            this.searchbar.setFocus();
        }, 150);
    }

    searchMovie(word: string, pageNumber: number) {
        if (pageNumber === 1) {
            this.movieList = [];
        }
        const search = word.trim();
        this.isDataLoaded = false;
        this.movieService.searchMovie(search, this.selectedRegion, this.selectedYear, this.adult, pageNumber).subscribe(d => {
            this.movieList = this.movieList.concat(d);
            this.isDataLoaded = true;
            this.infiniteScroll.complete();
        }, (error: any) => {
            this.isDataLoaded = true;
            this.infiniteScroll.complete();
        });
    }

    goBack() {
        this.nav.back();
    }

    getCountry(value: string) {
        if (value) {
            this.movieList = [];
            this.pageCount = 1;
            this.selectedRegion = value;
            if (this.searchText === '') {
                this.searchMovie('f', this.pageCount);
            } else {
                this.searchMovie(this.searchText, this.pageCount);
            }
        }
    }

    getRangeOfYears() {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 100)).fill('').map((v, idx) => now - idx) as Array<number>;
    }

    getYear(value: string) {
        if (value) {
            this.movieList = [];
            this.pageCount = 1;
            this.selectedYear = value;
            if (this.searchText === '') {
                this.searchMovie('s', this.pageCount);
            } else {
                this.searchMovie(this.searchText, this.pageCount);
            }
        }
    }

    toggleAdult() {
        this.movieList = [];
        this.pageCount = 1;
        if (this.searchText === '') {
            this.searchMovie('a', this.pageCount);
        } else {
            this.searchMovie(this.searchText, this.pageCount);
        }
    }

    loadMoreMovies() {
        this.pageCount = this.pageCount + 1;
        this.searchMovie(this.searchText, this.pageCount);
    }
}
