export const metrics = {
    calculateViews(investment) {
        const viewsPerCurrency = investment * 30;
        const clicks = Math.floor(viewsPerCurrency * 0.12);
        const shares = Math.floor(clicks * 0.15);
        const additionalViews = shares * 40;
        return {
            viewsPerCurrency,
            clicks,
            shares,
            additionalViews,
            totalViewed: viewsPerCurrency + additionalViews
        };
    }
};

export class MetricsCalculator {
    static getCampaignStatus(campaign) {
        const today = new Date();
        const end = new Date(campaign.endDate);
        return end >= today ? 'Active' : 'Finished';
    }

    static generateFullReport(campaign) {
        const perf = metrics.calculateViews(campaign.investment);
        const roi = ((perf.totalViewed / campaign.investment) * 100).toFixed(2);
        return {
            status: this.getCampaignStatus(campaign),
            performance: {
                roi,
                ctr: 12,
                cpc: 1.5,
                efficiency: 80
            },
            recommendations: ['Invest more in high-performing campaigns.']
        };
    }
}

export class AggregateMetricsCalculator {
    static calculateTotalMetrics(campaigns) {
        const totalInvestment = campaigns.reduce((sum, c) => sum + parseFloat(c.investment), 0);
        const totalViews = campaigns.reduce((sum, c) => sum + metrics.calculateViews(c.investment).totalViewed, 0);
        const averageROI = campaigns.length ? ((totalViews / totalInvestment) * 100).toFixed(2) : 0;
        return {
            totalCampaigns: campaigns.length,
            totalInvestment,
            totalViews,
            averageROI
        };
    }
}