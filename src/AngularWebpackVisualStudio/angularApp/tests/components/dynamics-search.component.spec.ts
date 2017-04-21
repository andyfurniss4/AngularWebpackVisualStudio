import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule, FormGroup } from '@angular/forms'
import { SharedModule } from '../../app/shared/shared.module';

import { DynamicsSearchService } from '../../app/dynamics-search/services/dynamics-search.service';
import { DynamicsSearchComponent } from '../../app/dynamics-search/components/dynamics-search.component';

import { DynamicsContact } from '../../app/dynamics-search/models/dynamics-contact';
import { DynamicsSearch } from '../../app/dynamics-search/models/dynamics-search';

describe('DynamicsSearchComponent', () => {

    let fixture: ComponentFixture<DynamicsSearchComponent>;
    let component: DynamicsSearchComponent;
    let searchServiceSpy: DynamicsSearchService;

    const expectedSingleResponse = [{ contactid: 'A7806F57-002C-403F-9D3B-89778144D3E1' }];

    beforeEach(() => {
        searchServiceSpy = jasmine.createSpyObj('DynamicsSearchService', ['search']);
        (searchServiceSpy.search as jasmine.Spy)
            .and.returnValue(Promise.resolve(expectedSingleResponse));

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                SharedModule
            ],
            providers: [
                { provide: DynamicsSearchService, useValue: searchServiceSpy }
            ],
            declarations: [
                DynamicsSearchComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicsSearchComponent);
        component = fixture.componentInstance;
    });

    it('submitSearch should display results in table', async(
        inject([DynamicsSearchService], (service: DynamicsSearchService) => {
            // Arrange
            component.model = new DynamicsSearch('contacts', 'A7806F57-002C-403F-9D3B-89778144D3E1', null, 'contactid');

            // Act
            component.submitSearch();

            // Assert
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                expect(service.search).toHaveBeenCalled();
                expect(component.entities).toBeDefined('no entities returned');
                expect(component.entities.length).toBe(1, `expected 1 entity to be returned but only received ${component.entities.length}`);

                const rowElements = fixture.debugElement.queryAll(By.css('div.table-generic-wrapper tbody tr:not(.row-filler)'));
                expect(rowElements.length).toBe(1, `expected 1 row in results table but there are ${rowElements.length}`);
            });
        })
    ));

    it('formValid returns false when id field and filter fields are empty', () => {
        // Arrange
        (fixture.debugElement.query(By.css('#id')).nativeElement as HTMLInputElement).value = null;
        (fixture.debugElement.query(By.css('#filter')).nativeElement as HTMLInputElement).value = null;

        // Act
        var result = component.formValid();

        // Assert
        expect(result).toBeFalsy('formValid returned true but was expecting false');
    });

    it('formValid returns true when id field given a value', () => {
        // Arrange
        (fixture.debugElement.query(By.css('#id')).nativeElement as HTMLInputElement).value = 'A7806F57-002C-403F-9D3B-89778144D3E1';       

        // Act
        var result = component.formValid();

        // Assert
        expect(result).toBeTruthy('formValid returned false but was expecting true');
    });

    it('formValid returns true when filter field given a value', () => {
        // Arrange
        (fixture.debugElement.query(By.css('#filter')).nativeElement as HTMLInputElement).value = 'contains(fullname, "test")';

        // Act
        var result = component.formValid();

        // Assert
        expect(result).toBeTruthy('formValid returned false but was expecting true');
    });
});