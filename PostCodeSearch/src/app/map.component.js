"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var zip_service_1 = require("./zip.service");
require("rxjs/add/operator/switchMap");
var MapComponent = (function () {
    function MapComponent(zipService, route) {
        this.zipService = zipService;
        this.route = route;
        this.query = '';
        this.postCode = '';
    }
    // on initialize call getZipCodes from zipService
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zipService.getZipCodes()
            .subscribe(function (data) { return _this.search(data); }, function (address) {
            _this.address = address;
        });
    };
    // takes in the city from uRL parameters
    // and filters through list of addresses
    // to see if there is a match
    MapComponent.prototype.search = function (result) {
        var comp = this;
        comp.route.params.subscribe(function (params) {
            comp.filteredList = result.filter(function (el) {
                var theCity = params['city'].replace('%20', ' ');
                if (el.city.toLowerCase().indexOf(theCity.toLowerCase()) > -1) {
                    //if there is no postcode linked to the city
                    // find postCode from Google maps geocoder
                    if (el._id === undefined || el._id === 'undefined') {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({ 'latLng': { lat: el.loc[1], lng: el.loc[0] } }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                comp.postCode = results[0].address_components[7].long_name;
                            }
                        });
                    }
                    else {
                        comp.postCode = el._id;
                    }
                    // create a new map
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 7,
                        center: { lat: el.loc[1], lng: el.loc[0] }
                    });
                    //crate a new marker at position of matched address
                    var marker = new google.maps.Marker({
                        position: { lat: el.loc[1], lng: el.loc[0] },
                        map: map,
                        title: ''
                    });
                    return theCity.toLowerCase();
                }
            });
        });
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: 'map',
        templateUrl: 'app/map.component.html',
        styleUrls: ['app/map.component.css'],
        providers: [zip_service_1.ZipService]
    }),
    __metadata("design:paramtypes", [zip_service_1.ZipService, router_1.ActivatedRoute])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map