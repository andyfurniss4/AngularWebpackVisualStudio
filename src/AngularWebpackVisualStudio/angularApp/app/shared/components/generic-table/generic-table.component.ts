import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'generic-table',
    templateUrl: './generic-table.component.html'
})
export class GenericTableComponent implements OnChanges {
    @Input() records: any[];
    @Input() title: string;
    @Input() excludeColumns: string[];
    @Input() resultsPerPage: number = 10;
    @Input() padEmptyRows: boolean = false;

    keys: string[];
    currentPage: number = 1;

    ngOnChanges() {
        if (this.records) {
            this.keys = Object.keys(this.records[0]);

            if (this.excludeColumns.length > 0) {
                for (let i in this.excludeColumns) {
                    let index = this.keys.indexOf(this.excludeColumns[i]);
                    if (index > -1) {
                        this.keys.splice(index, 1);
                    }
                }
            }
        }
    }

    pageRecords(): any[] {
        let startIndex = (this.currentPage - 1) * this.resultsPerPage;
        let endIndex = this.records.length > this.resultsPerPage ? (this.currentPage * this.resultsPerPage) : this.records.length;
        return this.records.slice(startIndex, endIndex);
    };

    lastPage(): number {
        return Math.ceil(this.records.length / this.resultsPerPage);
    }

    currentRangeMin(): number {
        return ((this.currentPage - 1) * this.resultsPerPage) + 1;
    }

    currentRangeMax(): number {
        return (this.currentPage * this.resultsPerPage) > this.records.length ? this.records.length : (this.currentPage * this.resultsPerPage);
    }

    rowsToPad(): number {
        let rowsToPad: number = 0;
        if (this.currentRangeMax() === this.records.length) {
            rowsToPad = (Math.ceil(this.currentRangeMax() / this.resultsPerPage) * this.resultsPerPage) - this.currentRangeMax();
        }
        return rowsToPad;
    }
}