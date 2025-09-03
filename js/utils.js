export const campaignManager = {
    addCampaign(name, client, startDate, endDate, investment) {
        const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        const newCampaign = { name, client, startDate, endDate, investment: parseFloat(investment) };
        campaigns.push(newCampaign);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        return newCampaign;
    },
    listCampaigns() {
        return JSON.parse(localStorage.getItem('campaigns')) || [];
    }
};

export const formatters = {
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },
    formatCurrency(num) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    },
    formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString();
    }
};

export const domUtils = {
    showMessage(id, msg, type = 'info') {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = `<div class="${type}-message">${msg}</div>`;
        setTimeout(() => { el.innerHTML = ''; }, 5000);
    }
};

export const validators = {
    isValidNumber(value) {
        return !isNaN(value) && value !== '';
    }
};