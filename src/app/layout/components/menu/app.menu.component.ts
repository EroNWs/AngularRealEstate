import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Anasayfa',
                items: [
                    { label: 'Anasayfa', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'SAyfalar',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Müşteri',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/customer']
                    },
                    {
                        label: 'Emlak',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/real-estate']
                    },
                    {
                        label: 'Emlakçı',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/pages/estate-agent']
                    }
                ]
            },
        ];
    }
}
