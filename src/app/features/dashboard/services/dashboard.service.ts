import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_DASHBOARD_SUMMARY } from '../mocks/dashboard-summary.mocks';
import { IDashboardSummary } from '../interfaces/i-dashboard-summary.interface';
import { IRecentSale } from '../interfaces/i-recent-sale.interface';
import { MOCK_RECENT_SALES } from '../mocks/recent-sale-mocks';
import { MOCK_SALES_OVERVIEW } from '../mocks/sales-overview.mocks';
import { ISalesOverview } from '../interfaces/i-sales-overview.interface';
import { INotification } from '../interfaces/i-notification.interface';
import { MOCK_NOTIFICATIONS } from '../mocks/notification.mocks';
import { ISpecialEvent } from '../interfaces/i-special-event.interface';
import { MOCK_SPECIAL_EVENTS } from '../mocks/social-events.mocks';
import { MOCK_POPULAR_LISTINGS } from '../../pages/mocks/popular-listings.mock';


@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    getDashboardSummary(): Observable<IDashboardSummary> {
        return of(MOCK_DASHBOARD_SUMMARY);
    }

    getRecentSales(): Observable<IRecentSale[]> {
        return of(MOCK_RECENT_SALES);
    }

    getSalesOverview(): Observable<ISalesOverview> {
        return of(MOCK_SALES_OVERVIEW);
    }

    getNotifications(): Observable<INotification[]> {
        return of(MOCK_NOTIFICATIONS);
    }

    getSpecialEvents(): Observable<ISpecialEvent[]> {
        return of(MOCK_SPECIAL_EVENTS);
    }

    getPopularListings(): Observable<any[]> {
        return of(MOCK_POPULAR_LISTINGS);
    }

}
