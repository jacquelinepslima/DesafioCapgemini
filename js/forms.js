import { campaignManager, validators, domUtils, formatters } from './utils.js';
import { updateDashboard, searchCampaigns } from './dashboard.js';
import { metrics } from './metrics.js';
import { exportData, importData } from './storage.js';
import { validateField, setupRealTimeValidation } from './validation.js';

export function setupFormHandlers() {
    const registrationForm = document.getElementById('registrationForm');
    const investmentForm = document.getElementById('investmentForm');
    const searchField = document.getElementById('searchCampaigns');
    const calculateBtn = document.getElementById('calculateInvestment');

    // Registro de campanha
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
        setupRealTimeValidation(registrationForm);
    }

    // Cálculo de investimento
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleInvestmentSubmit);
    }

    // Pesquisa de campanhas
    if (searchField) {
        searchField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCampaigns(searchField.value);
            }
        });
    }

    // Export e import
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportData);

    const importInput = document.getElementById('importDataInput');
    if (importInput) importInput.addEventListener('change', importData);
}

// Handler do submit do formulário de campanha
function handleRegistrationSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const numAds = parseInt(form.numAds.value);
    if (!validators.isValidNumber(numAds) || numAds <= 0) {
        domUtils.showMessage('campaignOutput', 'Enter a valid number of advertisements.', 'error');
        return;
    }
    if (numAds > 10) {
        domUtils.showMessage('campaignOutput', 'Maximum of 10 advertisements allowed.', 'warning');
        return;
    }

    const name = form.adName.value;
    const client = form.clientName.value;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    const investment = form.investment.value;

    try {
        campaignManager.addCampaign(name, client, startDate, endDate, investment);
        domUtils.showMessage('campaignOutput', `Campaign "${name}" registered successfully!`, 'success');
        form.reset();
        updateDashboard();
    } catch (err) {
        domUtils.showMessage('campaignOutput', err.message, 'error');
    }
}

function handleInvestmentSubmit() {
    const value = document.getElementById('promotionInvestment').value;
    if (!validators.isValidNumber(value)) {
        domUtils.showMessage('investmentOutput', 'Please enter a valid investment value.', 'error');
        return;
    }
    const data = metrics.calculateViews(Number(value));
    const message = `
        <strong>Investment Result:</strong><br>
        • Views: ${formatters.formatNumber(data.totalViewed)}<br>
        • Clicks: ${formatters.formatNumber(data.clicks)}<br>
        • Shares: ${formatters.formatNumber(data.shares)}
    `;
    domUtils.showMessage('investmentOutput', message, 'success');
}