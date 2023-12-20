import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRealEstate } from '../interfaces/i-real-estate.interface';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints.constants';

@Injectable({
    providedIn: 'root',
})
export class RealEstateService {
    constructor(private http: HttpClient) {}

    getCustomers(): Observable<IRealEstate[]> {
        return this.http.get<IRealEstate[]>(API_ENDPOINTS.REAL_ESTATES);
    }

    private baseUrl = 'http://localhost:3000/';

    getRealEstates(): Observable<any> {
        return this.http.get(`${this.baseUrl}/${API_ENDPOINTS.REAL_ESTATES}`);
    }

    createRealEstate(realEstateData: any): Observable<any> {
        return this.http.post(
            `${this.baseUrl}/${API_ENDPOINTS.REAL_ESTATES}`,
            realEstateData
        );
    }
}
