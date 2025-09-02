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

### Reporting System
- **ROI Analysis**: Bar charts showing return on investment by campaign
- **Investment Distribution**: Doughnut charts for budget allocation
- **Efficiency Metrics**: Radar charts for campaign performance scoring
- **Timeline Views**: Line charts showing investment over time
- **Export Options**: PDF export (planned) and print functionality

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
│   ├── campaign.js        # Campaign and CampaignManager classes
│   ├── metrics.js         # MetricsCalculator and AggregateMetricsCalculator
│   └── utils.js           # Utility functions and DataManager
├── data/
│   └── mockData.js        # Sample data and initialization
└── README.md              # Project documentation
```

## 🎯 How to Use

### 1. Getting Started
1. Open `index.html` in a modern web browser
2. The application will automatically load with sample data
3. Navigate to the "Register" section to create campaigns

### 2. Creating Campaigns
1. Fill in the campaign details:
   - Campaign name
   - Client name
   - Start and end dates
   - Investment amount
2. Click "Send" to register the campaign
3. View real-time updates in the dashboard

### 3. Using the Dashboard
- **Metrics Cards**: View total campaigns, investment, views, and ROI
- **Search**: Find campaigns by name or client
- **Campaign Lists**: Browse active and finished campaigns
- **Actions**: Export data, generate reports, or clear all data

### 4. Generating Reports
1. Click "Generate Report" button
2. View interactive charts in a modal window
3. Export or print the report as needed

## 📊 Metrics & Calculations

### Campaign Metrics
- **ROI (Return on Investment)**: Calculated based on clicks, conversion rate, and order value
- **CTR (Click Through Rate)**: Ratio of clicks to impressions
- **CPC (Cost Per Click)**: Investment divided by total clicks
- **CPM (Cost Per Mille)**: Cost per thousand impressions
- **Share Rate**: Percentage of clicks that resulted in shares
- **Campaign Efficiency**: Composite score (0-100) based on multiple factors

### Calculation Formulas
```
ROI = ((Revenue - Investment) / Investment) × 100
CTR = (Clicks / Impressions) × 100
CPC = Investment / Clicks
CPM = (Investment / Impressions) × 1000
Efficiency = Score based on ROI, CTR, Share Rate, and Investment
```

## 🔧 Technical Implementation

### Data Management
- **DataManager Class**: Centralized LocalStorage operations
- **Automatic Backups**: Scheduled backups with cleanup of old files
- **Error Handling**: Robust error handling for storage operations
- **Data Validation**: Input validation with real-time feedback

### Responsive Design
- **Mobile First**: CSS designed for mobile devices first
- **Breakpoints**: 768px (tablet) and 480px (mobile)
- **Flexible Grids**: CSS Grid with auto-fit for adaptive layouts
- **Touch Friendly**: Optimized for touch interactions

### Performance Features
- **Lazy Loading**: Charts generated only when needed
- **Efficient Updates**: Real-time updates without full page refresh
- **Memory Management**: Automatic cleanup of old backups
- **Optimized Rendering**: Efficient DOM manipulation

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|------------|---------|
| Desktop | >768px | 4-column grid, full features |
| Tablet | ≤768px | 2-column grid, adapted features |
| Mobile | ≤480px | Single column, simplified interface |

## 🚀 Future Enhancements

### Planned Features
- **PDF Export**: Advanced report generation with PDF output
- **Data Analytics**: More sophisticated statistical analysis
- **User Authentication**: Multi-user support with role-based access
- **Cloud Storage**: Sync data across devices
- **API Integration**: Connect with advertising platforms

### Technical Improvements
- **Progressive Web App**: Offline functionality and app-like experience
- **Performance Optimization**: Lazy loading and code splitting
- **Testing Suite**: Unit and integration tests
- **CI/CD Pipeline**: Automated deployment and testing

## 🐛 Known Issues & Limitations

- **Browser Compatibility**: Requires modern browsers with ES6+ support
- **Storage Limits**: LocalStorage has size limitations (~5-10MB)
- **Data Persistence**: Data is stored locally and not synced across devices
- **PDF Export**: Currently simulated, full implementation planned

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Open `index.html` in a web browser
3. Make changes to the JavaScript or CSS files
4. Test functionality in the browser
5. Update documentation as needed

### Code Standards
- **JavaScript**: ES6+ with clear function naming
- **CSS**: BEM methodology for class naming
- **HTML**: Semantic HTML5 with accessibility in mind
- **Comments**: Comprehensive documentation in code

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**@jacquelinepslima** - Developer and Project Maintainer

## 📈 Project Status

**Current Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: December 2024  

### Development Progress
- ✅ Core functionality implemented
- ✅ Dashboard with real-time metrics
- ✅ Chart system with Chart.js
- ✅ Responsive design
- ✅ Data persistence and backup
- ✅ Search and filtering
- 🔄 PDF export (in development)
- 🔄 Advanced analytics (planned)

## 🎉 Acknowledgments

- **Chart.js**: For powerful charting capabilities
- **CSS Grid & Flexbox**: For modern responsive layouts
- **LocalStorage API**: For client-side data persistence
- **Modern JavaScript**: For clean, maintainable code

---

**Note**: This application is designed for educational and demonstration purposes. For production use, consider implementing additional security measures and server-side validation.
