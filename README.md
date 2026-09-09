# ♻️ SmartWaste - Digital Waste Management Platform

A modern, eco-tech civic waste management platform built with **pure HTML5, CSS3, and Vanilla JavaScript**. It empowers citizens, waste collectors, recycling companies, and municipal authorities to coordinate waste reporting, on-demand collections, and data-driven circular recycling.

---

## 📁 1. Project Structure

```
sid web/
├── index.html                  # Core single-page application with all 12 sections and modals
├── css/
│   └── style.css               # Eco-Tech Modern Design System (custom variables, responsive grids, animations)
├── js/
│   └── script.js               # Application logic (localStorage state, forms, dashboards, charts, notifications)
└── README.md                   # Complete documentation and backend integration guide
```

---

## 🚀 2. Technologies Used

* **HTML5**: Semantic structure, accessibility elements, modern forms, and modal dialogs.
* **CSS3**: Custom property tokens (CSS variables), glassmorphism effects, flexbox & responsive grid layouts, animations, and responsive mobile breakpoints.
* **Vanilla JavaScript (ES6+)**: Event-driven client architecture, DOM manipulation, form validation, debounce search, and dynamic table generation without frontend frameworks.
* **Chart.js (CDN)**: Visual analytics with doughnut, pie, and bar charts.
* **Browser `localStorage`**: Temporary client-side database simulation for instant data persistence across page reloads.

---

## ⚙️ 3. How JavaScript is Being Used

The file [js/script.js](file:///c:/Users/manth/Desktop/sid%20web/js/script.js) is organized into clean, modular functions:

1. **State & Seed Initialization (`initializeDefaultData`)**: Automatically checks if `localStorage` has existing data; if not, pre-fills realistic reports (`SW-2026-001`), pickup requests (`COL-2026-001`), and verified recycling centers.
2. **Form Handling & Validation (`submitWasteReport`, `requestCollection`)**:
   * Validates mandatory inputs (name, 10-digit mobile, location, category).
   * Generates formatted tracking IDs (`SW-2026-XXX` and `COL-2026-XXX`).
   * Supports photo attachments with instant preview using `FileReader`.
   * Triggers visual loading states, updates statistics, adds records to tables, creates notifications, and opens success modals.
3. **Real-time Status Updates (`updateReportStatus`, `updateCollectionStatus`)**:
   * Enables municipal admins and collectors to change complaint and pickup statuses.
   * Instantly re-calculates metrics and updates the 5-stage progress tracker timeline.
4. **Live Search & Filter (`searchData`, `filterRecyclingCenters`)**:
   * Real-time search across report IDs, waste categories, and areas with debouncing.
   * Dynamic filter for nearby recycling centers.
5. **Interactive Analytics (`updateAnalytics`)**:
   * Aggregates live data into 4 Chart.js charts: Category breakdown, Recyclable vs Non-Recyclable ratio, Resolution velocity, and Area density.
6. **Notification Tray & Toasts (`createNotification`, `showToast`)**:
   * Logs activity with unread badge counter in the navigation bar and animated toast alerts on the screen.

---

## 💾 4. How `localStorage` Works in this Prototype

`localStorage` is a browser feature that allows web applications to store key-value pairs (up to ~5MB) directly on the user's computer:

```javascript
// Saving an array of reports to localStorage as a JSON string:
localStorage.setItem('smartwaste_reports', JSON.stringify(reports));

// Loading reports from localStorage and parsing back into a JavaScript array:
const storedData = localStorage.getItem('smartwaste_reports');
const reports = storedData ? JSON.parse(storedData) : [];
```

> 💡 **Notice:** `localStorage` is used as a temporary frontend database for this hackathon prototype. Whenever you submit a report or change a status, the change remains even if you refresh your browser.

---

## 🔌 5. How to Connect this Frontend to a Real Backend Later

When transitioning from this prototype to a production platform, replace the `localStorage` helper functions with asynchronous API calls (`fetch` or `axios`):

### Option A: Node.js & Express + MongoDB / PostgreSQL
1. Create a REST API server with endpoints:
   * `POST /api/reports` (to submit a new report)
   * `GET /api/reports` (to fetch reports for dashboards)
   * `PATCH /api/reports/:id/status` (to update status)
2. Replace `saveReport()` in `js/script.js`:
   ```javascript
   async function saveReport(report) {
     const response = await fetch('http://localhost:5000/api/reports', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(report)
     });
     return await response.json();
   }
   ```

### Option B: Firebase (Firestore & Authentication)
1. Initialize the Firebase SDK in `index.html`.
2. Use `addDoc(collection(db, "reports"), reportData)` to store reports in Firestore and `onSnapshot` for real-time live synchronization.
3. Replace the demo login modal with `firebase.auth().signInWithEmailAndPassword()`.

### Option C: Supabase (PostgreSQL & Realtime)
1. Include the `@supabase/supabase-js` CDN in `index.html`.
2. Connect using `supabase.from('reports').insert([ newReport ])`.
3. Use Row Level Security (RLS) to ensure citizens only view their reports while municipal staff have admin access.

---

## 🖥️ 6. How to Run the Website Locally

You can run the website in any modern browser using any of the following simple methods:

### Method 1: Using the Dev Server
In your terminal, run:
```bash
npm run dev
```
Then open: **[http://localhost:5173/](http://localhost:5173/)**

### Method 2: Direct File Open
Simply double-click the [index.html](file:///c:/Users/manth/Desktop/sid%20web/index.html) file in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Method 3: Using Python Built-in Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.
