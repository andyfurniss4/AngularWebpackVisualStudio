import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';

import { LoopArrayPipe } from './pipes/loop-array.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],

    declarations: [
        NavigationComponent,
        GenericTableComponent,
        LoopArrayPipe
    ],

    exports: [
        NavigationComponent,
        GenericTableComponent,
        LoopArrayPipe
    ]
})

export class SharedModule { }