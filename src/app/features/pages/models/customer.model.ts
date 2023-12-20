import { Gender } from "src/app/shared/enums/gender.enum";
import { MaritalStatus } from "src/app/shared/enums/marital-status.enum";
import { Occupation } from "src/app/shared/enums/occupation.enum";


export class Customer {
    constructor(
        public id: string = '',
        public customerName: string = '',
        public customerSurname: string = '',
        public customerSecondSurname: string = '',
        public customerSecondName: string = '',
        public birthDate: Date = new Date(),
        public gender: Gender = Gender.Man, // Varsayılan bir değer atanmalı
        public occupation: Occupation = Occupation.SoftwareDeveloper, // Varsayılan bir değer atanmalı
        public maritalStatus: MaritalStatus = MaritalStatus.Single, // Varsayılan bir değer atanmalı
        public homePhone: string = '',
        public mobilePhone: string = '',
        public numberOfChildren: number = 0,
        public email: string = '',
        public spouseOccupation: Occupation = Occupation.SoftwareDeveloper,
        public spouseBirthDate: Date = new Date(),
        public isBuyerCustomer: boolean = false,
        public isSellerCustomer: boolean = false,
        public isTenantCustomer: boolean = false,
        public isRenterCustomer: boolean = false,
        public address: string = '',
        public city: string = '',
        public district: string = '',
        public estateAgentId: string = '',
    ) {}
}
