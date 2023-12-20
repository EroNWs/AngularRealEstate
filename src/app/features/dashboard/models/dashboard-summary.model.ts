
export class DashboardSummaryModel {
    constructor(
        public activeListings: number,
        public totalSalesValue: number,
        public customerCount: number,
        public unreadFeedbacks: number,
        public newFeedbacks: number
    ) {}
}
