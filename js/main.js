import { setupFormHandlers } from './forms.js';
import { loadCampaigns, updateDashboard } from './dashboard.js';
import { populateMockData } from '../data/mockData.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Application started!');

    // Carrega dados mock
    populateMockData();

    // Inicializa formulário e eventos
    setupFormHandlers();

    // Carrega campanhas do storage
    loadCampaigns();

    // Atualiza dashboard
    updateDashboard();
});