# Advertisement Campaign Management System

A comprehensive web application for managing digital advertising campaigns with real-time metrics, analytics, and reporting capabilities.

## 🚀 Features

### Core Functionality
- **Campaign Registration**: Create and manage advertising campaigns
- **Real-time Dashboard**: Monitor campaign performance with live metrics
- **Advanced Analytics**: ROI, CTR, CPC, CPM, and efficiency calculations
- **Interactive Charts**: Visual representation of campaign data using Chart.js
- **Data Persistence**: LocalStorage with automatic backup system
- **Search & Filter**: Find campaigns by name or client
- **Export/Import**: JSON data export and import functionality

### Dashboard Features
- **Metrics Overview**: Total campaigns, investment, views, and average ROI
- **Campaign Lists**: Separate views for active and finished campaigns
- **Real-time Updates**: Metrics refresh automatically every 30 seconds
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Charts**: Chart.js for data visualization
- **Storage**: LocalStorage with DataManager class
- **Architecture**: Modular JavaScript with separation of concerns
- **Responsiveness**: CSS Grid and Flexbox with mobile-first design

## 📁 Project Structure

```
DesafioCapgemini/
├── index.html              # Main application interface
├── css/
│   └── styles.css         # Responsive styles and components
├── js/
│   ├── main.js            # Core application logic and event handlers
│   ├── forms.js           # Form handlers
│   ├── validation.js      # Form validation
│   ├── dashboard.js       # Dashboard rendering and updates
│   ├── storage.js         # LocalStorage and backup utilities
│   ├── metrics.js         # Metrics calculations
│   └── utils.js           # Utility functions and helpers
├── data/
│   └── mockData.js        # Sample campaigns and initialization
└── README.md              # Project documentation
```

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/seu-usuario/DesafioCapgemini.git
cd DesafioCapgemini
```

### 2. Run using Node HTTP Server (recommended)
```bash
npm install -g http-server       # install http-server globally if needed
http-server -p 3000              # start server at http://localhost:3000
```

### 3. Alternatively, open in a browser
- Open index.html directly in a modern browser (Chrome, Edge, Firefox, Safari).

## 📦 Getting Started

### Campaign Registration
1. Navigate to the "Register" section.
2. Fill in campaign details:
   - Name
   - Client
   - Start and End Dates
   - Investment
3. Click "Send" to register the campaign.
4. View updates in the dashboard immediately.

### Dashboard
- **Metrics Cards**: View total campaigns, investment, total views, average ROI.
- **Search**: Filter campaigns by name or client.
- **Campaign Lists**: See active and finished campaigns separately.
- **Actions**: Export data, generate reports, or clear all data.

### Export / Import
- Export campaigns to a JSON file.
- Import campaigns from a JSON file to restore or update data.

## 📊 Metrics & Calculations

- **ROI (Return on Investment)**: Calculated based on clicks, conversion rate, and order value
- **CTR (Click Through Rate)**: Ratio of clicks to impressions
- **CPC (Cost Per Click)**: Investment divided by total clicks
- **CPM (Cost Per Mille)**: Cost per thousand impressions
- **Efficiency**: Composite score (0-100) based on multiple factors

### Calculation Formulas
```
ROI = ((Revenue - Investment) / Investment) × 100
CTR = (Clicks / Impressions) × 100
CPC = Investment / Clicks
CPM = (Investment / Impressions) × 1000
Efficiency = Score based on ROI, CTR, Share Rate, and Investment
```

## 📱 Responsive Design

| Device | Breakpoint | Layout |
|--------|------------|---------|
| Desktop | >768px | 4-column grid, full features |
| Tablet | ≤768px | 2-column grid, adapted features |
| Mobile | ≤480px | Single column, simplified interface |

## 🚀 Future Enhancements

- **PDF Export**: Advanced report generation with PDF output
- **User Authentication**: Multi-user support with role-based access
- **Cloud Storage**: Sync data across devices
- **API Integration**: Connect with advertising platforms
- **AI Integration**: Advanced analytics with charts and AI insights

## 🤝 Contributing
1. Fork the project
2. Create a feature branch:
```bash
git checkout -b feature/nova-feature
```
3. Make your changes and commit:
```bash
git commit -m "Add new feature"
```
4. Push to yout branch:
```bash
git push origin feature/nova-feature
```
5. Open a Pull Request.

### Code Standards
- JavaScript: ES6+ modules and clear function names.
- CSS: BEM methodology.
- HTML: Semantic HTML5 and accessibility.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**@jacquelinepslima** - Developer and Project Maintainer
