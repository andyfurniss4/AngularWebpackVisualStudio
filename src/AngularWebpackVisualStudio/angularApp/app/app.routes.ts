import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dynamics-search', pathMatch: 'full' },
    { path: 'dynamics-search', loadChildren: './dynamics-search/dynamics-search.module#DynamicsSearchModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);