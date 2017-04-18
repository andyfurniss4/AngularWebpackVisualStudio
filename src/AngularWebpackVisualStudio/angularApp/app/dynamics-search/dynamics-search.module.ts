import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { DynamicsSearchRoutes } from './dynamics-search.routes';
import { DynamicsSearchComponent } from './components/dynamics-search.component';
import { DynamicsSearchService } from './services/dynamics-search.service';

import { ModelHelper } from '../helpers/model-helper';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DynamicsSearchRoutes,
        SharedModule
    ],
    declarations: [
        DynamicsSearchComponent
    ],
    providers: [
        DynamicsSearchService
    ]
})

export class DynamicsSearchModule { }