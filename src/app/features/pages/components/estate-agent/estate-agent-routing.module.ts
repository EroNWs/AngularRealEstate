import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstateAgentComponent } from './estate-agent.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstateAgentComponent }
	])],
	exports: [RouterModule]
})
export class EstateAgentRoutingModule { }
