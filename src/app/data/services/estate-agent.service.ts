import { Injectable } from '@angular/core';
import { IEstateAgent } from '../interfaces/i-estate-agent.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints.constants';

@Injectable({
    providedIn: 'root',
})
export class EstateAgentService {
    constructor(private http: HttpClient) {}

    getCustomers(): Observable<IEstateAgent[]> {
        return this.http.get<IEstateAgent[]>(API_ENDPOINTS.ESTATE_AGENTS);
    }
}
