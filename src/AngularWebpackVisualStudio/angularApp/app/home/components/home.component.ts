import { Component } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    public message: string;

    constructor() {
        this.message = 'Welcome to Globe Dynamics Data Search';
    }
}