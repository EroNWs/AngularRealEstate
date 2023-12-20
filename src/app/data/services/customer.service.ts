import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/i-customer.interface';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints.constants';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    getCustomers(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(API_ENDPOINTS.CUSTOMERS);
    }
}
