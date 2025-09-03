// Example data for demonstration

const mockCampaigns = [
    {
        id: 1,
        name: "Black Friday Campaign 2024",
        client: "E-commerce TechStore",
        startDate: "2024-11-20",
        endDate: "2024-11-30",
        investment: 5000.00
    },
    {
        id: 2,
        name: "New Product Launch",
        client: "Startup Innovation",
        startDate: "2024-12-01",
        endDate: "2024-12-15",
        investment: 3000.00
    },
    {
        id: 3,
        name: "Summer Promotion",
        client: "Fashion Clothing Store",
        startDate: "2024-12-20",
        endDate: "2025-02-28",
        investment: 8000.00
    },
    {
        id: 4,
        name: "Loyalty Campaign",
        client: "Sabor Restaurant",
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        investment: 2500.00
    },
    {
        id: 5,
        name: "Digital Marketing B2B",
        client: "Consulting Company",
        startDate: "2024-12-01",
        endDate: "2025-01-31",
        investment: 12000.00
    }
];

// Example metrics data
const mockMetrics = {
    totalInvestment: 30500.00,
    totalCampaigns: 5,
    averageInvestment: 6100.00,
    totalViews: 915000,
    conversionRate: 0.12,
    shareRate: 0.15
};

// Example report data
const mockReports = {
    campaignsPerClient: {
        "E-commerce TechStore": 1,
        "Startup Innovation": 1,
        "Fashion Clothing Store": 1,
        "Sabor Restaurant": 1,
        "Consulting Company": 1
    },

    investmentPerMonth: {
        "November 2024": 10500.00,
        "December 2024": 23000.00,
        "January 2025": 8000.00,
        "February 2025": 8000.00
    },

    performancePerCampaign: [
        {
            name: "Black Friday Campaign 2024",
            investment: 5000.00,
            views: 150000,
            clicks: 18000,
            shares: 2700,
            roi: 30.0
        },
        {
            name: "New Product Launch",
            investment: 3000.00,
            views: 90000,
            clicks: 10800,
            shares: 1620,
            roi: 30.0
        },
        {
            name: "Summer Promotion",
            investment: 8000.00,
            views: 240000,
            clicks: 28800,
            shares: 4320,
            roi: 30.0
        },
        {
            name: "Loyalty Campaign",
            investment: 2500.00,
            views: 75000,
            clicks: 9000,
            shares: 1350,
            roi: 30.0
        },
        {
            name: "Digital Marketing B2B",
            investment: 12000.00,
            views: 360000,
            clicks: 43200,
            shares: 6480,
            roi: 30.0
        }
    ]
};

// Function to load initial mock data
function populateMockData() {
    if (!DataManager.loadCampaigns().length) {
        DataManager.saveCampaigns(mockCampaigns);
        console.log('Example data loaded successfully!');
    }
}

// Function to clear mock data
function clearMockData() {
    DataManager.removeData('campaigns');
    console.log('Example data removed!');
}

// Function to reset mock data
function resetMockData() {
    clearMockData();
    populateMockData();
    console.log('Example data reset!');
}

// Function to check storage info
function getStorageInfo() {
    return DataManager.getStorageInfo();
}

// Function to clear all data
function clearAllData() {
    return DataManager.clearAllData();
}