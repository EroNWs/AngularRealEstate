import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MOCK_CUSTOMERS } from '../mocks/customer.mock';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  getCustomers(): Observable<Customer[]> {
    return of(MOCK_CUSTOMERS);
  }

  getCustomerById(id: string): Observable<Customer | undefined> {
    return of(MOCK_CUSTOMERS.find(customer => customer.id === id));
  }

  deleteCustomer(id: string): Observable<void> {
    // Bu örnekte, gerçek bir HTTP silme işlemi yapılmıyor. Sadece MOCK_CUSTOMERS dizisinden silme işlemi simüle ediliyor.
    const index = MOCK_CUSTOMERS.findIndex(customer => customer.id === id);
    if (index > -1) {
      MOCK_CUSTOMERS.splice(index, 1);
    }
    return of(undefined);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    // Gerçek bir HTTP isteği yerine, yeni müşteriyi MOCK_CUSTOMERS dizisine ekleyin.
    MOCK_CUSTOMERS.push(customer);
    return of(customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    // Gerçek bir HTTP isteği yerine, mevcut müşteriyi MOCK_CUSTOMERS dizisinde güncelleyin.
    const index = MOCK_CUSTOMERS.findIndex(cust => cust.id === customer.id);
    if (index > -1) {
      MOCK_CUSTOMERS[index] = customer;
    }
    return of(customer);
  }

 

}
