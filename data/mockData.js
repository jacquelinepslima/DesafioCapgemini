import { campaignManager } from '../js/utils.js';

export function populateMockData() {
    const existing = campaignManager.listCampaigns();
    if (existing.length > 0) return;

    const mockCampaigns = [
        { name: 'Summer Sale', client: 'Brand A', startDate: '2025-08-01', endDate: '2025-08-31', investment: 1000 },
        { name: 'Winter Promo', client: 'Brand B', startDate: '2025-12-01', endDate: '2025-12-31', investment: 500 }
    ];

    mockCampaigns.forEach(c => campaignManager.addCampaign(c.name, c.client, c.startDate, c.endDate, c.investment));
}