/**
 * SmartWaste Platform - Core Vanilla JavaScript
 * Modern Event-Driven Architecture with localStorage State Persistence and Chart.js integration
 * 
 * NOTE: localStorage is being used as a temporary frontend database for this prototype.
 * In production, this should be replaced with a secure backend database (e.g. Node.js/Express, Firebase, or Supabase).
 */

// --- Global Data Stores & Keys ---
const STORAGE_KEYS = {
  REPORTS: 'smartwaste_reports',
  COLLECTIONS: 'smartwaste_collections',
  NOTIFICATIONS: 'smartwaste_notifications',
  USER: 'smartwaste_user',
  CENTERS: 'smartwaste_recycling_centers',
  GUTTER_REQUESTS: 'smartwaste_gutter_requests',
  CLEANING_AGENTS: 'smartwaste_cleaning_agents'
};

// Global Chart Instances
let chartCategory = null;
let chartRecyclable = null;
let chartStatus = null;
let chartArea = null;

// --- Initial Seed Data Generator ---
function initializeDefaultData() {
  // 1. Initial Waste Reports
  if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
    const initialReports = [
      {
        id: 'SW-2026-001',
        name: 'Rahul Sharma',
        mobile: '9876543210',
        wasteType: 'Plastic',
        location: 'Sector 14 Market, Green Park',
        description: 'Large pile of single-use plastic bottles and packaging near the community bin.',
        priority: 'High',
        status: 'In Progress',
        date: '2026-09-08 10:30 AM',
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=60',
        timeline: [
          { step: 'Report Submitted', time: 'Sep 08, 10:30 AM', done: true },
          { step: 'Assigned', time: 'Sep 08, 11:15 AM', done: true },
          { step: 'Collection in Progress', time: 'Sep 09, 09:00 AM', done: true },
          { step: 'Waste Collected', time: '', done: false },
          { step: 'Resolved', time: '', done: false }
        ]
      },
      {
        id: 'SW-2026-002',
        name: 'Ananya Verma',
        mobile: '9123456780',
        wasteType: 'E-Waste',
        location: 'Tech Park Block B, Cyber City',
        description: 'Discarded computer monitors, broken keyboards and electronic scrap behind cafeteria.',
        priority: 'Medium',
        status: 'Assigned',
        date: '2026-09-08 02:45 PM',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60',
        timeline: [
          { step: 'Report Submitted', time: 'Sep 08, 02:45 PM', done: true },
          { step: 'Assigned', time: 'Sep 08, 04:00 PM', done: true },
          { step: 'Collection in Progress', time: '', done: false },
          { step: 'Waste Collected', time: '', done: false },
          { step: 'Resolved', time: '', done: false }
        ]
      },
      {
        id: 'SW-2026-003',
        name: 'Vikram Patel',
        mobile: '9988776655',
        wasteType: 'Food Waste',
        location: 'Main Street Plaza, Downtown',
        description: 'Overflowing organic and food waste containers from weekend food street.',
        priority: 'High',
        status: 'Resolved',
        date: '2026-09-07 09:15 AM',
        image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=500&auto=format&fit=crop&q=60',
        timeline: [
          { step: 'Report Submitted', time: 'Sep 07, 09:15 AM', done: true },
          { step: 'Assigned', time: 'Sep 07, 10:00 AM', done: true },
          { step: 'Collection in Progress', time: 'Sep 07, 11:30 AM', done: true },
          { step: 'Waste Collected', time: 'Sep 07, 01:00 PM', done: true },
          { step: 'Resolved', time: 'Sep 07, 02:30 PM', done: true }
        ]
      },
      {
        id: 'SW-2026-004',
        name: 'Priya Nair',
        mobile: '9765432190',
        wasteType: 'Paper',
        location: 'University Campus Library Backside',
        description: 'Cartons of torn cardboard boxes and examination paper bundles.',
        priority: 'Low',
        status: 'Pending',
        date: '2026-09-09 08:20 AM',
        image: '',
        timeline: [
          { step: 'Report Submitted', time: 'Sep 09, 08:20 AM', done: true },
          { step: 'Assigned', time: '', done: false },
          { step: 'Collection in Progress', time: '', done: false },
          { step: 'Waste Collected', time: '', done: false },
          { step: 'Resolved', time: '', done: false }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(initialReports));
  }

  // 2. Initial Collection Requests
  if (!localStorage.getItem(STORAGE_KEYS.COLLECTIONS)) {
    const initialCollections = [
      {
        id: 'COL-2026-001',
        wasteType: 'Plastic & Paper',
        quantity: '45 kg',
        location: 'Flat 402, Oakwood Heights, Sector 21',
        date: '2026-09-10',
        time: '10:00 AM - 12:00 PM',
        status: 'Assigned',
        requester: 'Amit Saxena',
        contact: '9811223344'
      },
      {
        id: 'COL-2026-002',
        wasteType: 'E-Waste',
        quantity: '20 kg',
        location: 'ByteCraft Solutions, 3rd Floor, Tech Park',
        date: '2026-09-10',
        time: '02:00 PM - 04:00 PM',
        status: 'Pending',
        requester: 'Neha Gupta',
        contact: '9844556677'
      },
      {
        id: 'COL-2026-003',
        wasteType: 'Construction Scrap',
        quantity: '120 kg',
        location: 'Plot 18, Sunrise Colony',
        date: '2026-09-09',
        time: '09:00 AM - 11:00 AM',
        status: 'Completed',
        requester: 'Suresh Rao',
        contact: '9733221100'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(initialCollections));
  }

  // 3. Initial Recycling Centers
  if (!localStorage.getItem(STORAGE_KEYS.CENTERS)) {
    const initialCenters = [
      {
        id: 'RC-01',
        name: 'EcoGreen Material Recovery Facility',
        location: 'North Zone Industrial Area, Sector 5',
        categories: ['Plastic', 'Paper', 'Metal'],
        hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
        phone: '+91 11-2345-6789',
        rating: '4.8 ★'
      },
      {
        id: 'RC-02',
        name: 'Urban E-Waste & Battery Recycling Center',
        location: 'Cyber City, Gate No 3, Electronics Zone',
        categories: ['E-Waste', 'Metal'],
        hours: 'Mon - Sun: 9:00 AM - 7:00 PM',
        phone: '+91 11-8765-4321',
        rating: '4.9 ★'
      },
      {
        id: 'RC-03',
        name: 'BioCycle Organic Compost Hub',
        location: 'Greenfield Agricultural Belt, South Block',
        categories: ['Organic Waste', 'Food Waste'],
        hours: 'Mon - Fri: 7:00 AM - 4:00 PM',
        phone: '+91 11-4567-8901',
        rating: '4.7 ★'
      },
      {
        id: 'RC-04',
        name: 'Metro Glass & Metal Remanufacturing Plant',
        location: 'East Corridor Heavy Logistics Park',
        categories: ['Glass', 'Metal', 'Construction Waste'],
        hours: 'Mon - Sat: 8:30 AM - 5:30 PM',
        phone: '+91 11-9876-1234',
        rating: '4.6 ★'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(initialCenters));
  }

  // 4. Initial Notifications
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    const initialNotifications = [
      {
        id: 1,
        message: 'Report SW-2026-001 status changed to "In Progress". Collector assigned.',
        time: '10 mins ago',
        unread: true,
        type: 'info'
      },
      {
        id: 2,
        message: 'Collection request COL-2026-001 has been scheduled for tomorrow morning.',
        time: '1 hour ago',
        unread: true,
        type: 'success'
      },
      {
        id: 3,
        message: 'Report SW-2026-003 was successfully resolved. Thank you for keeping your city clean!',
        time: '1 day ago',
        unread: false,
        type: 'success'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
  }

  // 5. Default User Profile
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    const defaultUser = {
      name: 'Siddharth (Citizen)',
      role: 'citizen',
      email: 'citizen@cleanconnect.org'
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
  }

  // 6. Initial Cleaning Agents
  if (!localStorage.getItem(STORAGE_KEYS.CLEANING_AGENTS)) {
    const initialAgents = [
      { id: 'CA-01', name: 'Ramesh Kumar', phone: '9823145670', ward: 'Ward 1 & 2 (North)', status: 'Active' },
      { id: 'CA-02', name: 'Suresh Yadav', phone: '9845123890', ward: 'Ward 3 & 4 (Central & Bazar)', status: 'Active' },
      { id: 'CA-03', name: 'Rajesh Shinde', phone: '9765431289', ward: 'Ward 5 & 6 (School & Hospital)', status: 'Active' },
      { id: 'CA-04', name: 'Sunita Devi', phone: '9912345678', ward: 'Ward 7 (West Colony)', status: 'Active' },
      { id: 'CA-05', name: 'Vikram Singh', phone: '9890123456', ward: 'Drainage & Heavy Clearance Team', status: 'Active' }
    ];
    localStorage.setItem(STORAGE_KEYS.CLEANING_AGENTS, JSON.stringify(initialAgents));
  }

  // 7. Initial Gutter Cleaning Requests
  if (!localStorage.getItem(STORAGE_KEYS.GUTTER_REQUESTS)) {
    const initialGutterRequests = [
      {
        id: 'GC-2026-001',
        residentName: 'Mahesh Deshmukh',
        mobile: '9876543210',
        location: 'Ward 3, Near Primary Health Center Main Drain',
        description: 'Severe sludge blockage causing dirty water overflow across pedestrian walkway. High foul odor.',
        priority: 'High',
        status: 'In Progress',
        assignedAgent: 'Suresh Yadav',
        date: '2026-09-08 10:15 AM'
      },
      {
        id: 'GC-2026-002',
        residentName: 'Kavita Patil',
        mobile: '9822334455',
        location: 'Ward 2, Shivaji Chowk Bazar Gutter Line',
        description: 'Plastic bottles and vegetable waste choking rainwater drainage culvert.',
        priority: 'High',
        status: 'Assigned',
        assignedAgent: 'Ramesh Kumar',
        date: '2026-09-09 08:30 AM'
      },
      {
        id: 'GC-2026-003',
        residentName: 'Santosh Jadhav',
        mobile: '9765123456',
        location: 'Ward 5, Backside Zilla Parishad School',
        description: 'Silt accumulation after heavy showers. Water stagnant and attracting mosquitoes.',
        priority: 'Medium',
        status: 'Pending',
        assignedAgent: 'Unassigned',
        date: '2026-09-09 01:45 PM'
      },
      {
        id: 'GC-2026-004',
        residentName: 'Anil Shinde',
        mobile: '9890765432',
        location: 'Ward 1, Gaothan Old Well Drainage Canal',
        description: 'Blocked stormwater pipe with debris. Cleared by municipal drainage crew.',
        priority: 'Low',
        status: 'Cleaned',
        assignedAgent: 'Ramesh Kumar',
        date: '2026-09-07 11:00 AM'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.GUTTER_REQUESTS, JSON.stringify(initialGutterRequests));
  }
}

// --- Data Access Helpers ---
function loadReports() {
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return data ? JSON.parse(data) : [];
}

function saveReport(report) {
  const reports = loadReports();
  reports.unshift(report);
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
}

function loadCollections() {
  const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
  return data ? JSON.parse(data) : [];
}

function saveCollection(collection) {
  const collections = loadCollections();
  collections.unshift(collection);
  localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
}

function loadGutterRequests() {
  const data = localStorage.getItem(STORAGE_KEYS.GUTTER_REQUESTS);
  return data ? JSON.parse(data) : [];
}

function saveGutterRequest(req) {
  const requests = loadGutterRequests();
  requests.unshift(req);
  localStorage.setItem(STORAGE_KEYS.GUTTER_REQUESTS, JSON.stringify(requests));
}

function loadCleaningAgents() {
  const data = localStorage.getItem(STORAGE_KEYS.CLEANING_AGENTS);
  return data ? JSON.parse(data) : [];
}

function assignCleaningAgentToGutter(requestId, agentName) {
  const requests = loadGutterRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return;

  req.assignedAgent = agentName;
  if (req.status === 'Pending' && agentName !== 'Unassigned') {
    req.status = 'Assigned';
  }
  localStorage.setItem(STORAGE_KEYS.GUTTER_REQUESTS, JSON.stringify(requests));
  createNotification(`Cleaning agent "${agentName}" assigned to Gutter Request ${requestId}`, 'info');
  showToast(`Assigned ${agentName} to ${requestId}`, 'success');

  if (typeof renderGramPanchayatDashboard === 'function') renderGramPanchayatDashboard();
  if (typeof renderCleaningAgentDashboard === 'function') renderCleaningAgentDashboard();
}

function updateGutterStatus(requestId, newStatus) {
  const requests = loadGutterRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return;

  req.status = newStatus;
  localStorage.setItem(STORAGE_KEYS.GUTTER_REQUESTS, JSON.stringify(requests));
  createNotification(`Gutter Request ${requestId} status changed to "${newStatus}"`, 'info');
  showToast(`Gutter task ${requestId} marked as ${newStatus}`, 'success');

  if (typeof renderGramPanchayatDashboard === 'function') renderGramPanchayatDashboard();
  if (typeof renderCleaningAgentDashboard === 'function') renderCleaningAgentDashboard();
}

function assignAgentToCollection(colId, agentName) {
  const collections = loadCollections();
  const col = collections.find(c => c.id === colId);
  if (!col) return;
  col.assignedAgent = agentName;
  if (col.status === 'Pending' && agentName !== 'Unassigned') {
    col.status = 'Assigned';
  }
  localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  createNotification(`Agent "${agentName}" assigned to Pickup ${colId}`, 'info');
  showToast(`Assigned ${agentName} to ${colId}`, 'success');
  if (typeof renderGramPanchayatDashboard === 'function') renderGramPanchayatDashboard();
  if (typeof renderCleaningAgentDashboard === 'function') renderCleaningAgentDashboard();
}

function assignAgentToReport(reportId, agentName) {
  const reports = loadReports();
  const rep = reports.find(r => r.id === reportId);
  if (!rep) return;
  rep.assignedAgent = agentName;
  if (rep.status === 'Pending' && agentName !== 'Unassigned') {
    rep.status = 'Assigned';
  }
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  createNotification(`Agent "${agentName}" assigned to Report ${reportId}`, 'info');
  showToast(`Assigned ${agentName} to ${reportId}`, 'success');
  if (typeof renderGramPanchayatDashboard === 'function') renderGramPanchayatDashboard();
  if (typeof renderCleaningAgentDashboard === 'function') renderCleaningAgentDashboard();
}

function loadNotifications() {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : [];
}

function saveNotifications(notifications) {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
}

function loadRecyclingCenters() {
  const data = localStorage.getItem(STORAGE_KEYS.CENTERS);
  return data ? JSON.parse(data) : [];
}

function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : { name: 'Guest Citizen', role: 'citizen' };
}

// --- ID Generators ---
function generateReportId() {
  const reports = loadReports();
  const nextNum = reports.length + 1;
  const padded = String(nextNum).padStart(3, '0');
  return `SW-2026-${padded}`;
}

function generateCollectionId() {
  const collections = loadCollections();
  const nextNum = collections.length + 1;
  const padded = String(nextNum).padStart(3, '0');
  return `COL-2026-${padded}`;
}

// --- Notification Functions ---
function createNotification(message, type = 'info') {
  const notifications = loadNotifications();
  const newNotif = {
    id: Date.now(),
    message: message,
    time: 'Just now',
    unread: true,
    type: type
  };
  notifications.unshift(newNotif);
  saveNotifications(notifications);
  displayNotifications();
  showToast(message, type);
}

function displayNotifications() {
  const notifications = loadNotifications();
  const listContainer = document.getElementById('notificationList');
  const badge = document.getElementById('notificationBadge');
  
  if (!listContainer) return;

  const unreadCount = notifications.filter(n => n.unread).length;
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  if (notifications.length === 0) {
    listContainer.innerHTML = '<li style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No new notifications</li>';
    return;
  }

  listContainer.innerHTML = notifications.map(notif => `
    <li class="notification-item ${notif.unread ? 'unread' : ''}">
      <div class="notification-icon-box">
        ${notif.type === 'success' ? '🌱' : notif.type === 'warning' ? '⚠️' : '🔔'}
      </div>
      <div class="notification-content">
        <p>${escapeHtml(notif.message)}</p>
        <span class="notification-time">${escapeHtml(notif.time)}</span>
      </div>
    </li>
  `).join('');
}

function markAllNotificationsRead() {
  const notifications = loadNotifications();
  notifications.forEach(n => n.unread = false);
  saveNotifications(notifications);
  displayNotifications();
  showToast('All notifications marked as read', 'info');
}

// --- Toast Feedback ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `
    <span style="font-weight: 800; color: var(--primary);">${icon}</span>
    <span style="font-size: 0.88rem; flex-grow: 1;">${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- Form Submissions ---

// 1. Submit Waste Report
function submitWasteReport(event) {
  event.preventDefault();

  const nameInput = document.getElementById('reportName');
  const mobileInput = document.getElementById('reportMobile');
  const wasteTypeInput = document.getElementById('reportWasteType');
  const locationInput = document.getElementById('reportLocation');
  const descInput = document.getElementById('reportDescription');
  const imagePreview = document.getElementById('reportImagePreview');
  const priorityInput = document.querySelector('input[name="reportPriority"]:checked');

  // Validate form fields
  let isValid = true;

  // Name validation
  if (!nameInput.value.trim()) {
    setError(nameInput, 'Please enter your full name.');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Mobile validation (10 digits)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobileInput.value.trim())) {
    setError(mobileInput, 'Please enter a valid 10-digit mobile number.');
    isValid = false;
  } else {
    clearError(mobileInput);
  }

  // Waste Type validation
  if (!wasteTypeInput.value) {
    setError(wasteTypeInput, 'Please select a waste category.');
    isValid = false;
  } else {
    clearError(wasteTypeInput);
  }

  // Location validation
  if (!locationInput.value.trim()) {
    setError(locationInput, 'Please provide the pickup / problem location.');
    isValid = false;
  } else {
    clearError(locationInput);
  }

  if (!isValid) {
    showToast('Please fix the highlighted errors before submitting.', 'error');
    return;
  }

  const submitBtn = document.getElementById('btnSubmitReport');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting Report...';

  setTimeout(() => {
    const reportId = generateReportId();
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newReport = {
      id: reportId,
      name: nameInput.value.trim(),
      mobile: mobileInput.value.trim(),
      wasteType: wasteTypeInput.value,
      location: locationInput.value.trim(),
      description: descInput.value.trim() || 'No additional description provided.',
      priority: priorityInput ? priorityInput.value : 'Medium',
      status: 'Pending',
      date: formattedDate,
      image: imagePreview && imagePreview.src && !imagePreview.src.includes('#') ? imagePreview.src : '',
      timeline: [
        { step: 'Report Submitted', time: formattedDate, done: true },
        { step: 'Assigned', time: '', done: false },
        { step: 'Collection in Progress', time: '', done: false },
        { step: 'Waste Collected', time: '', done: false },
        { step: 'Resolved', time: '', done: false }
      ]
    };

    saveReport(newReport);
    if (newReport.wasteType.toLowerCase().includes('gutter')) {
      const gutterId = `GC-${reportId.replace('SW-', '')}`;
      saveGutterRequest({
        id: gutterId,
        reportId: reportId,
        residentName: newReport.name,
        mobile: newReport.mobile,
        location: newReport.location,
        description: newReport.description,
        priority: newReport.priority,
        status: 'Pending',
        assignedAgent: 'Unassigned',
        date: formattedDate
      });
      createNotification(`Gutter cleaning task ${gutterId} registered for ${newReport.location}`, 'warning');
    } else {
      createNotification(`New report ${reportId} submitted for ${newReport.wasteType} at ${newReport.location}`, 'success');
    }

    // Reset Form
    document.getElementById('reportForm').reset();
    if (imagePreview) {
      imagePreview.src = '';
      document.getElementById('imagePreviewContainer').style.display = 'none';
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Refresh UI & Open Success Modal
    updateDashboard();
    updateAnalytics();
    
    document.getElementById('successReportId').textContent = reportId;
    document.getElementById('successReportStatus').textContent = 'Pending';
    openModal('modalReportSuccess');
  }, 600);
}

// 2. Submit Collection Request
function requestCollection(event) {
  event.preventDefault();

  const wasteType = document.getElementById('colWasteType');
  const quantity = document.getElementById('colQuantity');
  const location = document.getElementById('colLocation');
  const date = document.getElementById('colDate');
  const time = document.getElementById('colTime');

  let isValid = true;
  if (!wasteType.value) { setError(wasteType, 'Select waste type.'); isValid = false; } else { clearError(wasteType); }
  if (!quantity.value || quantity.value <= 0) { setError(quantity, 'Enter a valid quantity.'); isValid = false; } else { clearError(quantity); }
  if (!location.value.trim()) { setError(location, 'Enter pickup location.'); isValid = false; } else { clearError(location); }
  if (!date.value) { setError(date, 'Select a date.'); isValid = false; } else { clearError(date); }
  if (!time.value) { setError(time, 'Select a time slot.'); isValid = false; } else { clearError(time); }

  if (!isValid) return;

  const btn = document.getElementById('btnSubmitCollection');
  const oldText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Scheduling Pickup...';

  setTimeout(() => {
    const colId = generateCollectionId();
    const newCollection = {
      id: colId,
      wasteType: wasteType.value,
      quantity: `${quantity.value} kg`,
      location: location.value.trim(),
      date: date.value,
      time: time.value,
      status: 'Pending',
      requester: getCurrentUser().name,
      contact: 'Verified Resident'
    };

    saveCollection(newCollection);
    createNotification(`Pickup request ${colId} scheduled for ${newCollection.date} (${newCollection.time})`, 'success');

    document.getElementById('collectionForm').reset();
    btn.disabled = false;
    btn.innerHTML = oldText;

    updateDashboard();
    updateAnalytics();

    document.getElementById('successColId').textContent = colId;
    openModal('modalCollectionSuccess');
  }, 500);
}

// --- Status Updates (Collector & Admin) ---
function updateReportStatus(reportId, newStatus) {
  const reports = loadReports();
  const report = reports.find(r => r.id === reportId);
  if (!report) return;

  report.status = newStatus;
  const now = new Date();
  const timeStr = now.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });

  // Update timeline step
  const stepIndexMap = {
    'Pending': 0,
    'Assigned': 1,
    'In Progress': 2,
    'Collected': 3,
    'Resolved': 4
  };

  const targetIdx = stepIndexMap[newStatus] ?? 0;
  report.timeline.forEach((step, idx) => {
    if (idx <= targetIdx) {
      step.done = true;
      if (!step.time) step.time = timeStr;
    } else {
      step.done = false;
      step.time = '';
    }
  });

  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  createNotification(`Report ${reportId} marked as "${newStatus}"`, 'info');
  updateDashboard();
  updateAnalytics();
  showToast(`Report ${reportId} updated to ${newStatus}`, 'success');
}

function updateCollectionStatus(colId, newStatus) {
  const collections = loadCollections();
  const col = collections.find(c => c.id === colId);
  if (!col) return;

  col.status = newStatus;
  localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  createNotification(`Collection ${colId} updated to "${newStatus}"`, 'success');
  updateDashboard();
  updateAnalytics();
  showToast(`Collection ${colId} updated to ${newStatus}`, 'success');
}

// --- Render Functions ---
function displayReports() {
  const reports = loadReports();
  
  // 1. Citizen Dashboard Table
  const citizenTableBody = document.getElementById('citizenReportsTableBody');
  if (citizenTableBody) {
    if (reports.length === 0) {
      citizenTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No reports submitted yet.</td></tr>`;
    } else {
      citizenTableBody.innerHTML = reports.map(r => `
        <tr>
          <td><strong style="color: var(--primary-dark);">${r.id}</strong></td>
          <td>${escapeHtml(r.wasteType)}</td>
          <td>${escapeHtml(r.location)}</td>
          <td>${escapeHtml(r.date)}</td>
          <td><span class="badge badge-priority-${r.priority.toLowerCase()}">${r.priority}</span></td>
          <td><span class="badge badge-${r.status.toLowerCase().replace(' ', '-')}">${r.status}</span></td>
          <td>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-sm btn-outline-primary" onclick="viewReport('${r.id}')">View</button>
              <button class="btn btn-sm btn-primary" onclick="trackReport('${r.id}')">Track</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  // 2. Admin Reports Table
  const adminTableBody = document.getElementById('adminReportsTableBody');
  if (adminTableBody) {
    if (reports.length === 0) {
      adminTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No records found.</td></tr>`;
    } else {
      adminTableBody.innerHTML = reports.map(r => `
        <tr>
          <td><strong>${r.id}</strong></td>
          <td>${escapeHtml(r.name)} <br><small style="color:var(--text-muted)">${escapeHtml(r.mobile)}</small></td>
          <td>${escapeHtml(r.wasteType)}</td>
          <td>${escapeHtml(r.location)}</td>
          <td><span class="badge badge-priority-${r.priority.toLowerCase()}">${r.priority}</span></td>
          <td>
            <select class="form-control" style="padding: 0.3rem 0.6rem; font-size: 0.82rem;" onchange="updateReportStatus('${r.id}', this.value)">
              <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Assigned" ${r.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
              <option value="In Progress" ${r.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Resolved" ${r.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select>
          </td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="viewReport('${r.id}')">Details</button>
          </td>
        </tr>
      `).join('');
    }
  }
}

function displayCollections() {
  const collections = loadCollections();

  // 1. Citizen Dashboard Collection Table
  const citizenColBody = document.getElementById('citizenCollectionsTableBody');
  if (citizenColBody) {
    if (collections.length === 0) {
      citizenColBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No collection requests found.</td></tr>`;
    } else {
      citizenColBody.innerHTML = collections.map(c => `
        <tr>
          <td><strong style="color: var(--secondary-hover);">${c.id}</strong></td>
          <td>${escapeHtml(c.wasteType)}</td>
          <td>${escapeHtml(c.quantity)}</td>
          <td>${escapeHtml(c.location)}</td>
          <td>${escapeHtml(c.date)} (${escapeHtml(c.time)})</td>
          <td><span class="badge badge-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span></td>
        </tr>
      `).join('');
    }
  }

  // 2. Collector Dashboard Cards
  const collectorGrid = document.getElementById('collectorPickupsGrid');
  if (collectorGrid) {
    if (collections.length === 0) {
      collectorGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No pickups scheduled.</div>`;
    } else {
      collectorGrid.innerHTML = collections.map(c => `
        <div class="pickup-card">
          <div class="pickup-card-header">
            <div>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">PICKUP ID</span>
              <h4 style="color: var(--primary-dark);">${c.id}</h4>
            </div>
            <span class="badge badge-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span>
          </div>
          
          <div class="pickup-details">
            <div><strong>Waste Type:</strong> ${escapeHtml(c.wasteType)}</div>
            <div><strong>Quantity:</strong> ${escapeHtml(c.quantity)}</div>
            <div><strong>Location:</strong> ${escapeHtml(c.location)}</div>
            <div><strong>Slot:</strong> ${escapeHtml(c.date)} | ${escapeHtml(c.time)}</div>
            <div><strong>Resident:</strong> ${escapeHtml(c.requester || 'Citizen')}</div>
          </div>

          <div class="pickup-actions">
            ${c.status === 'Pending' ? `
              <button class="btn btn-sm btn-outline-primary" style="flex: 1;" onclick="updateCollectionStatus('${c.id}', 'Assigned')">Accept</button>
            ` : ''}
            ${c.status === 'Assigned' ? `
              <button class="btn btn-sm btn-secondary" style="flex: 1;" onclick="updateCollectionStatus('${c.id}', 'In Progress')">Start Collection</button>
            ` : ''}
            ${c.status === 'In Progress' ? `
              <button class="btn btn-sm btn-success" style="flex: 1;" onclick="updateCollectionStatus('${c.id}', 'Completed')">Mark as Collected</button>
            ` : ''}
            ${c.status === 'Completed' ? `
              <button class="btn btn-sm btn-outline" style="flex: 1;" disabled>✓ Completed</button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // 3. Admin Collection Requests Table
  const adminColBody = document.getElementById('adminCollectionsTableBody');
  if (adminColBody) {
    adminColBody.innerHTML = collections.map(c => `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td>${escapeHtml(c.wasteType)} (${escapeHtml(c.quantity)})</td>
        <td>${escapeHtml(c.location)}</td>
        <td>${escapeHtml(c.date)}</td>
        <td><span class="badge badge-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span></td>
        <td>
          <select class="form-control" style="padding: 0.3rem 0.6rem; font-size: 0.82rem;" onchange="updateCollectionStatus('${c.id}', this.value)">
            <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Assigned" ${c.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
            <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${c.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        </td>
      </tr>
    `).join('');
  }
}

// --- Dashboard Counter Updates ---
function updateDashboard() {
  const reports = loadReports();
  const collections = loadCollections();

  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'Pending' || r.status === 'Assigned' || r.status === 'In Progress').length;
  const resolvedReports = reports.filter(r => r.status === 'Resolved').length;
  const totalCollections = collections.length;
  const completedCollections = collections.filter(c => c.status === 'Completed').length;

  // Approximate waste calculation
  const totalKgCollected = (resolvedReports * 35) + (completedCollections * 55) + 1240;
  const totalKgRecycled = Math.round(totalKgCollected * 0.72);

  // Update Hero Counters
  setElementText('heroStatCollected', `${totalKgCollected.toLocaleString()} kg`);
  setElementText('heroStatRecycled', `${totalKgRecycled.toLocaleString()} kg`);
  setElementText('heroStatResolved', resolvedReports);
  setElementText('heroStatRequests', totalCollections);

  // Update Citizen Counters
  setElementText('citizenStatTotal', totalReports);
  setElementText('citizenStatPending', pendingReports);
  setElementText('citizenStatResolved', resolvedReports);
  setElementText('citizenStatCollections', totalCollections);
  setElementText('citizenStatKgCollected', `${totalKgCollected.toLocaleString()} kg`);
  setElementText('citizenStatKgRecycled', `${totalKgRecycled.toLocaleString()} kg`);

  // Update Collector Counters
  const assignedPickups = collections.filter(c => c.status === 'Assigned').length;
  const inProgressPickups = collections.filter(c => c.status === 'In Progress').length;
  const completedPickups = collections.filter(c => c.status === 'Completed').length;
  const pendingPickups = collections.filter(c => c.status === 'Pending').length;

  setElementText('collectorStatAssigned', assignedPickups);
  setElementText('collectorStatToday', assignedPickups + inProgressPickups);
  setElementText('collectorStatCompleted', completedPickups);
  setElementText('collectorStatPending', pendingPickups);

  // Update Admin Counters
  setElementText('adminStatTotalReports', totalReports);
  setElementText('adminStatPendingComplaints', pendingReports);
  setElementText('adminStatResolvedComplaints', resolvedReports);
  setElementText('adminStatTotalWaste', `${totalKgCollected.toLocaleString()} kg`);
  setElementText('adminStatRecyclableWaste', `${totalKgRecycled.toLocaleString()} kg`);
  setElementText('adminStatActiveCollectors', '14 active');

  displayReports();
  displayCollections();
}

// --- Tracking Modal & Timeline ---
function trackReport(reportId) {
  const reports = loadReports();
  const report = reports.find(r => r.id === reportId);
  if (!report) return;

  document.getElementById('trackModalReportId').textContent = report.id;
  document.getElementById('trackModalCategory').textContent = report.wasteType;
  document.getElementById('trackModalLocation').textContent = report.location;

  const timelineContainer = document.getElementById('trackingTimelineContainer');
  if (timelineContainer) {
    const steps = [
      { key: 'Report Submitted', label: 'Report Submitted' },
      { key: 'Assigned', label: 'Collector Assigned' },
      { key: 'Collection in Progress', label: 'In Progress' },
      { key: 'Waste Collected', label: 'Waste Collected' },
      { key: 'Resolved', label: 'Complaint Resolved' }
    ];

    // Determine current index based on status
    const statusMap = {
      'Pending': 0,
      'Assigned': 1,
      'In Progress': 2,
      'Collected': 3,
      'Resolved': 4
    };
    const currentStepIdx = statusMap[report.status] ?? 0;

    timelineContainer.innerHTML = steps.map((s, idx) => {
      let stateClass = '';
      let timeNote = '';
      if (idx < currentStepIdx) {
        stateClass = 'completed';
        timeNote = 'Completed';
      } else if (idx === currentStepIdx) {
        stateClass = 'active';
        timeNote = 'Active Stage';
      }

      return `
        <div class="timeline-step ${stateClass}">
          <div class="step-node">${idx < currentStepIdx ? '✓' : idx + 1}</div>
          <div class="step-title">${s.label}</div>
          <small style="font-size:0.72rem; color:var(--text-muted); display:block;">${timeNote}</small>
        </div>
      `;
    }).join('');
  }

  openModal('modalTrackReport');
}

// --- View Report Details Modal ---
function viewReport(reportId) {
  const reports = loadReports();
  const report = reports.find(r => r.id === reportId);
  if (!report) return;

  document.getElementById('viewModalReportId').textContent = report.id;
  document.getElementById('viewModalName').textContent = report.name;
  document.getElementById('viewModalMobile').textContent = report.mobile;
  document.getElementById('viewModalType').textContent = report.wasteType;
  document.getElementById('viewModalLocation').textContent = report.location;
  document.getElementById('viewModalDate').textContent = report.date;
  document.getElementById('viewModalPriority').textContent = report.priority;
  document.getElementById('viewModalStatus').textContent = report.status;
  document.getElementById('viewModalDesc').textContent = report.description;

  const imgEl = document.getElementById('viewModalImage');
  if (report.image) {
    imgEl.src = report.image;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  openModal('modalViewReport');
}

// --- Recycling Hub Search & Filter ---
function filterRecyclingCenters() {
  const searchInput = document.getElementById('recyclingSearchInput');
  const catFilter = document.getElementById('recyclingCategoryFilter');
  const container = document.getElementById('recyclingCentersGrid');
  
  if (!container) return;

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';
  const centers = loadRecyclingCenters();

  const filtered = centers.filter(c => {
    const matchesQuery = c.name.toLowerCase().includes(query) || c.location.toLowerCase().includes(query);
    const matchesCat = selectedCat === 'all' || c.categories.includes(selectedCat);
    return matchesQuery && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: var(--radius-md); border: 1px solid var(--border);">
        <h4>No recycling centers match your filter</h4>
        <p style="margin-top: 0.5rem;">Try searching for a different area like 'Industrial Area', 'Cyber City', or 'South Block'.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => `
    <div class="card card-interactive" style="display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <h4 style="font-size:1.1rem; color:var(--text-main);">${escapeHtml(c.name)}</h4>
          <span style="background:var(--primary-light); color:var(--primary-dark); font-size:0.8rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:var(--radius-sm);">${c.rating}</span>
        </div>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1rem;">📍 ${escapeHtml(c.location)}</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.25rem;">
          ${c.categories.map(cat => `<span class="badge" style="background:var(--bg-alt); color:var(--text-muted);">${cat}</span>`).join('')}
        </div>
      </div>
      <div style="border-top:1px solid var(--border); padding-top:1rem; font-size:0.82rem; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center;">
        <span>🕒 ${escapeHtml(c.hours)}</span>
        <a href="tel:${c.phone}" class="btn btn-sm btn-outline-primary" style="padding:0.3rem 0.7rem;">Call Center</a>
      </div>
    </div>
  `).join('');
}

// --- Global Search ---
function searchData(query) {
  const panel = document.getElementById('globalSearchResultsPanel');
  if (!panel) return;

  const q = query.toLowerCase().trim();
  if (!q) {
    panel.classList.remove('show');
    return;
  }

  const reports = loadReports();
  const collections = loadCollections();
  const centers = loadRecyclingCenters();

  const reportMatches = reports.filter(r => 
    r.id.toLowerCase().includes(q) || 
    r.location.toLowerCase().includes(q) || 
    r.wasteType.toLowerCase().includes(q)
  );

  const collectionMatches = collections.filter(c => 
    c.id.toLowerCase().includes(q) || 
    c.location.toLowerCase().includes(q) || 
    c.wasteType.toLowerCase().includes(q)
  );

  const centerMatches = centers.filter(cnt => 
    cnt.name.toLowerCase().includes(q) || 
    cnt.location.toLowerCase().includes(q)
  );

  const totalResults = reportMatches.length + collectionMatches.length + centerMatches.length;

  if (totalResults === 0) {
    panel.innerHTML = `
      <div style="padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
        No matches found for "<strong>${escapeHtml(query)}</strong>"
      </div>
    `;
    panel.classList.add('show');
    return;
  }

  let html = '';

  if (reportMatches.length > 0) {
    html += `<div style="padding: 0.5rem 1rem; background: var(--bg-alt); font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">REPORTS (${reportMatches.length})</div>`;
    reportMatches.slice(0, 3).forEach(r => {
      html += `
        <div class="search-result-item" onclick="viewReport('${r.id}'); document.getElementById('globalSearchResultsPanel').classList.remove('show');">
          <h5>${r.id} - ${escapeHtml(r.wasteType)}</h5>
          <p>📍 ${escapeHtml(r.location)} • Status: <strong>${r.status}</strong></p>
        </div>
      `;
    });
  }

  if (collectionMatches.length > 0) {
    html += `<div style="padding: 0.5rem 1rem; background: var(--bg-alt); font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">COLLECTION REQUESTS (${collectionMatches.length})</div>`;
    collectionMatches.slice(0, 3).forEach(c => {
      html += `
        <div class="search-result-item" onclick="switchDashboardTab('collectorDashboardView'); document.getElementById('globalSearchResultsPanel').classList.remove('show');">
          <h5>${c.id} - ${escapeHtml(c.wasteType)} (${escapeHtml(c.quantity)})</h5>
          <p>📍 ${escapeHtml(c.location)} • ${c.status}</p>
        </div>
      `;
    });
  }

  if (centerMatches.length > 0) {
    html += `<div style="padding: 0.5rem 1rem; background: var(--bg-alt); font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">RECYCLING CENTERS (${centerMatches.length})</div>`;
    centerMatches.slice(0, 3).forEach(cnt => {
      html += `
        <div class="search-result-item" onclick="document.getElementById('recycling').scrollIntoView({behavior:'smooth'}); document.getElementById('globalSearchResultsPanel').classList.remove('show');">
          <h5>${escapeHtml(cnt.name)}</h5>
          <p>📍 ${escapeHtml(cnt.location)}</p>
        </div>
      `;
    });
  }

  panel.innerHTML = html;
  panel.classList.add('show');
}

// --- Chart.js Visual Analytics ---
function updateAnalytics() {
  if (typeof Chart === 'undefined') return;

  const reports = loadReports();

  // 1. Waste by Category (Doughnut)
  const categoryCounts = {
    Plastic: 0,
    Paper: 0,
    'Food Waste': 0,
    'E-Waste': 0,
    'Construction Waste': 0,
    'Mixed Waste': 0,
    Other: 0
  };

  reports.forEach(r => {
    if (categoryCounts[r.wasteType] !== undefined) {
      categoryCounts[r.wasteType]++;
    } else {
      categoryCounts.Other++;
    }
  });

  const ctxCategory = document.getElementById('chartWasteCategory');
  if (ctxCategory) {
    if (chartCategory) chartCategory.destroy();
    chartCategory = new Chart(ctxCategory, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categoryCounts),
        datasets: [{
          data: Object.values(categoryCounts),
          backgroundColor: ['#10b981', '#0ea5e9', '#f59e0b', '#8b5cf6', '#64748b', '#ec4899', '#94a3b8'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, font: { family: "'Plus Jakarta Sans', sans-serif" } } }
        }
      }
    });
  }

  // 2. Recyclable vs Non-Recyclable (Pie)
  const recyclableCount = (categoryCounts.Plastic || 0) + (categoryCounts.Paper || 0) + (categoryCounts['E-Waste'] || 0);
  const nonRecyclableCount = reports.length - recyclableCount;

  const ctxRecyclable = document.getElementById('chartRecyclable');
  if (ctxRecyclable) {
    if (chartRecyclable) chartRecyclable.destroy();
    chartRecyclable = new Chart(ctxRecyclable, {
      type: 'pie',
      data: {
        labels: ['Recyclable Material', 'Non-Recyclable / Organic'],
        datasets: [{
          data: [recyclableCount || 1, nonRecyclableCount || 1],
          backgroundColor: ['#10b981', '#f59e0b'],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: "'Plus Jakarta Sans', sans-serif" } } }
        }
      }
    });
  }

  // 3. Pending vs Resolved Reports (Bar)
  const pendingCount = reports.filter(r => r.status !== 'Resolved').length;
  const resolvedCount = reports.filter(r => r.status === 'Resolved').length;

  const ctxStatus = document.getElementById('chartStatus');
  if (ctxStatus) {
    if (chartStatus) chartStatus.destroy();
    chartStatus = new Chart(ctxStatus, {
      type: 'bar',
      data: {
        labels: ['Pending Complaints', 'Resolved Complaints'],
        datasets: [{
          label: 'Count',
          data: [pendingCount, resolvedCount],
          backgroundColor: ['#f59e0b', '#10b981'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }

  // 4. Reports by Area (Horizontal Bar)
  const areaCounts = {};
  reports.forEach(r => {
    const areaName = r.location.split(',')[0].trim() || 'General';
    areaCounts[areaName] = (areaCounts[areaName] || 0) + 1;
  });

  const ctxArea = document.getElementById('chartArea');
  if (ctxArea) {
    if (chartArea) chartArea.destroy();
    chartArea = new Chart(ctxArea, {
      type: 'bar',
      data: {
        labels: Object.keys(areaCounts),
        datasets: [{
          label: 'Reports Filed',
          data: Object.values(areaCounts),
          backgroundColor: '#0ea5e9',
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }
}

// --- Dashboard Role & Tab Switcher ---
function switchDashboardTab(targetViewId) {
  if (targetViewId === 'collectorDashboardView' || targetViewId === 'cleaningAgent') {
    window.open('cleaning-agent.html', '_blank');
    return;
  }
  if (targetViewId === 'adminDashboardView' || targetViewId === 'gramPanchayat') {
    window.open('gram-panchayat.html', '_blank');
    return;
  }

  // Citizen / User Dashboard stays on main page
  const tabs = document.querySelectorAll('.tab-btn');
  const views = document.querySelectorAll('.dashboard-view');

  tabs.forEach(t => t.classList.remove('active'));
  views.forEach(v => v.classList.remove('active'));

  const targetView = document.getElementById(targetViewId || 'citizenDashboardView');
  if (targetView) targetView.classList.add('active');

  // Highlight active tab
  const activeTab = document.querySelector(`.tab-btn[data-target="${targetViewId || 'citizenDashboardView'}"]`);
  if (activeTab) activeTab.classList.add('active');

  // Scroll to dashboard section smoothly
  const dashSection = document.getElementById('dashboards');
  if (dashSection) {
    dashSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- Demo Authentication / Role Switcher ---
function loginUser(role, name, email) {
  const roleDisplayNames = {
    citizen: 'Citizen User',
    collector: 'Cleaning Agent',
    admin: 'Gram Panchayat Officer'
  };
  const user = {
    role: role,
    name: name || roleDisplayNames[role] || 'User',
    email: email || `${role}@cleanconnect.org`
  };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  updateUserUI();
  closeModal('modalLogin');
  showToast(`Active persona: ${user.name}`, 'success');

  // Open corresponding dashboard in new tab for Gram Panchayat and Cleaning Agent
  if (role === 'collector') {
    window.open('cleaning-agent.html', '_blank');
  } else if (role === 'admin') {
    window.open('gram-panchayat.html', '_blank');
  } else {
    switchDashboardTab('citizenDashboardView');
  }
}

function logoutUser() {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
    name: 'Guest Citizen',
    role: 'citizen',
    email: 'guest@smartwaste.org'
  }));
  updateUserUI();
  showToast('Logged out. Switched to Guest Citizen view.', 'info');
  switchDashboardTab('citizenDashboardView');
}

function updateUserUI() {
  const user = getCurrentUser();
  const userNameEl = document.getElementById('navUserName');
  const userRoleEl = document.getElementById('navUserRoleBadge');
  const authBtn = document.getElementById('navAuthBtn');

  if (userNameEl) userNameEl.textContent = user.name;
  if (userRoleEl) {
    userRoleEl.textContent = user.role.toUpperCase();
    userRoleEl.className = `badge badge-${user.role === 'admin' ? 'priority-high' : user.role === 'collector' ? 'in-progress' : 'completed'}`;
  }
  if (authBtn) {
    authBtn.innerHTML = user.name.includes('Guest') ? 'Demo Login' : 'Switch Role';
  }
}

// --- Modal Helper Functions ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// --- Form Validation Helpers ---
function setError(element, message) {
  element.classList.add('is-invalid');
  const feedback = element.nextElementSibling;
  if (feedback && feedback.classList.contains('invalid-feedback')) {
    feedback.textContent = message;
  }
}

function clearError(element) {
  element.classList.remove('is-invalid');
}

function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- DOM Content Loaded Setup ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Default Data
  initializeDefaultData();

  // 2. Initialize UI States
  updateUserUI();
  updateDashboard();
  displayNotifications();
  filterRecyclingCenters();

  // 3. Initialize Analytics after Chart.js is ready
  setTimeout(updateAnalytics, 300);

  // 4. Attach Form Event Listeners
  const reportForm = document.getElementById('reportForm');
  if (reportForm) {
    reportForm.addEventListener('submit', submitWasteReport);
  }

  const collectionForm = document.getElementById('collectionForm');
  if (collectionForm) {
    collectionForm.addEventListener('submit', requestCollection);
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for contacting SmartWaste. Municipal support will respond shortly!', 'success');
      contactForm.reset();
    });
  }

  // 5. Image Upload Preview Handler
  const reportFileInput = document.getElementById('reportImageFile');
  if (reportFileInput) {
    reportFileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const previewImg = document.getElementById('reportImagePreview');
          const previewContainer = document.getElementById('imagePreviewContainer');
          if (previewImg && previewContainer) {
            previewImg.src = e.target.result;
            previewContainer.style.display = 'flex';
          }
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  // 6. Global Search Handler with Debounce
  const globalSearchInput = document.getElementById('globalSearchInput');
  if (globalSearchInput) {
    let searchTimeout;
    globalSearchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => searchData(e.target.value), 200);
    });

    document.addEventListener('click', (e) => {
      const panel = document.getElementById('globalSearchResultsPanel');
      if (panel && !e.target.closest('.global-search-wrapper')) {
        panel.classList.remove('show');
      }
    });
  }

  // 7. Recycling Search & Filter Handlers
  const recyclingSearch = document.getElementById('recyclingSearchInput');
  const recyclingFilter = document.getElementById('recyclingCategoryFilter');
  if (recyclingSearch) recyclingSearch.addEventListener('input', filterRecyclingCenters);
  if (recyclingFilter) recyclingFilter.addEventListener('change', filterRecyclingCenters);

  // 8. Notification Bell Dropdown Toggle
  const notifBtn = document.getElementById('notificationToggleBtn');
  const notifPanel = document.getElementById('notificationPanel');
  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPanel.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.notification-panel') && !e.target.closest('#notificationToggleBtn')) {
        notifPanel.classList.remove('show');
      }
    });
  }

  // 9. Mobile Menu Toggle
  const mobileToggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('show'));
    });
  }

  // 10. Dashboard Tab Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#')) {
        // Direct link with valid destination - native browser event opens in new tab
        return;
      }
      const target = this.getAttribute('data-target');
      if (target) switchDashboardTab(target);
    });
  });

  // 11. Modal Close Handlers (Overlay and Buttons)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-close-modal');
      if (modalId) closeModal(modalId);
    });
  });

  // 12. Demo Login / Register Form Handlers
  const loginForm = document.getElementById('demoLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('demoRoleSelect').value;
      const name = document.getElementById('demoNameInput').value;
      const email = document.getElementById('demoEmailInput').value;
      loginUser(role, name, email);
    });
  }

  // Auto-render if on Gram Panchayat page or Cleaning Agent page
  if (document.getElementById('gpGutterTableBody')) {
    renderGramPanchayatDashboard();
  }
  if (document.getElementById('agentGutterGrid')) {
    renderCleaningAgentDashboard();
  }
});

// =========================================================================
// GRAM PANCHAYAT / ADMIN DASHBOARD LOGIC
// =========================================================================
function renderGramPanchayatDashboard() {
  const reports = loadReports();
  const collections = loadCollections();
  const gutterRequests = loadGutterRequests();
  const agents = loadCleaningAgents();

  // Metrics
  const totalGrievances = reports.length;
  const pendingComplaints = reports.filter(r => r.status !== 'Resolved').length;
  const resolvedComplaints = reports.filter(r => r.status === 'Resolved').length;
  const totalGutter = gutterRequests.length;
  const pendingGutter = gutterRequests.filter(g => g.status !== 'Cleaned').length;
  const cleanedGutter = gutterRequests.filter(g => g.status === 'Cleaned').length;

  setElementText('gpStatTotalComplaints', totalGrievances);
  setElementText('gpStatPendingComplaints', pendingComplaints);
  setElementText('gpStatResolvedComplaints', resolvedComplaints);
  setElementText('gpStatTotalGutter', totalGutter);
  setElementText('gpStatPendingGutter', pendingGutter);
  setElementText('gpStatCleanedGutter', cleanedGutter);
  setElementText('gpStatActiveAgents', `${agents.length} On Duty`);

  // 1. Gutter Cleaning Requests Table
  const gutterTableBody = document.getElementById('gpGutterTableBody');
  if (gutterTableBody) {
    if (gutterRequests.length === 0) {
      gutterTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No gutter cleaning requests logged.</td></tr>`;
    } else {
      gutterTableBody.innerHTML = gutterRequests.map(g => {
        const agentOptions = agents.map(a => `
          <option value="${escapeHtml(a.name)}" ${g.assignedAgent === a.name ? 'selected' : ''}>
            ${escapeHtml(a.name)} (${escapeHtml(a.ward)})
          </option>
        `).join('');

        const statusOptions = ['Pending', 'Assigned', 'In Progress', 'Cleaned'].map(st => `
          <option value="${st}" ${g.status === st ? 'selected' : ''}>${st}</option>
        `).join('');

        return `
          <tr>
            <td><strong style="color:var(--primary-dark);">${escapeHtml(g.id)}</strong></td>
            <td>
              <strong>${escapeHtml(g.residentName)}</strong><br>
              <small style="color:var(--text-muted);">${escapeHtml(g.mobile)}</small>
            </td>
            <td>
              <strong>${escapeHtml(g.location)}</strong><br>
              <small style="color:var(--text-muted);">${escapeHtml(g.description)}</small>
            </td>
            <td><span class="badge badge-priority-${g.priority.toLowerCase()}">${escapeHtml(g.priority)}</span></td>
            <td>${escapeHtml(g.date)}</td>
            <td><span class="badge badge-${g.status.toLowerCase().replace(' ', '-')}">${escapeHtml(g.status)}</span></td>
            <td>
              <select class="form-control form-control-sm" style="font-size:0.8rem; padding:0.3rem 0.5rem; min-width:140px;" onchange="assignCleaningAgentToGutter('${g.id}', this.value)">
                <option value="Unassigned" ${g.assignedAgent === 'Unassigned' ? 'selected' : ''}>-- Assign Agent --</option>
                ${agentOptions}
              </select>
            </td>
            <td>
              <select class="form-control form-control-sm" style="font-size:0.8rem; padding:0.3rem 0.5rem; min-width:110px;" onchange="updateGutterStatus('${g.id}', this.value)">
                ${statusOptions}
              </select>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 2. Waste Grievance Reports Table
  const reportsTableBody = document.getElementById('gpReportsTableBody');
  if (reportsTableBody) {
    if (reports.length === 0) {
      reportsTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No reports filed yet.</td></tr>`;
    } else {
      reportsTableBody.innerHTML = reports.map(r => {
        const agentOptions = agents.map(a => `
          <option value="${escapeHtml(a.name)}" ${r.assignedAgent === a.name ? 'selected' : ''}>
            ${escapeHtml(a.name)}
          </option>
        `).join('');

        return `
          <tr>
            <td><strong>${escapeHtml(r.id)}</strong></td>
            <td>${escapeHtml(r.name)}<br><small style="color:var(--text-muted)">${escapeHtml(r.mobile)}</small></td>
            <td>${escapeHtml(r.wasteType)}</td>
            <td>${escapeHtml(r.location)}</td>
            <td><span class="badge badge-priority-${r.priority.toLowerCase()}">${escapeHtml(r.priority)}</span></td>
            <td>
              <select class="form-control form-control-sm" style="font-size:0.82rem; padding:0.3rem 0.5rem;" onchange="updateReportStatus('${r.id}', this.value)">
                <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Assigned" ${r.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
                <option value="In Progress" ${r.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Resolved" ${r.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
              </select>
            </td>
            <td>
              <select class="form-control form-control-sm" style="font-size:0.82rem; padding:0.3rem 0.5rem;" onchange="assignAgentToReport('${r.id}', this.value)">
                <option value="Unassigned" ${!r.assignedAgent || r.assignedAgent === 'Unassigned' ? 'selected' : ''}>-- Assign Agent --</option>
                ${agentOptions}
              </select>
            </td>
            <td>
              <button type="button" class="btn btn-sm btn-outline" onclick="viewReport('${r.id}')">View</button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 3. Collection Requests Table
  const colTableBody = document.getElementById('gpCollectionsTableBody');
  if (colTableBody) {
    if (collections.length === 0) {
      colTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No pickups scheduled.</td></tr>`;
    } else {
      colTableBody.innerHTML = collections.map(c => {
        const agentOptions = agents.map(a => `
          <option value="${escapeHtml(a.name)}" ${c.assignedAgent === a.name ? 'selected' : ''}>
            ${escapeHtml(a.name)}
          </option>
        `).join('');

        return `
          <tr>
            <td><strong>${escapeHtml(c.id)}</strong></td>
            <td>${escapeHtml(c.wasteType)} (${escapeHtml(c.quantity)})</td>
            <td>${escapeHtml(c.location)}</td>
            <td>${escapeHtml(c.date)} (${escapeHtml(c.time)})</td>
            <td>
              <select class="form-control form-control-sm" style="font-size:0.82rem; padding:0.3rem 0.5rem;" onchange="updateCollectionStatus('${c.id}', this.value)">
                <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Assigned" ${c.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
                <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${c.status === 'Completed' ? 'selected' : ''}>Completed</option>
              </select>
            </td>
            <td>
              <select class="form-control form-control-sm" style="font-size:0.82rem; padding:0.3rem 0.5rem;" onchange="assignAgentToCollection('${c.id}', this.value)">
                <option value="Unassigned" ${!c.assignedAgent || c.assignedAgent === 'Unassigned' ? 'selected' : ''}>-- Assign Agent --</option>
                ${agentOptions}
              </select>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

// =========================================================================
// CLEANING AGENT DASHBOARD LOGIC
// =========================================================================
function renderCleaningAgentDashboard() {
  const gutterRequests = loadGutterRequests();
  const collections = loadCollections();
  const reports = loadReports();

  const filterSelect = document.getElementById('agentFilterSelect');
  const selectedAgent = filterSelect ? filterSelect.value : 'all';

  // Filter tasks for this agent
  const myGutter = selectedAgent === 'all' 
    ? gutterRequests 
    : gutterRequests.filter(g => g.assignedAgent === selectedAgent || g.assignedAgent === 'Unassigned');

  const myCollections = selectedAgent === 'all'
    ? collections
    : collections.filter(c => c.assignedAgent === selectedAgent || (!c.assignedAgent && c.status !== 'Completed'));

  const myReports = selectedAgent === 'all'
    ? reports
    : reports.filter(r => r.assignedAgent === selectedAgent);

  // Metrics
  const totalTasks = myGutter.length + myCollections.length + myReports.length;
  const activeGutter = myGutter.filter(g => g.status === 'Assigned' || g.status === 'In Progress').length;
  const activePickups = myCollections.filter(c => c.status === 'Assigned' || c.status === 'In Progress').length;
  const completedTasks = myGutter.filter(g => g.status === 'Cleaned').length + 
                         myCollections.filter(c => c.status === 'Completed').length +
                         myReports.filter(r => r.status === 'Resolved').length;

  setElementText('agentStatTotalTasks', totalTasks);
  setElementText('agentStatActiveGutter', activeGutter);
  setElementText('agentStatActivePickups', activePickups);
  setElementText('agentStatCompletedToday', completedTasks);

  // 1. Gutter Tasks Action Center
  const gutterContainer = document.getElementById('agentGutterGrid');
  if (gutterContainer) {
    if (myGutter.length === 0) {
      gutterContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted); background:#fff; border-radius:var(--radius-md); border:1px solid var(--border);">No gutter cleaning tasks assigned currently. Clean and clear!</div>`;
    } else {
      gutterContainer.innerHTML = myGutter.map(g => `
        <div class="pickup-card" style="border-left: 4px solid ${g.status === 'Cleaned' ? 'var(--primary)' : g.status === 'In Progress' ? 'var(--secondary)' : 'var(--accent)'};">
          <div class="pickup-card-header">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">GUTTER TASK</span>
              <h4 style="color: var(--primary-dark); font-size:1.1rem;">${escapeHtml(g.id)}</h4>
            </div>
            <div style="display:flex; gap:0.4rem; align-items:center;">
              <span class="badge badge-priority-${g.priority.toLowerCase()}">${escapeHtml(g.priority)}</span>
              <span class="badge badge-${g.status.toLowerCase().replace(' ', '-')}">${escapeHtml(g.status)}</span>
            </div>
          </div>

          <div class="pickup-details" style="margin: 0.75rem 0;">
            <div><strong>📍 Location:</strong> ${escapeHtml(g.location)}</div>
            <div><strong>⚠️ Issue:</strong> ${escapeHtml(g.description)}</div>
            <div><strong>👤 Resident:</strong> ${escapeHtml(g.residentName)} (${escapeHtml(g.mobile)})</div>
            <div><strong>👷 Assigned To:</strong> <span style="color:var(--primary-dark); font-weight:700;">${escapeHtml(g.assignedAgent)}</span></div>
            <div><strong>🕒 Logged:</strong> ${escapeHtml(g.date)}</div>
          </div>

          <div class="pickup-actions" style="display:flex; gap:0.5rem; margin-top:1rem;">
            ${g.status === 'Pending' ? `
              <button type="button" class="btn btn-sm btn-outline-primary" style="flex:1;" onclick="updateGutterStatus('${g.id}', 'Assigned')">Accept Task</button>
            ` : ''}
            ${g.status === 'Assigned' ? `
              <button type="button" class="btn btn-sm btn-secondary" style="flex:1;" onclick="updateGutterStatus('${g.id}', 'In Progress')">Start Cleaning (In Progress)</button>
            ` : ''}
            ${g.status === 'In Progress' ? `
              <button type="button" class="btn btn-sm btn-success" style="flex:1;" onclick="updateGutterStatus('${g.id}', 'Cleaned')">Mark as Cleaned ✓</button>
            ` : ''}
            ${g.status === 'Cleaned' ? `
              <button type="button" class="btn btn-sm btn-outline" style="flex:1;" disabled>✓ Cleaned & Clear</button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // 2. Doorstep Pickups Action Center
  const pickupsContainer = document.getElementById('agentPickupsGrid');
  if (pickupsContainer) {
    if (myCollections.length === 0) {
      pickupsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted); background:#fff; border-radius:var(--radius-md); border:1px solid var(--border);">No waste pickups assigned.</div>`;
    } else {
      pickupsContainer.innerHTML = myCollections.map(c => `
        <div class="pickup-card">
          <div class="pickup-card-header">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">PICKUP ID</span>
              <h4 style="color: var(--secondary-hover); font-size:1.1rem;">${escapeHtml(c.id)}</h4>
            </div>
            <span class="badge badge-${c.status.toLowerCase().replace(' ', '-')}">${escapeHtml(c.status)}</span>
          </div>

          <div class="pickup-details" style="margin: 0.75rem 0;">
            <div><strong>📦 Type:</strong> ${escapeHtml(c.wasteType)} (${escapeHtml(c.quantity)})</div>
            <div><strong>📍 Address:</strong> ${escapeHtml(c.location)}</div>
            <div><strong>📅 Preferred Slot:</strong> ${escapeHtml(c.date)} | ${escapeHtml(c.time)}</div>
            <div><strong>👤 Resident:</strong> ${escapeHtml(c.requester || 'Citizen')}</div>
            ${c.assignedAgent ? `<div><strong>👷 Assigned To:</strong> ${escapeHtml(c.assignedAgent)}</div>` : ''}
          </div>

          <div class="pickup-actions" style="display:flex; gap:0.5rem; margin-top:1rem;">
            ${c.status === 'Pending' ? `
              <button type="button" class="btn btn-sm btn-outline-primary" style="flex:1;" onclick="updateCollectionStatus('${c.id}', 'Assigned')">Accept Pickup</button>
            ` : ''}
            ${c.status === 'Assigned' ? `
              <button type="button" class="btn btn-sm btn-secondary" style="flex:1;" onclick="updateCollectionStatus('${c.id}', 'In Progress')">Start Pickup</button>
            ` : ''}
            ${c.status === 'In Progress' ? `
              <button type="button" class="btn btn-sm btn-success" style="flex:1;" onclick="updateCollectionStatus('${c.id}', 'Completed')">Mark Collected ✓</button>
            ` : ''}
            ${c.status === 'Completed' ? `
              <button type="button" class="btn btn-sm btn-outline" style="flex:1;" disabled>✓ Completed</button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // 3. Assigned Grievance Reports Action Center
  const reportsContainer = document.getElementById('agentReportsGrid');
  if (reportsContainer) {
    if (myReports.length === 0) {
      reportsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted); background:#fff; border-radius:var(--radius-md); border:1px solid var(--border);">No grievance reports assigned.</div>`;
    } else {
      reportsContainer.innerHTML = myReports.map(r => `
        <div class="pickup-card">
          <div class="pickup-card-header">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">REPORT ID</span>
              <h4 style="color: var(--primary-dark); font-size:1.1rem;">${escapeHtml(r.id)}</h4>
            </div>
            <span class="badge badge-${r.status.toLowerCase().replace(' ', '-')}">${escapeHtml(r.status)}</span>
          </div>

          <div class="pickup-details" style="margin: 0.75rem 0;">
            <div><strong>📢 Category:</strong> ${escapeHtml(r.wasteType)}</div>
            <div><strong>📍 Location:</strong> ${escapeHtml(r.location)}</div>
            <div><strong>⚠️ Severity:</strong> <span class="badge badge-priority-${r.priority.toLowerCase()}">${escapeHtml(r.priority)}</span></div>
            <div><strong>👤 Reporter:</strong> ${escapeHtml(r.name)} (${escapeHtml(r.mobile)})</div>
            <div><strong>📝 Note:</strong> ${escapeHtml(r.description)}</div>
          </div>

          <div class="pickup-actions" style="display:flex; gap:0.5rem; margin-top:1rem;">
            ${r.status === 'Pending' ? `
              <button type="button" class="btn btn-sm btn-outline-primary" style="flex:1;" onclick="updateReportStatus('${r.id}', 'Assigned')">Accept Task</button>
            ` : ''}
            ${r.status === 'Assigned' ? `
              <button type="button" class="btn btn-sm btn-secondary" style="flex:1;" onclick="updateReportStatus('${r.id}', 'In Progress')">Start Clearance</button>
            ` : ''}
            ${r.status === 'In Progress' ? `
              <button type="button" class="btn btn-sm btn-success" style="flex:1;" onclick="updateReportStatus('${r.id}', 'Resolved')">Mark Resolved ✓</button>
            ` : ''}
            ${r.status === 'Resolved' ? `
              <button type="button" class="btn btn-sm btn-outline" style="flex:1;" disabled>✓ Site Cleared</button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }
}

// Cross-tab real-time sync via localStorage events
window.addEventListener('storage', (e) => {
  if (e.key && e.key.startsWith('smartwaste_')) {
    if (typeof updateDashboard === 'function') updateDashboard();
    if (typeof renderGramPanchayatDashboard === 'function') renderGramPanchayatDashboard();
    if (typeof renderCleaningAgentDashboard === 'function') renderCleaningAgentDashboard();
    if (typeof displayNotifications === 'function') displayNotifications();
  }
});

// Export to window for global access
window.STORAGE_KEYS = STORAGE_KEYS;
window.loadReports = loadReports;
window.saveReport = saveReport;
window.loadCollections = loadCollections;
window.saveCollection = saveCollection;
window.loadGutterRequests = loadGutterRequests;
window.saveGutterRequest = saveGutterRequest;
window.loadCleaningAgents = loadCleaningAgents;
window.assignCleaningAgentToGutter = assignCleaningAgentToGutter;
window.updateGutterStatus = updateGutterStatus;
window.assignAgentToCollection = assignAgentToCollection;
window.assignAgentToReport = assignAgentToReport;
window.updateReportStatus = updateReportStatus;
window.updateCollectionStatus = updateCollectionStatus;
window.switchDashboardTab = switchDashboardTab;
window.loginUser = loginUser;
window.renderGramPanchayatDashboard = renderGramPanchayatDashboard;
window.renderCleaningAgentDashboard = renderCleaningAgentDashboard;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.viewReport = viewReport;
window.trackReport = trackReport;
window.markAllNotificationsRead = markAllNotificationsRead;
window.logoutUser = logoutUser;
