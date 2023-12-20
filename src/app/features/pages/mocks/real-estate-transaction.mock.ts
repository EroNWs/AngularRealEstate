import { RealEstateTransactionForRental, RealEstateTransactionForSale } from "../models/real-estate-transaction.model";
import { MOCK_CUSTOMERS } from "./customer.mock";
import { MOCK_ESTATE_AGENTS } from "./estate-agent.mock";
import { MOCK_REAL_ESTATES } from "./real-estate.mock";

export const MOCK_REAL_ESTATE_TRANSACTIONS_FOR_SALE: RealEstateTransactionForSale[] = [
    new RealEstateTransactionForSale(
        '1',
        MOCK_REAL_ESTATES[0].id,
        MOCK_REAL_ESTATES[0],
        MOCK_ESTATE_AGENTS[0].id,
        MOCK_ESTATE_AGENTS[0],
        MOCK_CUSTOMERS[0].id,
        MOCK_CUSTOMERS[0],
        MOCK_CUSTOMERS[1].id,
        MOCK_CUSTOMERS[1]
    ),

];

export const MOCK_REAL_ESTATE_TRANSACTIONS_FOR_RENTAL: RealEstateTransactionForRental[] = [
    new RealEstateTransactionForRental(
        '1',
        MOCK_REAL_ESTATES[0].id,
        MOCK_REAL_ESTATES[0],
        MOCK_ESTATE_AGENTS[0].id,
        MOCK_ESTATE_AGENTS[0],
        MOCK_CUSTOMERS[0].id,
        MOCK_CUSTOMERS[0],
        MOCK_CUSTOMERS[1].id,
        MOCK_CUSTOMERS[1]
    ),
];
