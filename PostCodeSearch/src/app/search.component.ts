import { Component, OnInit } from '@angular/core';

import { Address } from './address';
import { ZipService } from './zip.service';

@Component({
    selector: 'search',
    templateUrl: 'app/search.component.html',
    styleUrls: ['app/search.component.css'],
    providers: [ ZipService ]
})

export class SearchComponent implements OnInit{
    public query = '';
    zips: Address[];
    public filteredList = [];
    errorMessage: string;

    constructor(private zipService: ZipService){
        this.zips = [];
    }

    // calls getZipCodes Service
    // and binds result to zips
    getZipCodes(): void{
        this.zipService.getZipCodes()
            .subscribe(
                zips => {
                    this.zips = zips;
                }, //Bind to view
                error => { console.log('error'); }
            )
    }

    // on initalize call getZipCodes()
    ngOnInit(): void {
        let self = this;
        self.zipService.getZipCodes().subscribe(response => this.zips = response, error => this.errorMessage = < any > error);
    }

    // method to filter through list of returned address
    // to match what has been entered in the input
    // only returns max 3 addresses
    filter(event: any) {
        if (this.query !== "") {
            let query = this.query;

            this.filteredList = this.zips.filter(function(el) {
                if(el.city.toLowerCase().indexOf(query.toLowerCase()) > -1){
                    return el.city.toLowerCase();
                }
            });
            if(this.filteredList.length > 3){
                this.filteredList = this.filteredList.slice(0, 3);
            }
        } else {
            this.filteredList = [];
        }
    }
}
