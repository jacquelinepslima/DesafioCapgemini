// Calculadora de Métricas para Campanhas de Anúncios
class MetricsCalculator {
    // Calcula o ROI (Return on Investment)
    static calculateROI(campaign) {
        if (!campaign.investimento || campaign.investimento <= 0) {
            return 0;
        }
        
        // Simula receita baseada em cliques e taxa de conversão
        const clicks = campaign.calcularVisualizacoes().clicam;
        const conversionRate = 0.05; // 5% de taxa de conversão padrão
        const averageOrderValue = 150.00; // Valor médio do pedido
        
        const revenue = clicks * conversionRate * averageOrderValue;
        const roi = ((revenue - campaign.investimento) / campaign.investimento) * 100;
        
        return Math.round(roi * 100) / 100; // Arredonda para 2 casas decimais
    }
    
    // Calcula o CTR (Click Through Rate)
    static calculateCTR(campaign) {
        const visualizacoes = campaign.calcularVisualizacoes().pessoasPorReal;
        const cliques = campaign.calcularVisualizacoes().clicam;
        
        if (visualizacoes <= 0) {
            return 0;
        }
        
        return Math.round((cliques / visualizacoes) * 100 * 100) / 100;
    }
    
    // Calcula o CPC (Cost Per Click)
    static calculateCPC(campaign) {
        const cliques = campaign.calcularVisualizacoes().clicam;
        
        if (cliques <= 0) {
            return 0;
        }
        
        return Math.round((campaign.investimento / cliques) * 100) / 100;
    }
    
    // Calcula o CPM (Cost Per Mille - custo por mil impressões)
    static calculateCPM(campaign) {
        const visualizacoes = campaign.calcularVisualizacoes().pessoasPorReal;
        
        if (visualizacoes <= 0) {
            return 0;
        }
        
        return Math.round((campaign.investimento / visualizacoes) * 1000 * 100) / 100;
    }
    
    // Calcula a taxa de compartilhamento
    static calculateShareRate(campaign) {
        const cliques = campaign.calcularVisualizacoes().clicam;
        const compartilhamentos = campaign.calcularVisualizacoes().compartilham;
        
        if (cliques <= 0) {
            return 0;
        }
        
        return Math.round((compartilhamentos / cliques) * 100 * 100) / 100;
    }
    
    // Calcula o alcance total (visualizações + visualizações por compartilhamento)
    static calculateTotalReach(campaign) {
        const metricas = campaign.calcularVisualizacoes();
        return metricas.pessoasPorReal + metricas.visualiza;
    }
    
    // Calcula a eficiência da campanha (score de 0-100)
    static calculateCampaignEfficiency(campaign) {
        let score = 0;
        
        // Pontuação baseada no ROI
        const roi = this.calculateROI(campaign);
        if (roi > 0) score += 30;
        else if (roi > -50) score += 15;
        
        // Pontuação baseada no CTR
        const ctr = this.calculateCTR(campaign);
        if (ctr > 2) score += 25;
        else if (ctr > 1) score += 15;
        else if (ctr > 0.5) score += 10;
        
        // Pontuação baseada na taxa de compartilhamento
        const shareRate = this.calculateShareRate(campaign);
        if (shareRate > 15) score += 25;
        else if (shareRate > 10) score += 15;
        else if (shareRate > 5) score += 10;
        
        // Pontuação baseada no investimento (campanhas com investimento moderado são mais eficientes)
        if (campaign.investimento >= 1000 && campaign.investimento <= 10000) {
            score += 20;
        } else if (campaign.investimento >= 500 && campaign.investimento <= 5000) {
            score += 15;
        } else {
            score += 10;
        }
        
        return Math.min(score, 100);
    }
    
    // Gera relatório completo de métricas
    static generateFullReport(campaign) {
        const metricas = campaign.calcularVisualizacoes();
        
        return {
            id: campaign.id,
            nome: campaign.nome,
            cliente: campaign.cliente,
            periodo: {
                inicio: campaign.dataInicio,
                fim: campaign.dataFim
            },
            investimento: campaign.investimento,
            metricas: {
                visualizacoes: metricas.pessoasPorReal,
                cliques: metricas.clicam,
                compartilhamentos: metricas.compartilham,
                visualizacoesAdicionais: metricas.visualiza,
                totalAlcance: this.calculateTotalReach(campaign)
            },
            performance: {
                roi: this.calculateROI(campaign),
                ctr: this.calculateCTR(campaign),
                cpc: this.calculateCPC(campaign),
                cpm: this.calculateCPM(campaign),
                taxaCompartilhamento: this.calculateShareRate(campaign),
                eficiencia: this.calculateCampaignEfficiency(campaign)
            },
            status: this.getCampaignStatus(campaign),
            recomendacoes: this.generateRecommendations(campaign)
        };
    }
    
    // Determines campaign status
    static getCampaignStatus(campaign) {
        const hoje = new Date();
        const dataInicio = new Date(campaign.dataInicio);
        const dataFim = new Date(campaign.dataFim);
        
        if (hoje < dataInicio) {
            return 'Scheduled';
        } else if (hoje >= dataInicio && hoje <= dataFim) {
            return 'Active';
        } else {
            return 'Finished';
        }
    }
    
    // Gera recomendações baseadas nas métricas
    static generateRecommendations(campaign) {
        const recomendacoes = [];
        const metricas = campaign.calcularVisualizacoes();
        const ctr = this.calculateCTR(campaign);
        const roi = this.calculateROI(campaign);
        
        if (ctr < 1) {
            recomendacoes.push('Considerar otimizar o título e descrição do anúncio para melhorar o CTR');
        }
        
        if (roi < 0) {
            recomendacoes.push('Avaliar o público-alvo e ajustar o investimento para melhorar o ROI');
        }
        
        if (metricas.compartilham < metricas.clicam * 0.1) {
            recomendacoes.push('Criar conteúdo mais envolvente para aumentar o compartilhamento');
        }
        
        if (campaign.investimento < 1000) {
            recomendacoes.push('Considerar aumentar o investimento para melhor alcance');
        }
        
        if (recomendacoes.length === 0) {
            recomendacoes.push('Campanha performando bem! Manter estratégia atual');
        }
        
        return recomendacoes;
    }
}

// Calculadora de métricas agregadas para múltiplas campanhas
class AggregateMetricsCalculator {
    // Calcula métricas totais de todas as campanhas
    static calculateTotalMetrics(campaigns) {
        if (!campaigns || campaigns.length === 0) {
            return {
                totalCampanhas: 0,
                totalInvestido: 0,
                totalVisualizacoes: 0,
                totalCliques: 0,
                totalCompartilhamentos: 0,
                mediaROI: 0,
                mediaCTR: 0,
                campanhasAtivas: 0,
                campanhasFinalizadas: 0
            };
        }
        
        const totalInvestido = campaigns.reduce((total, camp) => total + camp.investimento, 0);
        const totalVisualizacoes = campaigns.reduce((total, camp) => {
            return total + MetricsCalculator.calculateTotalReach(camp);
        }, 0);
        
        const totalCliques = campaigns.reduce((total, camp) => {
            return total + camp.calcularVisualizacoes().clicam;
        }, 0);
        
        const totalCompartilhamentos = campaigns.reduce((total, camp) => {
            return total + camp.calcularVisualizacoes().compartilham;
        }, 0);
        
        const mediaROI = campaigns.reduce((total, camp) => {
            return total + MetricsCalculator.calculateROI(camp);
        }, 0) / campaigns.length;
        
        const mediaCTR = campaigns.reduce((total, camp) => {
            return total + MetricsCalculator.calculateCTR(camp);
        }, 0) / campaigns.length;
        
        const campanhasAtivas = campaigns.filter(camp => 
            MetricsCalculator.getCampaignStatus(camp) === 'Active'
        ).length;
        
        const campanhasFinalizadas = campaigns.filter(camp => 
            MetricsCalculator.getCampaignStatus(camp) === 'Finished'
        ).length;
        
        return {
            totalCampanhas: campaigns.length,
            totalInvestido: Math.round(totalInvestido * 100) / 100,
            totalVisualizacoes: totalVisualizacoes,
            totalCliques: totalCliques,
            totalCompartilhamentos: totalCompartilhamentos,
            mediaROI: Math.round(mediaROI * 100) / 100,
            mediaCTR: Math.round(mediaCTR * 100) / 100,
            campanhasAtivas: campanhasAtivas,
            campanhasFinalizadas: campanhasFinalizadas
        };
    }
    
    // Gera relatório comparativo entre campanhas
    static generateComparisonReport(campaigns) {
        if (!campaigns || campaigns.length === 0) {
            return [];
        }
        
        return campaigns.map(campaign => {
            const report = MetricsCalculator.generateFullReport(campaign);
            return {
                ...report,
                ranking: this.calculateRanking(campaign, campaigns)
            };
        }).sort((a, b) => b.performance.eficiencia - a.performance.eficiencia);
    }
    
    // Calcula o ranking da campanha
    static calculateRanking(campaign, allCampaigns) {
        const sortedCampaigns = allCampaigns.sort((a, b) => {
            const eficienciaA = MetricsCalculator.calculateCampaignEfficiency(a);
            const eficienciaB = MetricsCalculator.calculateCampaignEfficiency(b);
            return eficienciaB - eficienciaA;
        });
        
        const index = sortedCampaigns.findIndex(camp => camp.id === campaign.id);
        return index + 1;
    }
}
