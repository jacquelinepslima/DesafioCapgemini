// Metrics Calculator for Advertisement Campaigns
class MetricsCalculator {
    // Default configuration (customize as needed)
    static config = {
        conversionRate: 0.05,         // 5% conversion rate
        averageOrderValue: 150.00,    // $150 average order value
    };

    // Helper for rounding numbers
    static round(value, decimals = 2) {
        return Number.isFinite(value)
            ? Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
            : 0;
    }

    // Calculate ROI (Return on Investment)
    static calculateROI(campaign) {
        if (!campaign.investment || campaign.investment <= 0) return 0;
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        const clicks = metrics.clicks ?? 0;
        const { conversionRate, averageOrderValue } = MetricsCalculator.config;
        const revenue = clicks * conversionRate * averageOrderValue;
        const roi = ((revenue - campaign.investment) / campaign.investment) * 100;
        return MetricsCalculator.round(roi);
    }

    // Calculate CTR (Click Through Rate)
    static calculateCTR(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        const views = metrics.viewsPerCurrency ?? 0;
        const clicks = metrics.clicks ?? 0;
        if (views <= 0) return 0;
        return MetricsCalculator.round((clicks / views) * 100);
    }

    // Calculate CPC (Cost Per Click)
    static calculateCPC(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        const clicks = metrics.clicks ?? 0;
        if (clicks <= 0) return 0;
        return MetricsCalculator.round(campaign.investment / clicks);
    }

    // Calculate CPM (Cost Per Mille)
    static calculateCPM(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        const views = metrics.viewsPerCurrency ?? 0;
        if (views <= 0) return 0;
        return MetricsCalculator.round((campaign.investment / views) * 1000);
    }

    // Calculate Share Rate
    static calculateShareRate(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        const clicks = metrics.clicks ?? 0;
        const shares = metrics.shares ?? 0;
        if (clicks <= 0) return 0;
        return MetricsCalculator.round((shares / clicks) * 100);
    }

    // Calculate Total Reach
    static calculateTotalReach(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        return (metrics.viewsPerCurrency ?? 0) + (metrics.additionalViews ?? 0);
    }

    // Calculate Campaign Efficiency (score 0-100)
    static calculateCampaignEfficiency(campaign) {
        let score = 0;
        const roi = this.calculateROI(campaign);
        if (roi > 0) score += 30;
        else if (roi > -50) score += 15;

        const ctr = this.calculateCTR(campaign);
        if (ctr > 2) score += 25;
        else if (ctr > 1) score += 15;
        else if (ctr > 0.5) score += 10;

        const shareRate = this.calculateShareRate(campaign);
        if (shareRate > 15) score += 25;
        else if (shareRate > 10) score += 15;
        else if (shareRate > 5) score += 10;

        if (campaign.investment >= 1000 && campaign.investment <= 10000) score += 20;
        else if (campaign.investment >= 500 && campaign.investment <= 5000) score += 15;
        else score += 10;

        return Math.min(score, 100);
    }

    // Generate Full Metrics Report
    static generateFullReport(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        return {
            id: campaign.id,
            name: campaign.name,
            client: campaign.client,
            period: {
                start: campaign.startDate,
                end: campaign.endDate
            },
            investment: campaign.investment,
            metrics: {
                views: metrics.viewsPerCurrency ?? 0,
                clicks: metrics.clicks ?? 0,
                shares: metrics.shares ?? 0,
                additionalViews: metrics.additionalViews ?? 0,
                totalReach: this.calculateTotalReach(campaign)
            },
            performance: {
                roi: this.calculateROI(campaign),
                ctr: this.calculateCTR(campaign),
                cpc: this.calculateCPC(campaign),
                cpm: this.calculateCPM(campaign),
                shareRate: this.calculateShareRate(campaign),
                efficiency: this.calculateCampaignEfficiency(campaign)
            },
            status: this.getCampaignStatus(campaign),
            recommendations: this.generateRecommendations(campaign)
        };
    }

    // Determine Campaign Status
    static getCampaignStatus(campaign) {
        const today = new Date();
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);

        // Normalize times for reliable comparison
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        today.setHours(0, 0, 0, 0);

        if (today < startDate) return 'Scheduled';
        if (today >= startDate && today <= endDate) return 'Active';
        return 'Finished';
    }

    // Recommendations based on Metrics
    static generateRecommendations(campaign) {
        const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
        const ctr = this.calculateCTR(campaign);
        const roi = this.calculateROI(campaign);
        const recommendations = [];

        if (ctr < 1) recommendations.push('Consider optimizing the ad title and description to improve CTR.');
        if (roi < 0) recommendations.push('Evaluate your target audience and adjust investment to improve ROI.');
        if ((metrics.shares ?? 0) < (metrics.clicks ?? 0) * 0.1) recommendations.push('Create more engaging content to increase sharing.');
        if (campaign.investment < 1000) recommendations.push('Consider increasing investment for better reach.');
        if (recommendations.length === 0) recommendations.push('Campaign is performing well! Maintain your current strategy.');

        return recommendations;
    }
}

// --- AGGREGATE METRICS ---

class AggregateMetricsCalculator {
    // Calculate totals for all campaigns
    static calculateTotalMetrics(campaigns) {
        if (!Array.isArray(campaigns) || campaigns.length === 0) {
            return {
                totalCampaigns: 0,
                totalInvestment: 0,
                totalViews: 0,
                totalClicks: 0,
                totalShares: 0,
                averageROI: 0,
                averageCTR: 0,
                activeCampaigns: 0,
                finishedCampaigns: 0
            };
        }

        let totalInvestment = 0, totalViews = 0, totalClicks = 0, totalShares = 0, sumROI = 0, sumCTR = 0, activeCampaigns = 0, finishedCampaigns = 0;

        for (const campaign of campaigns) {
            totalInvestment += campaign.investment;
            totalViews += MetricsCalculator.calculateTotalReach(campaign);
            const metrics = campaign.calculateViews ? campaign.calculateViews() : {};
            totalClicks += metrics.clicks ?? 0;
            totalShares += metrics.shares ?? 0;
            sumROI += MetricsCalculator.calculateROI(campaign);
            sumCTR += MetricsCalculator.calculateCTR(campaign);

            const status = MetricsCalculator.getCampaignStatus(campaign);
            if (status === 'Active') activeCampaigns++;
            if (status === 'Finished') finishedCampaigns++;
        }

        return {
            totalCampaigns: campaigns.length,
            totalInvestment: MetricsCalculator.round(totalInvestment),
            totalViews,
            totalClicks,
            totalShares,
            averageROI: MetricsCalculator.round(sumROI / campaigns.length),
            averageCTR: MetricsCalculator.round(sumCTR / campaigns.length),
            activeCampaigns,
            finishedCampaigns
        };
    }

    // Generate Comparison Report between campaigns
    static generateComparisonReport(campaigns) {
        if (!Array.isArray(campaigns) || campaigns.length === 0) return [];
        return campaigns.slice().map(campaign => {
            const report = MetricsCalculator.generateFullReport(campaign);
            return {
                ...report,
                ranking: this.calculateRanking(campaign, campaigns)
            };
        }).sort((a, b) => b.performance.efficiency - a.performance.efficiency);
    }

    // Calculate campaign ranking among all campaigns
    static calculateRanking(campaign, allCampaigns) {
        const sortedCampaigns = allCampaigns.slice().sort((a, b) => {
            const efficiencyA = MetricsCalculator.calculateCampaignEfficiency(a);
            const efficiencyB = MetricsCalculator.calculateCampaignEfficiency(b);
            return efficiencyB - efficiencyA;
        });
        const index = sortedCampaigns.findIndex(camp => camp.id === campaign.id);
        return index + 1;
    }
}