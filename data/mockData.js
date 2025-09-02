// Dados de exemplo para demonstração

const mockCampaigns = [
    {
        id: 1,
        nome: "Campanha Black Friday 2024",
        cliente: "E-commerce TechStore",
        dataInicio: "2024-11-20",
        dataFim: "2024-11-30",
        investimento: 5000.00
    },
    {
        id: 2,
        nome: "Lançamento Novo Produto",
        cliente: "Startup Inovação",
        dataInicio: "2024-12-01",
        dataFim: "2024-12-15",
        investimento: 3000.00
    },
    {
        id: 3,
        nome: "Promoção de Verão",
        cliente: "Loja de Roupas Moda",
        dataInicio: "2024-12-20",
        dataFim: "2025-02-28",
        investimento: 8000.00
    },
    {
        id: 4,
        nome: "Campanha de Fidelização",
        cliente: "Restaurante Sabor",
        dataInicio: "2024-11-01",
        dataFim: "2024-11-30",
        investimento: 2500.00
    },
    {
        id: 5,
        nome: "Marketing Digital B2B",
        cliente: "Empresa Consultoria",
        dataInicio: "2024-12-01",
        dataFim: "2025-01-31",
        investimento: 12000.00
    }
];

// Dados de métricas de exemplo
const mockMetrics = {
    totalInvestido: 30500.00,
    totalCampanhas: 5,
    mediaInvestimento: 6100.00,
    totalVisualizacoes: 915000,
    taxaConversao: 0.12,
    taxaCompartilhamento: 0.15
};

// Dados de relatórios de exemplo
const mockReports = {
    campanhasPorCliente: {
        "E-commerce TechStore": 1,
        "Startup Inovação": 1,
        "Loja de Roupas Moda": 1,
        "Restaurante Sabor": 1,
        "Empresa Consultoria": 1
    },
    
    investimentoPorMes: {
        "Novembro 2024": 10500.00,
        "Dezembro 2024": 23000.00,
        "Janeiro 2025": 8000.00,
        "Fevereiro 2025": 8000.00
    },
    
    performancePorCampanha: [
        {
            nome: "Campanha Black Friday 2024",
            investimento: 5000.00,
            visualizacoes: 150000,
            cliques: 18000,
            compartilhamentos: 2700,
            roi: 30.0
        },
        {
            nome: "Lançamento Novo Produto",
            investimento: 3000.00,
            visualizacoes: 90000,
            cliques: 10800,
            compartilhamentos: 1620,
            roi: 30.0
        },
        {
            nome: "Promoção de Verão",
            investimento: 8000.00,
            visualizacoes: 240000,
            cliques: 28800,
            compartilhamentos: 4320,
            roi: 30.0
        },
        {
            nome: "Campanha de Fidelização",
            investimento: 2500.00,
            visualizacoes: 75000,
            cliques: 9000,
            compartilhamentos: 1350,
            roi: 30.0
        },
        {
            nome: "Marketing Digital B2B",
            investimento: 12000.00,
            visualizacoes: 360000,
            cliques: 43200,
            compartilhamentos: 6480,
            roi: 30.0
        }
    ]
};

// Função para popular dados iniciais
function populateMockData() {
    if (!DataManager.loadCampaigns().length) {
        DataManager.saveCampaigns(mockCampaigns);
        console.log('Dados de exemplo carregados com sucesso!');
    }
}

// Função para limpar dados de exemplo
function clearMockData() {
    DataManager.removeData('campaigns');
    console.log('Dados de exemplo removidos!');
}

// Função para resetar dados de exemplo
function resetMockData() {
    clearMockData();
    populateMockData();
    console.log('Dados de exemplo resetados!');
}

// Função para verificar informações do storage
function getStorageInfo() {
    return DataManager.getStorageInfo();
}

// Função para limpar todos os dados
function clearAllData() {
    return DataManager.clearAllData();
}
