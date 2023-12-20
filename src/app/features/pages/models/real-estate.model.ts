import { HeatingSystemType } from 'src/app/shared/enums/heating-system-type.enum';
import { RealEstateType } from 'src/app/shared/enums/real-estate-type.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import { TransactionType } from 'src/app/shared/enums/transaction-type.enum';
import { ZoningStatus } from 'src/app/shared/enums/zoning-status.enum';

export class RealEstate {
    constructor(
        public id: string = '',
        public type: RealEstateType = RealEstateType.Building,
        public status: Status = Status.ForSale,
        public squareMeters: number = 0,
        public address: string = '',
        public city: string = '',
        public district: string = '',
        public transactionType: TransactionType = TransactionType.None // Diğer özellikler...
    ) {}
}

export class RealEstatePropertyForBuilding extends RealEstate {
    constructor(
        id: string = '',
        type: RealEstateType = RealEstateType.Building,
        status: Status = Status.ForSale,
        squareMeters: number = 0,
        address: string = '',
        city: string = '',
        district: string = '',
        public roomCount: number = 0,
        public floor: number = 0,
        public buildingFloors: number = 0,
        public buildingAge: number = 0,
        public heatingType: HeatingSystemType = HeatingSystemType.NaturalGasOperated
    ) {
        super(
            id,
            type,
            status,
            squareMeters,
            address,
            city,
            district,
            TransactionType.None
        );
        // Diğer özellikler...
    }
}

export class RealEstatePropertyForLand extends RealEstate {
    constructor(
        id: string = '',
        type: RealEstateType = RealEstateType.Land,
        public zoningStatus: ZoningStatus = ZoningStatus.Residential,
        public block: string = '',
        public parcel: string = '',
        public buildingCoverageRatio: number = 0.0,
        public floorAreaRatio: number = 0.0
    ) {
        super(id, type, Status.ForSale, 0, '', '', '', TransactionType.None);
        // Diğer özellikler...
    }
}
