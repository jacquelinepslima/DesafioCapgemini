export const DataManager = {
    saveData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    removeData(key) {
        localStorage.removeItem(key);
    }
};

export function exportData() {
    const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    const blob = new Blob([JSON.stringify(campaigns, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `campaigns_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

export function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                localStorage.setItem('campaigns', JSON.stringify(data));
                location.reload();
            } else {
                alert('Invalid JSON format.');
            }
        } catch {
            alert('Error reading file.');
        }
    };
    reader.readAsText(file);
}