// Advertisement Campaign Management System
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application started successfully!');

    // Initialize example/mock data
    populateMockData();

    // Configure event listeners
    setupEventListeners();

    // Load campaigns from storage
    loadCampaigns();

    // Update dashboard
    updateDashboard();

    // Perform automatic backup
    automaticBackup();

    // Clean old backups
    cleanOldBackups();

    // Display storage info
    const storageInfo = DataManager.getStorageInfo();
    if (storageInfo) {
        console.log('Storage Information:', storageInfo);
    }
});

// Event listeners configuration
function setupEventListeners() {
    // Campaign registration form
    const registrationForm = document.querySelector('form[action="script.js"]');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmit);
        setupRealTimeValidation(registrationForm);
    }

    // Investment calculation form
    const investmentForm = document.querySelector('form[action="#"]');
    if (investmentForm) {
        const investmentBtn = investmentForm.querySelector('input[onclick="chamada()"]');
        if (investmentBtn) {
            investmentBtn.addEventListener('click', handleInvestmentSubmit);
        }
    }

    // Advertisement quantity button
    const qtyBtn = document.querySelector('input[onclick="render()"]');
    if (qtyBtn) {
        qtyBtn.addEventListener('click', handleQuantitySubmit);
    }

    // Campaign search field
    const searchField = document.getElementById('searchCampaigns');
    if (searchField) {
        searchField.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                searchCampaigns(searchField.value);
            }
        });
    }
}

// Real-time validation for form fields
function setupRealTimeValidation(form) {
    const fields = {
        'adName': { type: 'text', required: true, minLength: 2 },
        'startDate': { type: 'date', required: true },
        'endDate': { type: 'date', required: true },
        'investment': { type: 'number', required: true, min: 0.01, max: 1000000 }
    };

    Object.keys(fields).forEach(fieldId => {
        const field = form.querySelector(`#${fieldId}`);
        if (field) {
            field.addEventListener('blur', () => validateField(field, fields[fieldId]));
            field.addEventListener('input', () => clearFieldError(field));
        }
    });
}

// Individual field validation
function validateField(field, rules) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Minimum of ${rules.minLength} characters`;
    }

    if (rules.min !== undefined && parseFloat(value) < rules.min) {
        isValid = false;
        errorMessage = `Minimum value: ${rules.min}`;
    }

    if (rules.max !== undefined && parseFloat(value) > rules.max) {
        isValid = false;
        errorMessage = `Maximum value: ${rules.max}`;
    }

    if (rules.type === 'date' && value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            isValid = false;
            errorMessage = 'Invalid date';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error-field');
    field.classList.remove('success-field');

    let errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }

    errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function showFieldSuccess(field) {
    field.classList.remove('error-field');
    field.classList.add('success-field');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearFieldError(field) {
    field.classList.remove('error-field', 'success-field');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Campaign registration form handler
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('adName');
    const client = formData.get('clientName');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const investment = formData.get('investment');

    clearMessages();

    try {
        const campaign = campaignManager.addCampaign(name, client, startDate, endDate, investment);
        domUtils.showMessage('exporAnuncio', `Campaign "${name}" registered successfully!`, 'success');
        event.target.reset();
        loadCampaigns();
        updateDashboard();
        automaticBackup();
    } catch (error) {
        console.error('Error registering campaign:', error);
        if (error.message.includes('Validation errors:')) {
            const errorMessage = error.message.replace('Validation errors: ', '');
            domUtils.showMessage('exporAnuncio', `Validation errors: ${errorMessage}`, 'error');
        } else {
            domUtils.showMessage('exporAnuncio', 'Error registering campaign. Please try again.', 'error');
        }
    }
}

// Investment form handler
function handleInvestmentSubmit(event) {
    event.preventDefault();
    const investment = document.getElementById('promotionInvestment').value;

    if (!validators.isValidNumber(investment)) {
        domUtils.showMessage('enteredValue', 'Please enter a valid investment value.', 'error');
        return;
    }

    const metricsData = metrics.calculateViews(parseFloat(investment));
    const message = `
        <strong>Investment Result:</strong><br>
        • People who saw the ad: ${formatters.formatNumber(metricsData.viewsPerCurrency)}<br>
        • People who clicked: ${formatters.formatNumber(metricsData.clicks)}<br>
        • People who shared: ${formatters.formatNumber(metricsData.shares)}<br>
        • Additional views: ${formatters.formatNumber(metricsData.additionalViews)}<br>
        • <strong>Total views: ${formatters.formatNumber(metricsData.totalViewed)}</strong>
    `;

    domUtils.showMessage('enteredValue', message, 'success');
}

// Advertisement quantity handler
function handleQuantitySubmit(event) {
    event.preventDefault();
    const quantity = document.getElementById('numAds').value;

    if (!validators.isValidNumber(quantity)) {
        domUtils.showMessage('exporAnuncio', 'Please enter a valid quantity.', 'error');
        return;
    }

    const qty = parseInt(quantity);
    if (qty > 10) {
        domUtils.showMessage('exporAnuncio', 'Maximum of 10 advertisements at once.', 'warning');
        return;
    }

    domUtils.showMessage('exporAnuncio', `Form configured for ${qty} advertisement(s).`, 'info');
}

// Load campaigns from storage
function loadCampaigns() {
    const campaigns = campaignManager.listCampaigns();
    console.log('Campaigns loaded:', campaigns);
}

// Update dashboard with all metrics and campaign lists
function updateDashboard() {
    const campaigns = campaignManager.listCampaigns();
    const aggregatedMetrics = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);

    document.getElementById('totalCampaigns').textContent = aggregatedMetrics.totalCampaigns;
    document.getElementById('totalInvested').textContent = formatters.formatCurrency(aggregatedMetrics.totalInvestment);
    document.getElementById('totalViews').textContent = formatters.formatNumber(aggregatedMetrics.totalViews);
    document.getElementById('averageROI').textContent = `${aggregatedMetrics.averageROI}%`;

    updateCampaignList();
    console.log('Dashboard updated:', aggregatedMetrics);
}

// Update campaign list display
function updateCampaignList() {
    const campaigns = campaignManager.listCampaigns();
    const activeCampaigns = campaigns.filter(camp => MetricsCalculator.getCampaignStatus(camp) === 'Active');
    const finishedCampaigns = campaigns.filter(camp => MetricsCalculator.getCampaignStatus(camp) === 'Finished');

    const activeContainer = document.getElementById('activeCampaigns');
    activeContainer.innerHTML = activeCampaigns.length > 0
        ? activeCampaigns.map(createCampaignCard).join('')
        : '<p class="empty-message">No active campaigns</p>';

    const finishedContainer = document.getElementById('finishedCampaigns');
    finishedContainer.innerHTML = finishedCampaigns.length > 0
        ? finishedCampaigns.map(createCampaignCard).join('')
        : '<p class="empty-message">No finished campaigns</p>';
}

// Create campaign card HTML
function createCampaignCard(campaign) {
    const report = MetricsCalculator.generateFullReport(campaign);
    return `
        <div class="campaign-item">
            <div class="campaign-header">
                <div class="campaign-name">${campaign.name}</div>
                <span class="campaign-status status-${report.status.toLowerCase()}">${report.status}</span>
            </div>
            <div class="campaign-details">
                Client: ${campaign.client} |
                Period: ${formatters.formatDate(campaign.startDate)} - ${formatters.formatDate(campaign.endDate)}
            </div>
            <div class="campaign-metrics">
                <div class="metric-item"><span>ROI</span> ${report.performance.roi}%</div>
                <div class="metric-item"><span>CTR</span> ${report.performance.ctr}%</div>
                <div class="metric-item"><span>CPC</span> $${report.performance.cpc}</div>
                <div class="metric-item"><span>Efficiency</span> ${report.performance.efficiency}/100</div>
            </div>
            <div class="campaign-recommendation">
                <strong>Recommendation:</strong> ${report.recommendations[0]}
            </div>
        </div>
    `;
}

// Clear messages from the UI
function clearMessages() {
    const elements = ['exporAnuncio', 'enteredValue'];
    elements.forEach(id => domUtils.clearMessage(id));
}

// Export campaign data as JSON
function exportData() {
    const campaigns = campaignManager.listCampaigns();
    const data = {
        campaigns,
        totalInvested: campaignManager.getTotalInvestment(),
        totalViews: campaignManager.getTotalViews(),
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaigns_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Import campaign data from JSON file
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.campaigns && Array.isArray(data.campaigns)) {
                DataManager.removeData('campaigns');
                DataManager.saveCampaigns(data.campaigns);
                location.reload();
                domUtils.showMessage('exporAnuncio', 'Data imported successfully!', 'success');
            } else {
                domUtils.showMessage('exporAnuncio', 'Invalid file. Expected JSON with campaigns array.', 'error');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            domUtils.showMessage('exporAnuncio', 'Error processing file. Check the format.', 'error');
        }
    };
    reader.readAsText(file);
}

// Automatic backup of campaigns
function automaticBackup() {
    const campaigns = campaignManager.listCampaigns();
    const backup = {
        campaigns,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    DataManager.saveData('backup_' + Date.now(), backup);
    console.log('Automatic backup completed successfully!');
}

// Clean old backups, keep only 5 most recent
function cleanOldBackups() {
    const info = DataManager.getStorageInfo();
    if (info && info.keys) {
        const backups = info.keys.filter(key => key.startsWith('backup_'));
        if (backups.length > 5) {
            const sorted = backups.sort().reverse();
            const toRemove = sorted.slice(5);
            toRemove.forEach(key => DataManager.removeData(key));
            console.log(`${toRemove.length} old backups removed.`);
        }
    }
}

// Search campaigns by term
function searchCampaigns(term) {
    const campaigns = campaignManager.listCampaigns();
    const found = campaigns.filter(camp =>
        camp.name.toLowerCase().includes(term.toLowerCase()) ||
        camp.client.toLowerCase().includes(term.toLowerCase())
    );

    if (found.length > 0) {
        updateDashboardWithResults(found);
    } else {
        domUtils.showMessage('exporAnuncio', 'No campaigns found with the specified term.', 'info');
    }
}

// Update dashboard with search results
function updateDashboardWithResults(campaigns) {
    const aggregatedMetrics = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);

    document.getElementById('totalCampaigns').textContent = aggregatedMetrics.totalCampaigns;
    document.getElementById('totalInvested').textContent = formatters.formatCurrency(aggregatedMetrics.totalInvestment);
    document.getElementById('totalViews').textContent = formatters.formatNumber(aggregatedMetrics.totalViews);
    document.getElementById('averageROI').textContent = `${aggregatedMetrics.averageROI}%`;

    updateCampaignList();
    domUtils.showMessage('exporAnuncio', `${campaigns.length} campaign(s) found.`, 'success');
}