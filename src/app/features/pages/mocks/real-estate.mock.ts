import { HeatingSystemType } from 'src/app/shared/enums/heating-system-type.enum';
import { RealEstateType } from 'src/app/shared/enums/real-estate-type.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import { ZoningStatus } from 'src/app/shared/enums/zoning-status.enum';
import {
    RealEstatePropertyForBuilding,
    RealEstatePropertyForLand,
} from '../models/real-estate.model';

export const MOCK_REAL_ESTATES: RealEstatePropertyForBuilding[] = [
    new RealEstatePropertyForBuilding(
        '1',
        RealEstateType.Building,
        Status.ForSale,
        120,
        '789 Oak St',
        'Star City',
        'East',
        4,
        2,
        5,
        10,
        HeatingSystemType.NaturalGasOperated,
        'Ahmet Yılmaz', // Satıcı adı
        'Mehmet Öz'    // Alıcı adı
    ),
    // Diğer örnek kayıtlar...
];

