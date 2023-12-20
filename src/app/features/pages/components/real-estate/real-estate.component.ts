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
import { TransactionType } from 'src/app/shared/enums/transaction-type.enum';
import { Customer } from '../../models/customer.model';
import { MOCK_CUSTOMERS } from '../../mocks/customer.mock';
import { MOCK_REAL_ESTATES } from '../../mocks/real-estate.mock';

@Component({
    templateUrl: './real-estate.component.html',
    providers: [MessageService],
})
export class RealEstateComponent implements OnInit {
    realEstates: RealEstatePropertyForBuilding[] = [];
    selectedRealEstate: RealEstatePropertyForBuilding;
    selectedRealEstates: RealEstatePropertyForBuilding[] = [];
    realEstateDialog: boolean = false;
    transactionType: string = TransactionType.Sale; // Varsayılan değer olarak ayarlandı
    TransactionTypeEnum = TransactionType; // Şablon için enum özelliği
    customers: Customer[] = [];
    customerOptions: SelectItem[];

    realEstateTypes: SelectItem[] = [
        { label: 'Bina', value: RealEstateType.Building },
        // Diğer gayrimenkul türleri...
    ];



    realEstateStatuses: SelectItem[] = [
        { label: 'Satılık', value: Status.ForSale },
        { label: 'Kiralık', value: Status.Rental },
        // Diğer durumlar...
    ];

    constructor(
        private realEstateService: RealEstateService,
        private messageService: MessageService // MessageService enjekte ediliyor
      ) {}

    ngOnInit() {
        this.loadRealEstates();
        this.loadCustomers();
        this.resetSelectedRealEstate();
    }

    loadCustomers() {
        // Burada müşterileri yükleyin. Örnek olarak MOCK_CUSTOMERS kullanılabilir
        this.customers = MOCK_CUSTOMERS;

        this.customerOptions = this.customers.map(customer => ({
            label: `${customer.customerName} ${customer.customerSurname}`,
            value: customer.id
        }));
    }
    onTypeChange(event: any) {
        this.selectedRealEstate.type = event.value;
    }

    onStatusChange(event: any) {
        this.selectedRealEstate.status = event.value;
    }

    onTransactionTypeChange(type) {
        this.transactionType = type;
    }

    onBuyerChange(buyerId: string) {
        const buyer = this.customers.find(customer => customer.id === buyerId);
        if (buyer) {
            this.selectedRealEstate.buyerName = `${buyer.customerName} ${buyer.customerSurname}`;
        }
    }

    onSellerChange(sellerId: string) {
        const seller = this.customers.find(customer => customer.id === sellerId);
        if (seller) {
            this.selectedRealEstate.sellerName = `${seller.customerName} ${seller.customerSurname}`;
        }
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
        this.resetSelectedRealEstate();
        this.selectedRealEstate.transactionType = TransactionType.Sale; // Veya başka bir varsayılan değer
        this.realEstateDialog = true;
    }

    showEditRealEstateDialog(building: RealEstatePropertyForBuilding) {
        this.selectedRealEstate = { ...building };
        this.realEstateDialog = true;
    }


    saveRealEstate() {
        const index = MOCK_REAL_ESTATES.findIndex(re => re.id === this.selectedRealEstate.id);
        if (index > -1) {
            // Mevcut gayrimenkulü güncelle
            MOCK_REAL_ESTATES[index] = this.selectedRealEstate;
        } else {
            // Yeni gayrimenkulü ekle
            this.selectedRealEstate.id = this.generateUniqueId();
            MOCK_REAL_ESTATES.push(this.selectedRealEstate);
        }

        // Kullanıcıya başarılı işlem mesajı göster
        this.messageService.add({severity:'success', summary:'Başarılı', detail:'İşlem başarıyla kaydedildi'});
        this.loadRealEstates();
        this.realEstateDialog = false;
    }

    generateUniqueId() {
        // Basit bir ID üretici
        return Math.random().toString(36).substr(2, 9);
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
