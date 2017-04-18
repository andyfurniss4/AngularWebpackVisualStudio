import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DynamicsSearch } from '../models/dynamics-search';
import { DynamicsContact } from '../models/dynamics-contact';
import { DynamicsAccount } from '../models/dynamics-account';

import { ModelHelper } from '../../helpers/model-helper';

@Injectable()
export class DynamicsSearchService {
    private apiUrl = '/api/DynamicsSearch/Search';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    search(search: DynamicsSearch): Promise<any[]> {
        search.fields = this.getDefaultFields(search.entity);
        return this.http
            .post(this.apiUrl, JSON.stringify(search), { headers: this.headers })
            .toPromise()
            .then((response) => { return this.extractResults(search.entity, response.json()); })
            .catch(this.handleError);
    }

    private extractResults(entity: string, json: any): DynamicsContact[] | DynamicsAccount[] {
        let jsonType = Object.prototype.toString.call(json);
        switch (jsonType) {
            case '[object Array]':
                return json;
            case '[object Object]':
                if (json['value']) {
                    return json['value'];
                } else {
                    return [json];
                }
            default:
                return null;
        }
    }

    private getDefaultFields(entity: string): string {
        switch (entity) {
            case 'contacts':
                return ModelHelper.fieldsCsv(new DynamicsContact());
            case 'accounts':
                return ModelHelper.fieldsCsv(new DynamicsAccount());
            default:
                return null;
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}