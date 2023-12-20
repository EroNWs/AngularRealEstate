
import { Gender } from "src/app/shared/enums/gender.enum";
import { MaritalStatus } from "src/app/shared/enums/marital-status.enum";
import { Occupation } from "src/app/shared/enums/occupation.enum";
import { Customer } from "../models/customer.model";


export const MOCK_CUSTOMERS: Customer[] = [
    new Customer(
        '1',
        'John',
        'Doe',
        undefined, // customerSecondSurname
        undefined, // customerSecondName
        new Date('1980-01-01'),
        Gender.Man,
        Occupation.SoftwareDeveloper,
        MaritalStatus.Single,
        '123-456-7890',
        '234-567-8901',
        0,
        'john.doe@example.com',
        Occupation.SoftwareDeveloper, // spouseOccupation
        new Date(), // spouseBirthDate
        false, // isBuyerCustomer
        false, // isSellerCustomer
        false, // isTenantCustomer
        false, // isRenterCustomer
        '123 Main St',
        'Metropolis',
        'Central',
        '1' 
    ),
    // Diğer müşteri nesneleri...
];
