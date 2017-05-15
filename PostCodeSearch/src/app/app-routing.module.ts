import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent }  from './header.component';
import { FooterComponent }  from './footer.component';
import { SearchComponent }  from './search.component';
import { MapComponent }  from './map.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: SearchComponent },
    { path: 'map/:city',  component: MapComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
