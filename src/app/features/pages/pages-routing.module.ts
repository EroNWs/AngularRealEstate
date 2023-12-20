import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule) },
        { path: 'real-estate', loadChildren: () => import('./components/real-estate/real-estate.module').then(m => m.RealEstateModule) },
        { path: 'estate-agent', loadChildren: () => import('./components/estate-agent/estate-agent.module').then(m => m.EstateAgentModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
