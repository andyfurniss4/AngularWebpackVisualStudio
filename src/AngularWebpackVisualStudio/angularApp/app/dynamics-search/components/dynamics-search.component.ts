import { Component } from '@angular/core';

import { DynamicsSearchService } from '../services/dynamics-search.service';
import { DynamicsSearch } from '../models/dynamics-search';

@Component({
    selector: 'dynamics-search-component',
    templateUrl: 'dynamics-search.component.html'
})
export class DynamicsSearchComponent {
    private searching: boolean = false;
    private searched: boolean = false;
    private searchSuccessful: boolean = false;

    entityOptions = [
        { value: 'contacts', display: 'Contacts' },
        { value: 'accounts', display: 'Accounts' }
    ];
    model = new DynamicsSearch(this.entityOptions[0].value, null, null, null);
    entities: any[];

    constructor(private searchService: DynamicsSearchService) { }

    onSubmit() {
        this.searching = this.searched = true;
        this.searchService.search(this.model)
            .then(results => {
                this.entities = results;
                this.searching = false;
                this.searchSuccessful = results !== null && results.length > 0;
            });
    }

    formValid(): boolean {
        const idField = <HTMLInputElement>document.getElementById('id');
        const filterField = <HTMLInputElement>document.getElementById('filter');

        return (idField.value && idField.value.length > 0) || (filterField.value && filterField.value.length > 0);
    }

    buttonDisabled(formElementValid: boolean): boolean {
        return this.searching || !formElementValid || !this.formValid();
    }
}
