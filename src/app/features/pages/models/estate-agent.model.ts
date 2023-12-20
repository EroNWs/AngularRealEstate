import { Customer } from './customer.model';
import {
    RealEstateTransactionForRental,
    RealEstateTransactionForSale,
} from './real-estate-transaction.model';

export class EstateAgent {
    constructor(
        public id: string = '',
        public agentName: string = '',
        public authorizedName: string = '',
        public authorizedSurname: string = '',
        public address: string = '',
        public city: string = '',
        public district: string = '',
        public postalCode: string = '',
        public phone: string = '',
        public fax: string = '',
        public employeeCount: number = 0,
        public customers: Customer[] = []
    ) {}
}
