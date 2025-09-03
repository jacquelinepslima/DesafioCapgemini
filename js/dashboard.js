import { campaignManager, formatters, domUtils } from './utils.js';
import { MetricsCalculator, AggregateMetricsCalculator } from './metrics.js';

/**
 * Atualiza o dashboard com todas as campanhas e métricas.
 */
export function updateDashboard() {
    const campaigns = campaignManager.listCampaigns();
    const aggregated = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);

    // Atualiza métricas gerais
    document.getElementById('totalCampaigns').textContent = aggregated.totalCampaigns;
    document.getElementById('totalInvested').textContent = formatters.formatCurrency(aggregated.totalInvestment);
    document.getElementById('totalViews').textContent = formatters.formatNumber(aggregated.totalViews);
    document.getElementById('averageROI').textContent = `${aggregated.averageROI}%`;

    // Atualiza listas de campanhas
    updateCampaignList(campaigns);
}

/**
 * Atualiza a lista de campanhas ativas e finalizadas.
 * @param {Array} campaigns 
 */
export function updateCampaignList(campaigns) {
    const activeContainer = document.getElementById('activeCampaigns');
    const finishedContainer = document.getElementById('finishedCampaigns');

    const active = campaigns.filter(c => MetricsCalculator.getCampaignStatus(c) === 'Active');
    const finished = campaigns.filter(c => MetricsCalculator.getCampaignStatus(c) === 'Finished');

    activeContainer.innerHTML = active.length
        ? active.map(createCampaignCard).join('')
        : '<p class="empty-message">No active campaigns</p>';

    finishedContainer.innerHTML = finished.length
        ? finished.map(createCampaignCard).join('')
        : '<p class="empty-message">No finished campaigns</p>';
}

/**
 * Cria o HTML de um card de campanha.
 * @param {Object} campaign 
 * @returns {string}
 */
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

/**
 * Pesquisa campanhas por termo e atualiza o dashboard com o resultado.
 * @param {string} term 
 */
export function searchCampaigns(term) {
    const campaigns = campaignManager.listCampaigns();
    const found = campaigns.filter(c =>
        c.name.toLowerCase().includes(term.toLowerCase()) ||
        c.client.toLowerCase().includes(term.toLowerCase())
    );

    if (found.length > 0) {
        updateDashboardWithResults(found);
    } else {
        domUtils.showMessage('campaignOutput', 'No campaigns found with the specified term.', 'info');
    }
}

/**
 * Atualiza o dashboard mostrando apenas os resultados filtrados.
 * @param {Array} campaigns 
 */
function updateDashboardWithResults(campaigns) {
    const aggregated = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);

    document.getElementById('totalCampaigns').textContent = aggregated.totalCampaigns;
    document.getElementById('totalInvested').textContent = formatters.formatCurrency(aggregated.totalInvestment);
    document.getElementById('totalViews').textContent = formatters.formatNumber(aggregated.totalViews);
    document.getElementById('averageROI').textContent = `${aggregated.averageROI}%`;

    updateCampaignList(campaigns);
    domUtils.showMessage('campaignOutput', `${campaigns.length} campaign(s) found.`, 'success');
}

/**
 * Carrega campanhas do storage e atualiza o dashboard.
 */
export function loadCampaigns() {
    const campaigns = campaignManager.listCampaigns();
    updateDashboard();
    console.log('Campaigns loaded:', campaigns);
}