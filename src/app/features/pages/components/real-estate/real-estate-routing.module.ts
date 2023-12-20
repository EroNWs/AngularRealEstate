import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RealEstateComponent } from './real-estate.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: RealEstateComponent }]),
    ],
    exports: [RouterModule],
})
export class RealEstateRoutingModule {}
