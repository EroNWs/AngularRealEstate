import { Customer } from './customer.model';
import { EstateAgent } from './estate-agent.model';
import { RealEstate } from './real-estate.model';

export class RealEstateTransactionForSale {
    constructor(
        public id: string = '',
        public realEstateId: string = '',
        public realEstate: RealEstate = new RealEstate(),
        public estateAgentId: string = '',
        public estateAgent: EstateAgent = new EstateAgent(),
        public buyerId: string = '',
        public buyer: Customer = new Customer(),
        public sellerId: string = '',
        public seller: Customer = new Customer() // Diğer özellikler...
    ) {}
}

export class RealEstateTransactionForRental {
    constructor(
        public id: string = '',
        public realEstateId: string = '',
        public realEstate: RealEstate = new RealEstate(),
        public estateAgentId: string = '',
        public estateAgent: EstateAgent = new EstateAgent(),
        public tenantId: string = '',
        public tenant: Customer = new Customer(),
        public renterId: string = '',
        public renter: Customer = new Customer()
    ) // Diğer özellikler...
    {}
}
