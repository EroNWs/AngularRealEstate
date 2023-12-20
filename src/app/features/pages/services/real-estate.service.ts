import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    RealEstate,
    RealEstatePropertyForBuilding,
    RealEstatePropertyForLand,
} from '../models/real-estate.model';
import { MOCK_REAL_ESTATES } from '../mocks/real-estate.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RealEstateService {

    constructor(private http: HttpClient) {}

    getBuildings(): Observable<RealEstatePropertyForBuilding[]> {
        const buildings = MOCK_REAL_ESTATES.filter(estate => estate instanceof RealEstatePropertyForBuilding);
        return of(buildings as RealEstatePropertyForBuilding[]);
    }

    getBuildingById(id: string): Observable<RealEstatePropertyForBuilding | undefined> {
        const building = MOCK_REAL_ESTATES.find((realEstate) => realEstate.id === id && realEstate instanceof RealEstatePropertyForBuilding);
        return of(building as RealEstatePropertyForBuilding | undefined);
    }

    addBuilding(building: RealEstatePropertyForBuilding): Observable<RealEstatePropertyForBuilding> {
        MOCK_REAL_ESTATES.push(building);
        return of(building);
    }

    updateBuilding(building: RealEstatePropertyForBuilding): Observable<RealEstatePropertyForBuilding> {
        const index = MOCK_REAL_ESTATES.findIndex((re) => re.id === building.id);
        if (index > -1) {
            MOCK_REAL_ESTATES[index] = building;
        }
        return of(building);
    }

    deleteBuilding(id: string): Observable<void> {
        const index = MOCK_REAL_ESTATES.findIndex((re) => re.id === id);
        if (index > -1) {
            MOCK_REAL_ESTATES.splice(index, 1);
        }
        return of(undefined);
    }


  saveSale(realEstate: RealEstatePropertyForBuilding): Observable<any> {
    // API'ye POST isteği gönderme
    return this.http.post('/api/sales', realEstate);
  }

  saveRental(realEstate: RealEstatePropertyForBuilding): Observable<any> {
    // API'ye POST isteği gönderme
    return this.http.post('/api/rentals', realEstate);
  }




}
