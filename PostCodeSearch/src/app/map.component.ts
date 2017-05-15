import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Address } from './address';

import { ZipService } from './zip.service';

import 'rxjs/add/operator/switchMap';

declare var google: any;

@Component({
    selector: 'map',
    templateUrl: 'app/map.component.html',
    styleUrls: ['app/map.component.css'],
    providers: [ ZipService ]
})

export class MapComponent implements OnInit {
    address: Address[];
    public filteredList;
    public query = '';
    public postCode: string;
    city: string;

    constructor(private zipService: ZipService, private route: ActivatedRoute) {
        this.postCode = '';
    }

    // on initialize call getZipCodes from zipService
    ngOnInit() {
        this.zipService.getZipCodes()
            .subscribe(
              data => this.search(data),
                address => {
                    this.address = address;
                }, //Bind to view
              )
    }


    // takes in the city from uRL parameters
    // and filters through list of addresses
    // to see if there is a match
    search(result) {
        let comp = this;

        comp.route.params.subscribe(params => {
            comp.filteredList = result.filter(function(el) {
                let theCity = params['city'].replace('%20',' ');

                if(el.city.toLowerCase().indexOf(theCity.toLowerCase()) > -1){
                    //if there is no postcode linked to the city
                    // find postCode from Google maps geocoder
                    if(el._id === undefined || el._id === 'undefined'){
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({'latLng': {lat: el.loc[1], lng: el.loc[0]} }, function(results, status){
                            if(status == google.maps.GeocoderStatus.OK){
                                comp.postCode = results[0].address_components[7].long_name;
                            }
                        });
                    }
                    else{
                        comp.postCode = el._id;
                    }

                    // create a new map
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 7,
                        center: {lat: el.loc[1], lng: el.loc[0]}
                    });

                    //crate a new marker at position of matched address
                    var marker = new google.maps.Marker({
                        position: {lat: el.loc[1], lng: el.loc[0]},
                        map: map,
                        title: ''
                    });

                    return theCity.toLowerCase();
              }
         });
      });

    }
}
