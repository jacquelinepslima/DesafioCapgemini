// Funções Utilitárias

// Validação de formulários
const validators = {
    isNotEmpty: (value) => value && value.trim().length > 0,
    
    isValidDate: (date) => {
        if (!date) return false;
        const dateObj = new Date(date);
        return dateObj instanceof Date && !isNaN(dateObj);
    },
    
    isValidNumber: (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
    },
    
    isDateRangeValid: (dataInicio, dataFim) => {
        if (!dataInicio || !dataFim) return false;
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        return inicio < fim;
    }
};

// Formatação de dados
const formatters = {
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    formatDate: (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR');
    },
    
    formatNumber: (value) => {
        return new Intl.NumberFormat('pt-BR').format(Math.round(value));
    }
};

// Cálculos de métricas
const metrics = {
    calcularVisualizacoes: (investimento) => {
        const pessoasPorReal = investimento * 30;
        const clicam = pessoasPorReal * 0.12;
        const compartilham = clicam * (3 / 20);
        const visualiza = compartilham * 40;
        const totalVisualizado = pessoasPorReal + visualiza;
        
        return {
            pessoasPorReal: Math.round(pessoasPorReal),
            clicam: Math.round(clicam),
            compartilham: Math.round(compartilham),
            visualiza: Math.round(visualiza),
            totalVisualizado: Math.round(totalVisualizado)
        };
    },
    
    calcularROI: (investimento, visualizacoes) => {
        if (investimento <= 0) return 0;
        return (visualizacoes / investimento).toFixed(2);
    }
};

// Manipulação do DOM
const domUtils = {
    showMessage: (elementId, message, type = 'info') => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = message;
            element.className = `message ${type}`;
        }
    },
    
    clearMessage: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '';
            element.className = '';
        }
    },
    
    disableElement: (elementId, disabled = true) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.disabled = disabled;
        }
    },
    
    showLoading: (elementId, show = true) => {
        const element = document.getElementById(elementId);
        if (element) {
            if (show) {
                element.innerHTML = '<span class="loading">Carregando...</span>';
            } else {
                element.innerHTML = '';
            }
        }
    }
};

// Utilitários de array
const arrayUtils = {
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },
    
    sortBy: (array, key, ascending = true) => {
        return [...array].sort((a, b) => {
            if (ascending) {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
    },
    
    filterBy: (array, filters) => {
        return array.filter(item => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                return item[key] && item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
            });
        });
    }
};

// Gerenciador de Persistência de Dados
class DataManager {
    static saveCampaigns(campaigns) {
        try {
            localStorage.setItem('campaigns', JSON.stringify(campaigns));
            console.log('Campanhas salvas com sucesso no localStorage');
            return true;
        } catch (error) {
            console.error('Erro ao salvar campanhas:', error);
            return false;
        }
    }
    
    static loadCampaigns() {
        try {
            const data = localStorage.getItem('campaigns');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erro ao carregar campanhas:', error);
            return [];
        }
    }
    
    static saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Erro ao salvar dados para chave '${key}':`, error);
            return false;
        }
    }
    
    static loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erro ao carregar dados para chave '${key}':`, error);
            return null;
        }
    }
    
    static removeData(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Erro ao remover dados para chave '${key}':`, error);
            return false;
        }
    }
    
    static clearAllData() {
        try {
            localStorage.clear();
            console.log('Todos os dados foram removidos do localStorage');
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    }
    
    static getStorageInfo() {
        try {
            const total = localStorage.length;
            const keys = Object.keys(localStorage);
            const size = new Blob([JSON.stringify(localStorage)]).size;
            
            return {
                totalKeys: total,
                keys: keys,
                estimatedSize: size,
                availableSpace: 'N/A' // localStorage não fornece limite específico
            };
        } catch (error) {
            console.error('Erro ao obter informações do storage:', error);
            return null;
        }
    }
}
