class Campaign {
    constructor(name, client, startDate, endDate, investment) {
        this.name = name;
        this.client = client;
        this.startDate = startDate;
        this.endDate = endDate;
        this.investment = parseFloat(investment);
        this.id = Date.now() + Math.random();
    }

    calculateViews() {
        // Original algorithm from your Portuguese code
        const peoplePerCurrency = this.investment * 30;
        const clicks = peoplePerCurrency * 0.12;
        const shares = clicks * (3 / 20);
        const additionalViews = shares * 40;
        const totalViewed = peoplePerCurrency + additionalViews;
        
        return {
            viewsPerCurrency: Math.round(peoplePerCurrency),
            clicks: Math.round(clicks),
            shares: Math.round(shares),
            additionalViews: Math.round(additionalViews),
            totalViewed: Math.round(totalViewed)
        };
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            client: this.client,
            startDate: this.startDate,
            endDate: this.endDate,
            investment: this.investment
        };
    }
}

// Campaign Manager (based on your original code)
class CampaignManager {
    constructor() {
        this.campaigns = [];
        this.loadFromStorage();
    }

    addCampaign(name, client, startDate, endDate, investment) {
        // Validate data before creating campaign
        const errors = validateCampaignData(name, client, startDate, endDate, investment);
        
        if (errors.length > 0) {
            throw new Error(`Validation errors: ${errors.join(', ')}`);
        }
        
        const campaign = new Campaign(name, client, startDate, endDate, investment);
        this.campaigns.push(campaign);
        this.saveToStorage();
        return campaign;
    }

    removeCampaign(id) {
        this.campaigns = this.campaigns.filter(camp => camp.id !== id);
        this.saveToStorage();
    }

    findCampaign(id) {
        return this.campaigns.find(camp => camp.id === id);
    }

    listCampaigns() {
        return this.campaigns;
    }

    getTotalInvestment() {
        return this.campaigns.reduce((total, camp) => total + camp.investment, 0);
    }

    getTotalViews() {
        return this.campaigns.reduce((total, camp) => {
            const calc = camp.calculateViews();
            return total + calc.totalViewed;
        }, 0);
    }

    saveToStorage() {
        return DataManager.saveCampaigns(this.campaigns);
    }

    loadFromStorage() {
        const data = DataManager.loadCampaigns();
        this.campaigns = data.map(campaignData => {
            const campaign = new Campaign(
                campaignData.name,
                campaignData.client, 
                campaignData.startDate,
                campaignData.endDate,
                campaignData.investment
            );
            campaign.id = campaignData.id;
            return campaign;
        });
    }
}

// Validation function (translated from your original)
function validateCampaignData(name, client, startDate, endDate, investment) {
    const campaignData = {
        name: name,
        client: client,
        startDate: startDate,
        endDate: endDate,
        investment: parseFloat(investment)
    };
    
    return validateCampaign(campaignData);
}

function validateCampaign(campaign) {
    const errors = [];
    
    if (!campaign.name || campaign.name.trim() === '') {
        errors.push('Campaign name is required');
    }
    
    if (!campaign.client || campaign.client.trim() === '') {
        errors.push('Client name is required');
    }
    
    if (!campaign.startDate) {
        errors.push('Start date is required');
    }
    
    if (!campaign.endDate) {
        errors.push('End date is required');
    }
    
    if (campaign.startDate && campaign.endDate) {
        const start = new Date(campaign.startDate);
        const end = new Date(campaign.endDate);
        
        if (start >= end) {
            errors.push('End date must be after start date');
        }
    }
    
    if (!campaign.investment || campaign.investment <= 0) {
        errors.push('Investment must be greater than zero');
    }
    
    if (campaign.investment > 1000000) {
        errors.push('Investment cannot exceed $1,000,000.00');
    }
    
    return errors;
}

// Global instance
const campaignManager = new CampaignManager();