// Main application file
// Advertisement Control - Campaign Management System

// Waits for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application started successfully!');
    
    // Initialize example data
    populateMockData();
    
    // Configure event listeners
    setupEventListeners();
    
    // Load existing campaigns
    loadCampaigns();
    
    // Update dashboard
    updateDashboard();
    
    // Perform automatic backup
    automaticBackup();
    
    // Clean old backups
    cleanOldBackups();
    
    // Display storage information
    const storageInfo = getStorageInfo();
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
        
        // Add real-time validation
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
    const searchField = document.getElementById('buscaCampanhas');
    if (searchField) {
        searchField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCampaigns(this.value);
            }
        });
    }
}

// Real-time validation configuration
function setupRealTimeValidation(form) {
    const fields = {
        'nome': { type: 'text', required: true, minLength: 2 },
        'dataI': { type: 'date', required: true },
        'dataF': { type: 'date', required: true },
        'grana': { type: 'number', required: true, min: 0.01, max: 1000000 }
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
    const fieldId = field.id;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (rules.required && (!value || value === '')) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Minimum length validation
    if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Minimum of ${rules.minLength} characters`;
    }
    
    // Minimum value validation
    if (rules.min !== undefined && parseFloat(value) < rules.min) {
        isValid = false;
        errorMessage = `Minimum value: ${rules.min}`;
    }
    
    // Maximum value validation
    if (rules.max !== undefined && parseFloat(value) > rules.max) {
        isValid = false;
        errorMessage = `Maximum value: ${rules.max}`;
    }
    
    // Date validation
    if (rules.type === 'date' && value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            isValid = false;
            errorMessage = 'Invalid date';
        }
    }
    
    // Apply error or success style
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Display field error
function showFieldError(field, message) {
    field.classList.add('error-field');
    field.classList.remove('success-field');
    
    // Remove previous error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Create new error message
    errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

// Display field success
function showFieldSuccess(field) {
    field.classList.remove('error-field');
    field.classList.add('success-field');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear field error
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
    const name = formData.get('anuncio') || document.getElementById('nome').value;
    const client = formData.get('nome') || document.getElementById('nome').value;
    const startDate = formData.get('dataI') || document.getElementById('dataI').value;
    const endDate = formData.get('dataFim') || document.getElementById('dataF').value;
    const investment = formData.get('grana') || document.getElementById('grana').value;
    
    // Clear previous messages
    clearMessages();
    
    // Validation using the new validation function
    try {
        const campaign = campaignManager.addCampaign(name, client, startDate, endDate, investment);
        
        // Display success message
        domUtils.showMessage('exporAnuncio', `Campaign "${name}" registered successfully!`, 'success');
        
        // Clear the form
        event.target.reset();
        
        // Update the interface
        loadCampaigns();
        updateDashboard();
        
        // Perform automatic backup after success
        automaticBackup();
        
    } catch (error) {
        console.error('Error registering campaign:', error);
        
        // Check if it's a validation error
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
    
    const investment = document.getElementById('investA').value;
    
    if (!validators.isValidNumber(investment)) {
        domUtils.showMessage('valorDigitado', 'Please enter a valid investment value.', 'error');
        return;
    }
    
    const metrics = metrics.calculateViews(parseFloat(investment));
    
    const message = `
        <strong>Investment Result:</strong><br>
        • People who saw the ad: ${formatters.formatNumber(metrics.pessoasPorReal)}<br>
        • People who clicked: ${formatters.formatNumber(metrics.clicam)}<br>
        • People who shared: ${formatters.formatNumber(metrics.compartilham)}<br>
        • Additional views: ${formatters.formatNumber(metrics.visualiza)}<br>
        • <strong>Total views: ${formatters.formatNumber(metrics.totalVisualizado)}</strong>
    `;
    
    domUtils.showMessage('valorDigitado', message, 'success');
}

// Advertisement quantity handler
function handleQuantitySubmit(event) {
    event.preventDefault();
    
    const quantity = document.getElementById('qtd').value;
    
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

// Function to load existing campaigns
function loadCampaigns() {
    const campaigns = campaignManager.listCampaigns();
    console.log('Campaigns loaded:', campaigns);
}

// Function to update the dashboard
function updateDashboard() {
    const campaigns = campaignManager.listCampaigns();
    const totalInvested = campaignManager.calculateTotalInvested();
    const totalViews = campaignManager.calculateTotalViews();
    
    // Calculate aggregated metrics
    const aggregatedMetrics = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);
    
    // Update general metrics
    document.getElementById('totalCampanhas').textContent = aggregatedMetrics.totalCampanhas;
    document.getElementById('totalInvestido').textContent = formatters.formatCurrency(aggregatedMetrics.totalInvestido);
    document.getElementById('totalVisualizacoes').textContent = formatters.formatNumber(aggregatedMetrics.totalVisualizacoes);
    document.getElementById('mediaROI').textContent = `${aggregatedMetrics.mediaROI}%`;
    
    // Update campaign lists
    updateCampaignList();
    
    console.log('Dashboard updated:', {
        totalCampanhas: campaigns.length,
        totalInvestido: formatters.formatCurrency(totalInvested),
        totalVisualizacoes: formatters.formatNumber(totalViews),
        aggregatedMetrics: aggregatedMetrics
    });
}

// Function to update the campaign list
function updateCampaignList() {
    const campaigns = campaignManager.listCampaigns();
    
    // Separate campaigns by status
    const activeCampaigns = campaigns.filter(camp => 
        MetricsCalculator.getCampaignStatus(camp) === 'Active'
    );
    
    const finishedCampaigns = campaigns.filter(camp => 
        MetricsCalculator.getCampaignStatus(camp) === 'Finished'
    );
    
    // Render active campaigns
    const activeContainer = document.getElementById('campanhasAtivas');
    activeContainer.innerHTML = activeCampaigns.length > 0 
        ? activeCampaigns.map(camp => createCampaignCard(camp)).join('')
        : '<p style="text-align: center; color: rgba(255,255,255,0.7);">No active campaigns</p>';
    
    // Render finished campaigns
    const finishedContainer = document.getElementById('campanhasFinalizadas');
    finishedContainer.innerHTML = finishedCampaigns.length > 0 
        ? finishedCampaigns.map(camp => createCampaignCard(camp)).join('')
        : '<p style="text-align: center; color: rgba(255,255,255,0.7);">No finished campaigns</p>';
}

// Function to create campaign card
function createCampaignCard(campaign) {
    const report = MetricsCalculator.generateFullReport(campaign);
    const status = report.status;
    const statusClass = `status-${status.toLowerCase().replace('ç', 'c')}`;
    
    return `
        <div class="campaign-item">
            <div class="campaign-header">
                <div class="campaign-name">${campaign.nome}</div>
                <span class="campaign-status ${statusClass}">${status}</span>
            </div>
            <div style="color: rgba(255,255,255,0.8); margin-bottom: 10px;">
                Client: ${campaign.cliente} | 
                Period: ${formatters.formatDate(campaign.dataInicio)} - ${formatters.formatDate(campaign.dataFim)}
            </div>
            <div class="campaign-metrics">
                <div class="metric-item">
                    <div class="metric-label">ROI</div>
                    <div class="metric-value-small">${report.performance.roi}%</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">CTR</div>
                    <div class="metric-value-small">${report.performance.ctr}%</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">CPC</div>
                    <div class="metric-value-small">$ ${report.performance.cpc}</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">Efficiency</div>
                    <div class="metric-value-small">${report.performance.eficiencia}/100</div>
                </div>
            </div>
            <div style="margin-top: 10px; font-size: 0.9rem; color: rgba(255,255,255,0.8);">
                <strong>Recommendation:</strong> ${report.recomendacoes[0]}
            </div>
        </div>
    `;
}

// Compatibility functions (kept to avoid breaking existing functionality)
function render() {
    handleQuantitySubmit(new Event('click'));
}

function chamada() {
    handleInvestmentSubmit(new Event('click'));
}

function receber() {
    const form = document.getElementById('investA');
    if (form && form.value) {
        return parseFloat(form.value);
    }
    return 0;
}

function calc() {
    const input = receber();
    if (input <= 0) return 0;
    
    const metrics = metrics.calculateViews(input);
    return metrics.totalVisualizado;
}

// Function to clear messages
function clearMessages() {
    const elements = ['exporAnuncio', 'nomeR', 'inicio', 'fim', 'valorDigitado'];
    elements.forEach(id => domUtils.clearMessage(id));
}

// Function to export data
function exportData() {
    const campaigns = campaignManager.listCampaigns();
    const data = {
        campaigns: campaigns,
        totalInvested: campaignManager.calculateTotalInvested(),
        totalViews: campaignManager.calculateTotalViews(),
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

// Function to import data
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.campaigns && Array.isArray(data.campaigns)) {
                // Clear existing data
                DataManager.removeData('campaigns');
                
                // Save new data
                DataManager.saveCampaigns(data.campaigns);
                
                // Reload the application
                location.reload();
                
                domUtils.showMessage('exporAnuncio', 'Data imported successfully!', 'success');
            } else {
                domUtils.showMessage('exporAnuncio', 'Invalid file. Expected format: JSON with campaigns array.', 'error');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            domUtils.showMessage('exporAnuncio', 'Error processing file. Check the format.', 'error');
        }
    };
    reader.readAsText(file);
}

// Function for automatic backup
function automaticBackup() {
    const campaigns = campaignManager.listCampaigns();
    const backup = {
        campaigns: campaigns,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    DataManager.saveData('backup_' + Date.now(), backup);
    console.log('Automatic backup completed successfully!');
}

// Function to restore backup
function restoreBackup(timestamp) {
    const backup = DataManager.loadData('backup_' + timestamp);
    if (backup && backup.campaigns) {
        DataManager.saveCampaigns(backup.campaigns);
        location.reload();
        return true;
    }
    return false;
}

// Function to list available backups
function listBackups() {
    const info = DataManager.getStorageInfo();
    if (info && info.keys) {
        return info.keys.filter(key => key.startsWith('backup_'));
    }
    return [];
}

// Function to clean old backups (keeps only the 5 most recent)
function cleanOldBackups() {
    const backups = listBackups();
    if (backups.length > 5) {
        const sortedBackups = backups.sort().reverse();
        const backupsToRemove = sortedBackups.slice(5);
        
        backupsToRemove.forEach(backup => {
            DataManager.removeData(backup);
        });
        
        console.log(`${backupsToRemove.length} old backups removed.`);
        return backupsToRemove.length;
    }
    return 0;
}

// ===== DASHBOARD BUTTON FUNCTIONS =====

// Function to generate detailed report with charts
function generateReport() {
    const campaigns = campaignManager.listCampaigns();
    
    if (campaigns.length === 0) {
        domUtils.showMessage('exporAnuncio', 'No campaigns found to generate report.', 'warning');
        return;
    }
    
    // Create modal for the report
    const modal = createReportModal();
    document.body.appendChild(modal);
    
    // Generate charts
    setTimeout(() => {
        generateROIChart(campaigns);
        generateInvestmentChart(campaigns);
        generateEfficiencyChart(campaigns);
        generateTimelineChart(campaigns);
    }, 100);
    
    // Display success message
    domUtils.showMessage('exporAnuncio', 'Report generated successfully!', 'success');
}

// Function to clear all data
function clearData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        try {
            // Clear LocalStorage data
            DataManager.clearAllData();
            
            // Clear campaigns from manager
            campaignManager.campaigns = [];
            
            // Update interface
            updateDashboard();
            
            // Display success message
            domUtils.showMessage('exporAnuncio', 'All data has been cleared successfully!', 'success');
            
            console.log('Data cleared successfully!');
        } catch (error) {
            console.error('Error clearing data:', error);
            domUtils.showMessage('exporAnuncio', 'Error clearing data. Please try again.', 'error');
        }
    }
}

// ===== CHART FUNCTIONS =====

// Create modal to display the report
function createReportModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-relatorio';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button onclick="this.closest('.modal-relatorio').remove()" class="modal-close">×</button>
            
            <h1 class="modal-title">Campaign Report</h1>
            
            <div class="charts-grid">
                <div class="chart-container">
                    <h3>ROI by Campaign</h3>
                    <canvas id="graficoROI" class="chart-canvas"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Investment by Campaign</h3>
                    <canvas id="graficoInvestimento" class="chart-canvas"></canvas>
                </div>
            </div>
            
            <div class="charts-grid">
                <div class="chart-container">
                    <h3>Campaign Efficiency</h3>
                    <canvas id="graficoEficiencia" class="chart-canvas"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Campaign Timeline</h3>
                    <canvas id="graficoTimeline" class="chart-canvas"></canvas>
                </div>
            </div>
            
            <div class="modal-actions">
                <button onclick="exportReportPDF()" class="btn-export">Export PDF</button>
                <button onclick="printReport()" class="btn-print">Print</button>
            </div>
        </div>
    `;
    
    return modal;
}

// Generate ROI chart by campaign
function generateROIChart(campaigns) {
    const ctx = document.getElementById('graficoROI');
    if (!ctx) return;
    
    const labels = campaigns.map(camp => camp.nome.substring(0, 15) + '...');
    const data = campaigns.map(camp => MetricsCalculator.calculateROI(camp));
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'ROI (%)',
                data: data,
                backgroundColor: data.map(roi => roi > 0 ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)'),
                borderColor: data.map(roi => roi > 0 ? '#28a745' : '#dc3545'),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'ROI by Campaign'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    }
                }
            }
        }
    });
}

// Generate investment chart by campaign
function generateInvestmentChart(campaigns) {
    const ctx = document.getElementById('graficoInvestimento');
    if (!ctx) return;
    
    const labels = campaigns.map(camp => camp.nome.substring(0, 15) + '...');
    const data = campaigns.map(camp => camp.investimento);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Investment Distribution'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Generate campaign efficiency chart
function generateEfficiencyChart(campaigns) {
    const ctx = document.getElementById('graficoEficiencia');
    if (!ctx) return;
    
    const labels = campaigns.map(camp => camp.nome.substring(0, 15) + '...');
    const data = campaigns.map(camp => MetricsCalculator.calculateCampaignEfficiency(camp));
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Efficiency',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Campaign Efficiency'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Generate campaign timeline chart
function generateTimelineChart(campaigns) {
    const ctx = document.getElementById('graficoTimeline');
    if (!ctx) return;
    
    const sortedCampaigns = campaigns.sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio));
    const labels = sortedCampaigns.map(camp => formatters.formatDate(camp.dataInicio));
    const data = sortedCampaigns.map(camp => camp.investimento);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment ($)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Investment Timeline'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Investment ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Start Date'
                    }
                }
            }
        }
    });
}

// Function to export report as PDF (simulated)
function exportReportPDF() {
    alert('PDF export functionality will be implemented in a future version.');
    console.log('PDF export requested');
}

// Function to print report
function printReport() {
    window.print();
}

// ===== ADDITIONAL DASHBOARD FUNCTIONS =====

// Function to update metrics in real time
function updateRealTimeMetrics() {
    setInterval(() => {
        const campaigns = campaignManager.listCampaigns();
        if (campaigns.length > 0) {
            // Update only metrics that can change in real time
            const aggregatedMetrics = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);
            
            // Update counters
            const totalCampaignsEl = document.getElementById('totalCampanhas');
            const totalInvestedEl = document.getElementById('totalInvestido');
            
            if (totalCampaignsEl) totalCampaignsEl.textContent = aggregatedMetrics.totalCampanhas;
            if (totalInvestedEl) totalInvestedEl.textContent = formatters.formatCurrency(aggregatedMetrics.totalInvestido);
        }
    }, 30000); // Updates every 30 seconds
}

// Function to filter campaigns by status
function filterCampaignsByStatus(status) {
    const campaigns = campaignManager.listCampaigns();
    const filteredCampaigns = campaigns.filter(camp => 
        MetricsCalculator.getCampaignStatus(camp) === status
    );
    
    // Update only the corresponding list
    if (status === 'Active') {
        const container = document.getElementById('campanhasAtivas');
        container.innerHTML = filteredCampaigns.length > 0 
            ? filteredCampaigns.map(camp => createCampaignCard(camp)).join('')
            : '<p style="text-align: center; color: rgba(255,255,255,0.7);">No active campaigns</p>';
    } else if (status === 'Finished') {
        const container = document.getElementById('campanhasFinalizadas');
        container.innerHTML = filteredCampaigns.length > 0 
            ? filteredCampaigns.map(camp => createCampaignCard(camp)).join('')
            : '<p style="text-align: center; color: rgba(255,255,255,0.7);">No finished campaigns</p>';
    }
}

// Function to search campaigns
function searchCampaigns(term) {
    const campaigns = campaignManager.listCampaigns();
    const foundCampaigns = campaigns.filter(camp => 
        camp.nome.toLowerCase().includes(term.toLowerCase()) ||
        camp.cliente.toLowerCase().includes(term.toLowerCase())
    );
    
    // Update dashboard with search results
    if (foundCampaigns.length > 0) {
        updateDashboardWithResults(foundCampaigns);
    } else {
        domUtils.showMessage('exporAnuncio', 'No campaigns found with the specified term.', 'info');
    }
}

// Function to update dashboard with search results
function updateDashboardWithResults(campaigns) {
    const aggregatedMetrics = AggregateMetricsCalculator.calculateTotalMetrics(campaigns);
    
    // Update general metrics
    document.getElementById('totalCampanhas').textContent = aggregatedMetrics.totalCampanhas;
    document.getElementById('totalInvestido').textContent = formatters.formatCurrency(aggregatedMetrics.totalInvestido);
    document.getElementById('totalVisualizacoes').textContent = formatters.formatNumber(aggregatedMetrics.totalVisualizacoes);
    document.getElementById('mediaROI').textContent = `${aggregatedMetrics.mediaROI}%`;
    
    // Update campaign lists
    updateCampaignList();
    
    // Display result message
    domUtils.showMessage('exporAnuncio', `${campaigns.length} campaign(s) found.`, 'success');
}
