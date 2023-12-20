import { ISalesOverview } from "../interfaces/i-sales-overview.interface";


export const MOCK_SALES_OVERVIEW: ISalesOverview = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    datasets: [
        {
            label: 'Satışlar',
            data: [2000000, 3000000, 2500000, 4500000, 4500000, 500000, 15000000, 25000000, 50000000, 15000000, 150000000, 250000000], // Örnek satış verileri
        },
        {
            label: 'Kiralamalar',
            data: [10000, 15000, 12500, 225000, 225000, 25000, 750000, 125000, 2500000, 750000, 75000000, 1250000], // Örnek kiralama verileri
        },
    ],
};
