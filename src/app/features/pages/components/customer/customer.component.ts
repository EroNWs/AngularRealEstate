import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Gender } from 'src/app/shared/enums/gender.enum';
import { Occupation } from 'src/app/shared/enums/occupation.enum';
import { MaritalStatus } from 'src/app/shared/enums/marital-status.enum';

@Component({
    templateUrl: './customer.component.html',
    providers: [MessageService],
})
export class CustomerComponent implements OnInit {
    customers: Customer[] = [];
    customerDialog: boolean = false;
    customerCols: any[];
    selectedCustomers: Customer[] = [];
    customer: Customer | null = null;
    genderOptions: any;
    occupationOptions: any;
    sortField: string;
    sortOrder: number;

    constructor(
        private customerService: CustomerService,
        private messageService: MessageService
    ) {
        this.resetCustomer();
    }

    ngOnInit() {
        this.loadCustomers();
        this.initializeTableColumns();
        this.initializeOptions();
        this.genderOptions;
        this.occupationOptions;
    }

    initializeOptions() {
        this.genderOptions = [
            { label: 'Erkek', value: Gender.Man },
            { label: 'Kadın', value: Gender.Woman },
            // Diğer cinsiyet seçenekleri...
        ];
        this.occupationOptions = [
            {
                label: 'Yazılım Geliştirici',
                value: Occupation.SoftwareDeveloper,
            },
            { label: 'Muhasebeci', value: Occupation.Accountant },
            // Diğer meslek seçenekleri...
        ];
    }

    onSort(event) {
        this.sortField = event.field;
        this.sortOrder = event.order;
    }

    resetCustomer() {
        this.customer = new Customer(
            '', // id
            '', // customerName
            '', // customerSurname
            '', // customerSecondSurname
            '', // customerSecondName
            new Date(), // birthDate
            Gender.Man, // gender
            Occupation.SoftwareDeveloper, // occupation
            MaritalStatus.Single, // maritalStatus
            '', // homePhone
            '', // mobilePhone
            0, // numberOfChildren
            '', // email
            Occupation.Accountant, // spouseOccupation
            new Date(), // spouseBirthDate
            false, // isBuyerCustomer
            false, // isSellerCustomer
            false, // isTenantCustomer
            false, // isRenterCustomer
            '', // address
            '', // city
            '', // district
            '' // estateAgentId
        );
    }

    // `saveCustomer` metodunda

    loadCustomers() {
        // CustomerService üzerinden müşterileri yükle
        this.customerService.getCustomers().subscribe(
            (data) => {
                this.customers = data;
            },
            (error) => {
                console.error('Müşteri yükleme hatası:', error);
            }
        );
    }

    initializeTableColumns() {
        this.customerCols = [
            { field: 'customerName', header: 'Adı' },
            { field: 'customerSurname', header: 'Soyadı' },
            { field: 'birthDate', header: 'Doğum Tarihi', type: 'date' },
            { field: 'gender', header: 'Cinsiyet' },
            { field: 'occupation', header: 'Meslek' },
            { field: 'address', header: 'Adres' },
            { field: 'city', header: 'Şehir' },
            { field: 'district', header: 'İlçe' },
        ];
    }

    openNewCustomerDialog() {
        this.resetCustomer();
        this.customerDialog = true;
    }

    findIndexById(id: string): number {
        return this.customers.findIndex((customer) => customer.id === id);
    }

    deleteSelectedCustomers() {
        this.selectedCustomers.forEach((customer) => {
            this.customerService.deleteCustomer(customer.id).subscribe(() => {
                this.customers = this.customers.filter(
                    (cust) => cust.id !== customer.id
                );
                // Başarılı işlem mesajı göster...
            });
        });

        this.selectedCustomers = [];
    }

    editCustomer(customer: Customer) {
        // Seçili müşteri bilgilerini düzenleme için dialog aç
        this.customer = { ...customer };
        this.customerDialog = true;
    }
    hideCustomerDialog() {
        this.customerDialog = false;
        this.resetCustomer();
    }
    confirmDeleteCustomer(customer: Customer) {
        // Müşteri silme işlemi için onay diyalogu aç
        // Silme işlemi gerçekleştirilecek
        this.customerService.deleteCustomer(customer.id).subscribe(() => {
            this.customers = this.customers.filter(
                (cust) => cust.id !== customer.id
            );
            // Başarılı işlem mesajı göster
        });
    }
    generateRandomId() {
        return 'xxxx-xxxx-4xxx-yxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    saveCustomer() {
        if (this.customer.customerName && this.customer.customerSurname) {
            const isNewCustomer = !this.customer.id;

            if (isNewCustomer) {
                // Yeni müşteri için rastgele bir ID atama
                this.customer.id = this.generateRandomId();
            }

            const saveOrUpdateObservable = isNewCustomer
                ? this.customerService.addCustomer(this.customer)
                : this.customerService.updateCustomer(this.customer);

            saveOrUpdateObservable.subscribe((savedCustomer) => {
                const index = this.findIndexById(savedCustomer.id);

                if (index !== -1) {
                    // Mevcut müşteriyi güncelle
                    this.customers[index] = savedCustomer;
                } else if (isNewCustomer) {
                    // Yeni müşteriyi listeye ekle
                    this.customers.push(savedCustomer);
                }

                this.customerDialog = false;
                this.resetCustomer();
            });
        }
    }
}
