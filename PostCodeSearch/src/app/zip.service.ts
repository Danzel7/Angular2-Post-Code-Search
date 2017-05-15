import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Address } from './address';

@Injectable()
export class ZipService {
    private jsonFileURL: string = "./app/assets/zips.json";

    constructor(private http: Http){}

    // Method to get JSON file fromm HTTP Request
    // and returns it to type Address
    getZipCodes(): Observable<Address[]> {
      return this.http.get(this.jsonFileURL).map((response: Response) => {
            return <Address[] > response.json()
        }).catch(this.handleError);
    }

    private handleError(errorResponse: Response) {
        return Observable.throw(errorResponse.json().error || "Server error");
    }
}
