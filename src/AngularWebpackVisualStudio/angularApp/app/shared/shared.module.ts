import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],

    declarations: [
        NavigationComponent,
        GenericTableComponent
    ],

    exports: [
        NavigationComponent,
        GenericTableComponent
    ]
})

export class SharedModule { }