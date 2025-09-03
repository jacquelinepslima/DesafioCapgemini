// Form Validators
const validators = {
    isNotEmpty: value => value && value.trim().length > 0,

    isValidDate: date => {
        if (!date) return false;
        const dateObj = new Date(date);
        return dateObj instanceof Date && !isNaN(dateObj);
    },

    isValidNumber: value => {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
    },

    isDateRangeValid: (startDate, endDate) => {
        if (!startDate || !endDate) return false;
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start < end;
    }
};

// Data Formatters
const formatters = {
    formatCurrency: value => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    },

    formatDate: date => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US');
    },

    formatNumber: value => {
        return new Intl.NumberFormat('en-US').format(Math.round(value));
    }
};

// Metrics Calculators
const metrics = {
    calculateViews: investment => {
        const viewsPerCurrency = investment * 30;
        const clicks = viewsPerCurrency * 0.12;
        const shares = clicks * (3 / 20);
        const additionalViews = shares * 40;
        const totalViewed = viewsPerCurrency + additionalViews;

        return {
            viewsPerCurrency: Math.round(viewsPerCurrency),
            clicks: Math.round(clicks),
            shares: Math.round(shares),
            additionalViews: Math.round(additionalViews),
            totalViewed: Math.round(totalViewed)
        };
    },

    calculateROI: (investment, views) => {
        if (investment <= 0) return 0;
        return (views / investment).toFixed(2);
    }
};

// DOM Utilities
const domUtils = {
    showMessage: (elementId, message, type = 'info') => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = message;
            element.className = `message ${type}`;
        }
    },

    clearMessage: elementId => {
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
                element.innerHTML = '<span class="loading">Loading...</span>';
            } else {
                element.innerHTML = '';
            }
        }
    }
};

// Array Utilities
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

// Data Persistence Manager
class DataManager {
    static saveCampaigns(campaigns) {
        try {
            localStorage.setItem('campaigns', JSON.stringify(campaigns));
            console.log('Campaigns saved successfully to localStorage');
            return true;
        } catch (error) {
            console.error('Error saving campaigns:', error);
            return false;
        }
    }

    static loadCampaigns() {
        try {
            const data = localStorage.getItem('campaigns');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading campaigns:', error);
            return [];
        }
    }

    static saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving data for key '${key}':`, error);
            return false;
        }
    }

    static loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error loading data for key '${key}':`, error);
            return null;
        }
    }

    static removeData(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing data for key '${key}':`, error);
            return false;
        }
    }

    static clearAllData() {
        try {
            localStorage.clear();
            console.log('All data cleared from localStorage');
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
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
                availableSpace: 'N/A' // localStorage does not provide a specific limit
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    }
}