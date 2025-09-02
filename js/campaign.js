// Gerenciamento de Campanhas de Anúncios
class Campaign {
    constructor(nome, cliente, dataInicio, dataFim, investimento) {
        this.nome = nome;
        this.cliente = cliente;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.investimento = parseFloat(investimento);
        this.id = Date.now() + Math.random();
    }

    calcularVisualizacoes() {
        // Cálculo baseado no investimento
        const pessoasPorReal = this.investimento * 30;
        const clicam = pessoasPorReal * 0.12;
        const compartilham = clicam * (3 / 20);
        const visualiza = compartilham * 40;
        const totalVisualizado = pessoasPorReal + visualiza;
        
        return {
            pessoasPorReal,
            clicam,
            compartilham,
            visualiza,
            totalVisualizado
        };
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            cliente: this.cliente,
            dataInicio: this.dataInicio,
            dataFim: this.dataFim,
            investimento: this.investimento
        };
    }
}

// Gerenciador de Campanhas
class CampaignManager {
    constructor() {
        this.campaigns = [];
        this.loadFromStorage();
    }

    adicionarCampanha(nome, cliente, dataInicio, dataFim, investimento) {
        // Valida os dados antes de criar a campanha
        const errors = validateCampaignData(nome, cliente, dataInicio, dataFim, investimento);
        
        if (errors.length > 0) {
            throw new Error(`Erros de validação: ${errors.join(', ')}`);
        }
        
        const campanha = new Campaign(nome, cliente, dataInicio, dataFim, investimento);
        this.campaigns.push(campanha);
        this.saveToStorage();
        return campanha;
    }

    removerCampanha(id) {
        this.campaigns = this.campaigns.filter(camp => camp.id !== id);
        this.saveToStorage();
    }

    buscarCampanha(id) {
        return this.campaigns.find(camp => camp.id === id);
    }

    listarCampanhas() {
        return this.campaigns;
    }

    calcularTotalInvestido() {
        return this.campaigns.reduce((total, camp) => total + camp.investimento, 0);
    }

    calcularTotalVisualizacoes() {
        return this.campaigns.reduce((total, camp) => {
            const calc = camp.calcularVisualizacoes();
            return total + calc.totalVisualizado;
        }, 0);
    }

    saveToStorage() {
        return DataManager.saveCampaigns(this.campaigns);
    }

    loadFromStorage() {
        this.campaigns = DataManager.loadCampaigns();
    }
}

// Instância global do gerenciador
const campaignManager = new CampaignManager();

// Campaign validation function
function validateCampaign(campaign) {
    const errors = [];
    
    if (!campaign.nome || campaign.nome.trim() === '') {
        errors.push('Campaign name is required');
    }
    
    if (!campaign.cliente || campaign.cliente.trim() === '') {
        errors.push('Client name is required');
    }
    
    if (!campaign.dataInicio) {
        errors.push('Start date is required');
    }
    
    if (!campaign.dataFim) {
        errors.push('End date is required');
    }
    
    if (campaign.dataInicio && campaign.dataFim) {
        const inicio = new Date(campaign.dataInicio);
        const fim = new Date(campaign.dataFim);
        
        if (inicio >= fim) {
            errors.push('End date must be after start date');
        }
        
        if (inicio < new Date()) {
            errors.push('Start date cannot be in the past');
        }
    }
    
    if (!campaign.investimento || campaign.investimento <= 0) {
        errors.push('Investment must be greater than zero');
    }
    
    if (campaign.investimento > 1000000) {
        errors.push('Investment cannot exceed $1,000,000.00');
    }
    
    return errors;
}

// Function to validate data before creating campaign
function validateCampaignData(nome, cliente, dataInicio, dataFim, investimento) {
    const campaignData = {
        nome: nome,
        cliente: cliente,
        dataInicio: dataInicio,
        dataFim: dataFim,
        investimento: parseFloat(investimento)
    };
    
    return validateCampaign(campaignData);
}
