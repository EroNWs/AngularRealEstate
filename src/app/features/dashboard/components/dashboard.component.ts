import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IDashboardSummary } from '../interfaces/i-dashboard-summary.interface';
import { DashboardService } from '../services/dashboard.service';
import { IRecentSale } from '../interfaces/i-recent-sale.interface';
import { ISalesOverview } from '../interfaces/i-sales-overview.interface';
import { INotification } from '../interfaces/i-notification.interface';
import { ISpecialEvent } from '../interfaces/i-special-event.interface';
import { MOCK_SALES_OVERVIEW } from '../mocks/sales-overview.mocks';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    dashboardSummary$!: Observable<IDashboardSummary>;
    recentSales$!: Observable<IRecentSale[]>;
    salesOverview$!: Observable<ISalesOverview>;
    notifications$!: Observable<INotification[]>;
    specialEvents$!: Observable<ISpecialEvent[]>;
    private subscription!: Subscription;
    dashboardData!: IDashboardSummary;
    chartData: any;
    chartOptions: any;
    popularListings$!: Observable<any[]>;

    constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef ) {}

    ngOnInit(): void {
        this.dashboardSummary$ = this.dashboardService.getDashboardSummary();
        this.recentSales$ = this.dashboardService.getRecentSales();
        this.salesOverview$ = this.dashboardService.getSalesOverview();
        this.notifications$ = this.dashboardService.getNotifications();
        this.specialEvents$ = this.dashboardService.getSpecialEvents();
        this.loadDashboardData();
        this.initChart();
        this.popularListings$ = this.dashboardService.getPopularListings();
    }

    loadDashboardData() {
        this.subscription = this.dashboardService
            .getDashboardSummary()
            .subscribe((data) => {
                this.dashboardData = data;
            });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        const salesOverviewData = MOCK_SALES_OVERVIEW;

        this.chartData = {
            labels: salesOverviewData.labels,
            datasets: [
                {
                    label: 'Satışlar',
                    data: salesOverviewData.datasets[0].data,
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)', // Mavi renk
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    tension: 0.4,
                },
                {
                    data: salesOverviewData.datasets[1].data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)', // Yeşil renk
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    tension: 0.4,
                },
            ],
        };

        this.cdr.detectChanges();

        this.chartOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
