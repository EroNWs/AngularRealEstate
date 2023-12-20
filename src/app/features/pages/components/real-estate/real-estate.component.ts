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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Component({
    templateUrl: './real-estate.component.html',
    providers: [MessageService],
})
export class RealEstateComponent implements OnInit {
    realEstates: RealEstatePropertyForBuilding[] = [];
    selectedRealEstate: any = {
        // other properties
        buyerId: null, // Store buyer ID
        sellerId: null, // Store seller ID
        landlordId: null, // Store landlord ID
        tenantId: null, // Store tenant ID
    };
    selectedRealEstates: RealEstatePropertyForBuilding[] = [];
    realEstateDialog: boolean = false;
    transactionType: string = 'Satılık'; // Varsayılan değer olarak ayarlandı
    TransactionTypeEnum = TransactionType; // Şablon için enum özelliği
    customers: Customer[] = [];
    customerOptions: SelectItem[];
    public buyerId: string;
    public sellerId: string;
    public landlordId: string;
    public tenantId: string;
    selectedBuyer: any = null;
selectedSeller: any = null;
selectedLandlord: any = null;
selectedTenant: any = null;
searchFields: any[];
selectedSearchField: string;

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
        private messageService: MessageService

      ) {

      }

      downloadPdf() {
        const data = document.getElementById('table-to-export'); // Tablonuzun ID'si
        html2canvas(data).then((canvas) => {
            const imgWidth = 208;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const position = 0;
            pdf.addImage(
                contentDataURL,
                'PNG',
                0,
                position,
                imgWidth,
                imgHeight
            );
            pdf.save('MYPdf.pdf');
        });
    }
    clearSearch() {
        // Arama alanlarını ve filtreleri sıfırla
        this.selectedSearchField = null;
        // Gerekiyorsa diğer ilgili alanları da sıfırlayın
        // Örneğin: this.searchText = ''; veya this.selectedFilters = {};

        // Eğer PrimeNG tablo filtrelerini programatik olarak temizlemek istiyorsanız:
        // this.dt.reset();  // this.dt, p-table'a verdiğiniz bir template referansı olmalıdır.
    }

    ngOnInit() {
        this.loadRealEstates();
        this.loadCustomers();
        this.resetSelectedRealEstate();
        this.searchFields = [
            {label: 'Metrekare', value: 'squareMeters'},
            {label: 'Adres', value: 'address'},
            // Diğer arama alanları...
        ];
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
        // sellerId ve landlordName'i sıfırlamaktan kaçının
    }
    onTransactionTypeChange(type) {
        this.transactionType = type;
    }

    onBuyerChange(buyerId: string) {
        const buyer = this.customers.find(customer => customer.id === buyerId);
        if (buyer) {
            this.selectedRealEstate.buyerName = `${buyer.customerName} ${buyer.customerSurname}`;
        } else {
            this.selectedRealEstate.buyerName = '';
        }
        this.selectedRealEstate.buyerId = buyerId;
    }


    onSellerChange(sellerId: string) {
        const seller = this.customers.find(customer => customer.id === sellerId);
        if (seller) {
            this.selectedRealEstate.sellerName = `${seller.customerName} ${seller.customerSurname}`;
        } else {
            this.selectedRealEstate.sellerName = '';
        }
        this.selectedRealEstate.sellerId = sellerId;
        console.log('Selected Seller ID:', sellerId);
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
        let realEstateToSave;

        if (this.selectedRealEstate.id) {
            // Mevcut gayrimenkulü güncelleme
            realEstateToSave = new RealEstatePropertyForBuilding(
                this.selectedRealEstate.id,
                this.selectedRealEstate.type,
                this.selectedRealEstate.status,
                this.selectedRealEstate.squareMeters,
                this.selectedRealEstate.address,
                this.selectedRealEstate.city,
                this.selectedRealEstate.district,
                this.selectedRealEstate.roomCount,
                this.selectedRealEstate.floor,
                this.selectedRealEstate.buildingFloors,
                this.selectedRealEstate.buildingAge,
                this.selectedRealEstate.heatingType,
                this.selectedRealEstate.sellerName,
                this.selectedRealEstate.buyerName,
                this.selectedRealEstate.landlordName,
                this.selectedRealEstate.tenantName
            );

            const index = MOCK_REAL_ESTATES.findIndex(re => re.id === this.selectedRealEstate.id);
            if (index > -1) {
                MOCK_REAL_ESTATES[index] = realEstateToSave;
            }
        } else {
            // Yeni gayrimenkul ekleme
            realEstateToSave = new RealEstatePropertyForBuilding(
                this.generateUniqueId(),
                this.selectedRealEstate.type,
                this.selectedRealEstate.status,
                this.selectedRealEstate.squareMeters,
                this.selectedRealEstate.address,
                this.selectedRealEstate.city,
                this.selectedRealEstate.district,
                this.selectedRealEstate.roomCount,
                this.selectedRealEstate.floor,
                this.selectedRealEstate.buildingFloors,
                this.selectedRealEstate.buildingAge,
                this.selectedRealEstate.heatingType,
                this.selectedRealEstate.sellerName,
                '',
                this.selectedRealEstate.landlordName,
                this.selectedRealEstate.tenantName
            );
            console.log(realEstateToSave)

            MOCK_REAL_ESTATES.push(realEstateToSave);
        }

        // Tabloyu güncelle
        console.log('Real Estate to Save:', realEstateToSave);
        this.realEstates = [...MOCK_REAL_ESTATES];

        // Kullanıcıya başarılı işlem mesajı göster
        this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Gayrimenkul başarıyla kaydedildi'});

        // Diyalog penceresini kapat
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
