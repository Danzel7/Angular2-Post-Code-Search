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
var zip_service_1 = require("./zip.service");
var SearchComponent = (function () {
    function SearchComponent(zipService) {
        this.zipService = zipService;
        this.query = '';
        this.filteredList = [];
        this.zips = [];
    }
    // calls getZipCodes Service
    // and binds result to zips
    SearchComponent.prototype.getZipCodes = function () {
        var _this = this;
        this.zipService.getZipCodes()
            .subscribe(function (zips) {
            _this.zips = zips;
        }, //Bind to view
        function (//Bind to view
            error) { console.log('error'); });
    };
    // on initalize call getZipCodes()
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        self.zipService.getZipCodes().subscribe(function (response) { return _this.zips = response; }, function (error) { return _this.errorMessage = error; });
    };
    // method to filter through list of returned address
    // to match what has been entered in the input
    // only returns max 3 addresses
    SearchComponent.prototype.filter = function (event) {
        if (this.query !== "") {
            var query_1 = this.query;
            this.filteredList = this.zips.filter(function (el) {
                if (el.city.toLowerCase().indexOf(query_1.toLowerCase()) > -1) {
                    return el.city.toLowerCase();
                }
            });
            if (this.filteredList.length > 3) {
                this.filteredList = this.filteredList.slice(0, 3);
            }
        }
        else {
            this.filteredList = [];
        }
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        templateUrl: 'app/search.component.html',
        styleUrls: ['app/search.component.css'],
        providers: [zip_service_1.ZipService]
    }),
    __metadata("design:paramtypes", [zip_service_1.ZipService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map