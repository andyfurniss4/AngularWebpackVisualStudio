import { Routes, RouterModule } from '@angular/router';

import { DynamicsSearchComponent } from './components/dynamics-search.component';

const routes: Routes = [
    { path: '', component: DynamicsSearchComponent }
];

export const DynamicsSearchRoutes = RouterModule.forChild(routes);