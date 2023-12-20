import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/components/layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './features/dashboard/components/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import('./features/pages/pages.module').then(
                                    (m) => m.PagesModule
                                ),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./features/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
