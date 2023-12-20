import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { RealEstateType } from 'src/app/shared/enums/real-estate-type.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import {
    RealEstate,
    RealEstatePropertyForBuilding,
    RealEstatePropertyForLand,
} from '../../models/real-estate.model';
import { RealEstateService } from '../../services/real-estate.service';
import { HeatingSystemType } from 'src/app/shared/enums/heating-system-type.enum';

@Component({
    templateUrl: './real-estate.component.html',
    providers: [MessageService],
})
export class RealEstateComponent implements OnInit {
    realEstates: RealEstatePropertyForBuilding[] = [];
    selectedRealEstate: RealEstatePropertyForBuilding;
    selectedRealEstates: RealEstatePropertyForBuilding[] = [];
    realEstateDialog: boolean = false;
    transactionType: string;
    transactionTypes = [
        { label: 'Satış', value: 'sale' },
        { label: 'Kiralama', value: 'rental' },
    ];

    realEstateTypes: SelectItem[] = [
        { label: 'Bina', value: RealEstateType.Building },
    ];

    realEstateStatuses: SelectItem[] = [
        { label: 'Satılık', value: Status.ForSale },
        { label: 'Kiralık', value: Status.Rental },
        { label: 'Günlük Kiralık', value: Status.DailyRental },
    ];

    constructor(private realEstateService: RealEstateService) {}

    ngOnInit() {
        this.loadRealEstates();
    }

    onTransactionTypeChange(type) {
        this.transactionType = type;
    }
    getBuildings(): RealEstatePropertyForBuilding[] {
        return this.realEstates;
    }

    addBuilding(building: RealEstatePropertyForBuilding): void {
        this.realEstates.push(building);
    }

    updateBuilding(building: RealEstatePropertyForBuilding): void {
        const index = this.realEstates.findIndex((b) => b.id === building.id);
        if (index > -1) {
            this.realEstates[index] = building;
        }
    }

    deleteBuilding(id: string): void {
        this.realEstates = this.realEstates.filter((b) => b.id !== id);
    }

    loadRealEstates() {
        this.realEstateService.getBuildings().subscribe((data) => {
            this.realEstates = data;
        });
    }

    showAddRealEstateDialog() {
        this.selectedRealEstate = new RealEstatePropertyForBuilding(
            '', // id
            RealEstateType.Building, // type
            Status.ForSale, // status
            0, // squareMeters
            '', // address
            '', // city
            '', // district
            0, // roomCount
            0, // floor
            0, // buildingFloors
            0, // buildingAge
            HeatingSystemType.NaturalGasOperated // heatingType, burada bir varsayılan değer kullanabilirsiniz
        );
        this.realEstateDialog = true;
    }

    showEditRealEstateDialog(building: RealEstatePropertyForBuilding) {
        this.selectedRealEstate = { ...building };
        this.realEstateDialog = true;
    }

    saveRealEstate() {
        if (this.transactionType === 'sale') {
            // Satış işlemi kaydetme mantığı
        } else if (this.transactionType === 'rental') {
            // Kiralama işlemi kaydetme mantığı
        }
        // Ortak kaydetme işlemleri...
    }

    deleteSelectedRealEstates() {
        this.selectedRealEstates.forEach((realEstate) => {
            this.realEstateService
                .deleteBuilding(realEstate.id)
                .subscribe(() => {
                    this.loadRealEstates();
                });
        });
        this.selectedRealEstates = [];
    }

    confirmDeleteRealEstate(realEstate: RealEstate) {
        this.realEstateService.deleteBuilding(realEstate.id).subscribe(() => {
            this.loadRealEstates();
        });
    }
    private resetSelectedRealEstate() {
        this.selectedRealEstate = new RealEstatePropertyForBuilding(
            '', // id
            RealEstateType.Building, // type
            Status.ForSale, // status
            0, // squareMeters
            '', // address
            '', // city
            '', // district
            0, // roomCount
            0, // floor
            0, // buildingFloors
            0, // buildingAge
            HeatingSystemType.NaturalGasOperated // heatingType
        );
    }
}
