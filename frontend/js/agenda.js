// ===== VARIABLES GLOBALES =====
let currentDate = new Date();
let events = {};
let selectedEvent = null;
let editingEventId = null;

const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    renderCalendar();
    renderMiniCalendar();
    renderUpcomingEvents();
    attachEventListeners();
});

// ===== GESTION DES ÉVÉNEMENTS (STOCKAGE) =====
function loadEvents() {
    const stored = localStorage.getItem('magicEventsAgenda');
    if (stored) {
        events = JSON.parse(stored);
    } else {
        // Événements de démonstration
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        events = {
            [generateId()]: {
                title: 'Consultation Mariage Martin',
                date: formatDate(today),
                time: '14:00',
                type: 'consultation',
                clientName: 'M. et Mme Martin',
                clientPhone: '+596 696 12 34 56',
                clientEmail: 'martin@email.com',
                notes: 'Premier rendez-vous pour planifier le mariage'
            },
            [generateId()]: {
                title: 'Anniversaire 50 ans',
                date: formatDate(tomorrow),
                time: '19:00',
                type: 'fete',
                clientName: 'Sophie Dubois',
                clientPhone: '+596 696 98 76 54',
                clientEmail: 'sophie@email.com',
                notes: 'Fête surprise, 80 invités prévus'
            }
        };
        saveEvents();
    }
}

function saveEvents() {
    localStorage.setItem('magicEventsAgenda', JSON.stringify(events));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ===== RENDU DU CALENDRIER PRINCIPAL =====
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('currentMonthYear').textContent = 
        `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    const lastDatePrevMonth = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    // Jours du mois précédent
    for (let i = firstDayWeek - 1; i > 0; i--) {
        const day = lastDatePrevMonth - i + 1;
        const date = new Date(year, month - 1, day);
        grid.appendChild(createDayElement(date, true));
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= lastDate; day++) {
        const date = new Date(year, month, day);
        grid.appendChild(createDayElement(date, false));
    }
    
    // Jours du mois suivant
    const remainingCells = 42 - grid.children.length;
    for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day);
        grid.appendChild(createDayElement(date, true));
    }
}

function createDayElement(date, isOtherMonth) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    if (isOtherMonth) dayEl.classList.add('other-month');
    
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        dayEl.classList.add('today');
    }
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayEl.appendChild(dayNumber);
    
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'day-events';
    
    const dateStr = formatDate(date);
    const dayEvents = Object.entries(events).filter(([id, event]) => event.date === dateStr);
    
    dayEvents.forEach(([id, event]) => {
        const eventEl = document.createElement('div');
        eventEl.className = `calendar-event ${event.type}`;
        eventEl.textContent = event.title;
        eventEl.onclick = (e) => {
            e.stopPropagation();
            showEventDetails(id);
        };
        eventsContainer.appendChild(eventEl);
    });
    
    dayEl.appendChild(eventsContainer);
    
    dayEl.onclick = () => {
        openEventModal(dateStr);
    };
    
    return dayEl;
}

// ===== MINI CALENDRIER =====
function renderMiniCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('miniMonthYear').textContent = 
        `${monthNames[month]} ${year}`;
    
    const grid = document.getElementById('miniCalendarGrid');
    grid.innerHTML = '';
    
    // Jours de la semaine
    const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    dayNames.forEach(name => {
        const dayEl = document.createElement('div');
        dayEl.className = 'mini-day';
        dayEl.style.fontWeight = '600';
        dayEl.style.color = '#999';
        dayEl.textContent = name;
        grid.appendChild(dayEl);
    });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    const lastDatePrevMonth = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    
    // Jours du mois précédent
    for (let i = firstDayWeek - 1; i > 0; i--) {
        const day = lastDatePrevMonth - i + 1;
        const dayEl = document.createElement('div');
        dayEl.className = 'mini-day other-month';
        dayEl.textContent = day;
        grid.appendChild(dayEl);
    }
    
    // Jours du mois actuel
    const today = new Date();
    for (let day = 1; day <= lastDate; day++) {
        const date = new Date(year, month, day);
        const dayEl = document.createElement('div');
        dayEl.className = 'mini-day';
        dayEl.textContent = day;
        
        if (date.toDateString() === today.toDateString()) {
            dayEl.classList.add('today');
        }
        
        const dateStr = formatDate(date);
        const hasEvents = Object.values(events).some(event => event.date === dateStr);
        if (hasEvents) {
            dayEl.classList.add('has-event');
        }
        
        dayEl.onclick = () => {
            currentDate = new Date(year, month, day);
            renderCalendar();
            renderMiniCalendar();
        };
        
        grid.appendChild(dayEl);
    }
    
    // Jours du mois suivant
    const remainingCells = 42 - grid.children.length;
    for (let day = 1; day <= remainingCells; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'mini-day other-month';
        dayEl.textContent = day;
        grid.appendChild(dayEl);
    }
}

// ===== PROCHAINS ÉVÉNEMENTS =====
function renderUpcomingEvents() {
    const list = document.getElementById('upcomingList');
    list.innerHTML = '';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = Object.entries(events)
        .filter(([id, event]) => new Date(event.date) >= today)
        .sort((a, b) => {
            const dateA = new Date(a[1].date + ' ' + a[1].time);
            const dateB = new Date(b[1].date + ' ' + b[1].time);
            return dateA - dateB;
        })
        .slice(0, 5);
    
    if (upcoming.length === 0) {
        list.innerHTML = '<p style="color: #999; font-size: 13px;">Aucun rendez-vous à venir</p>';
        return;
    }
    
    upcoming.forEach(([id, event]) => {
        const item = document.createElement('div');
        item.className = 'upcoming-item';
        
        const eventDate = new Date(event.date);
        const dateStr = eventDate.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'short' 
        });
        
        item.innerHTML = `
            <div class="upcoming-item-date">${dateStr} à ${event.time}</div>
            <div class="upcoming-item-title">${event.title}</div>
            <div class="upcoming-item-type">${getTypeLabel(event.type)}</div>
        `;
        
        item.onclick = () => showEventDetails(id);
        list.appendChild(item);
    });
}

function getTypeLabel(type) {
    const labels = {
        'mariage': 'Mariage',
        'fete': 'Fête Privée',
        'entreprise': 'Événement d\'Entreprise',
        'consultation': 'Consultation',
        'autre': 'Autre'
    };
    return labels[type] || type;
}

// ===== MODAL CRÉATION/ÉDITION =====
function openEventModal(date = null) {
    const modal = document.getElementById('eventModal');
    const form = document.getElementById('eventForm');
    
    form.reset();
    editingEventId = null;
    
    if (date) {
        document.getElementById('eventDate').value = date;
    } else {
        document.getElementById('eventDate').value = formatDate(new Date());
    }
    
    document.getElementById('modalTitle').textContent = 'Nouveau Rendez-vous';
    modal.classList.add('active');
}

function closeEventModal() {
    document.getElementById('eventModal').classList.remove('active');
}

function showEventDetails(eventId) {
    const event = events[eventId];
    if (!event) return;
    
    selectedEvent = eventId;
    const modal = document.getElementById('eventDetailsModal');
    const content = document.getElementById('eventDetailsContent');
    
    const eventDate = new Date(event.date);
    const dateStr = eventDate.toLocaleDateString('fr-FR', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    content.innerHTML = `
        <div class="detail-row">
            <div class="detail-label">Titre</div>
            <div class="detail-value">${event.title}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Type</div>
            <div class="detail-value">
                <span class="event-type-badge ${event.type}">${getTypeLabel(event.type)}</span>
            </div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Date et heure</div>
            <div class="detail-value">${dateStr} à ${event.time}</div>
        </div>
        ${event.clientName ? `
        <div class="detail-row">
            <div class="detail-label">Client</div>
            <div class="detail-value">${event.clientName}</div>
        </div>
        ` : ''}
        ${event.clientPhone ? `
        <div class="detail-row">
            <div class="detail-label">Téléphone</div>
            <div class="detail-value">${event.clientPhone}</div>
        </div>
        ` : ''}
        ${event.clientEmail ? `
        <div class="detail-row">
            <div class="detail-label">Email</div>
            <div class="detail-value">${event.clientEmail}</div>
        </div>
        ` : ''}
        ${event.notes ? `
        <div class="detail-row">
            <div class="detail-label">Notes</div>
            <div class="detail-value">${event.notes}</div>
        </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
}

function closeEventDetailsModal() {
    document.getElementById('eventDetailsModal').classList.remove('active');
    selectedEvent = null;
}

function editEvent() {
    if (!selectedEvent) return;

    const event = events[selectedEvent];
    editingEventId = selectedEvent;

    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventType').value = event.type;
    document.getElementById('clientName').value = event.clientName || '';
    document.getElementById('clientPhone').value = event.clientPhone || '';
    document.getElementById('clientEmail').value = event.clientEmail || '';
    document.getElementById('eventNotes').value = event.notes || '';

    document.getElementById('modalTitle').textContent = 'Modifier le rendez-vous';
    document.getElementById('eventDetailsModal').classList.remove('active');
    document.getElementById('eventModal').classList.add('active');
}

function deleteEvent() {
    if (!selectedEvent) return;
    const confirmDelete = confirm('Supprimer ce rendez-vous ?');
    if (!confirmDelete) return;

    delete events[selectedEvent];
    saveEvents();
    selectedEvent = null;

    closeEventDetailsModal();
    renderCalendar();
    renderMiniCalendar();
    renderUpcomingEvents();
}

// ===== ENREGISTREMENT DE L'ÉVÉNEMENT =====
function handleEventSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('eventTitle').value.trim();
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const type = document.getElementById('eventType').value;
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const notes = document.getElementById('eventNotes').value.trim();

    if (!title || !date || !time) {
        alert('Merci de remplir le titre, la date et l\'heure.');
        return;
    }

    const eventData = {
        title,
        date,
        time,
        type,
        clientName,
        clientPhone,
        clientEmail,
        notes
    };

    if (editingEventId) {
        events[editingEventId] = eventData;
    } else {
        const id = generateId();
        events[id] = eventData;
    }

    saveEvents();
    closeEventModal();
    renderCalendar();
    renderMiniCalendar();
    renderUpcomingEvents();
}

// ===== NAVIGATION DU CALENDRIER =====
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
    renderMiniCalendar();
}

// ===== AJOUT DES ÉCOUTEURS =====
function attachEventListeners() {
    document.getElementById('prevMonth').onclick = () => changeMonth(-1);
    document.getElementById('nextMonth').onclick = () => changeMonth(1);
    document.getElementById('closeModal').onclick = closeEventModal;
    document.getElementById('closeDetailsModal').onclick = closeEventDetailsModal;

    const form = document.getElementById('eventForm');
    form.addEventListener('submit', handleEventSubmit);

    document.getElementById('editEventBtn').onclick = editEvent;
    document.getElementById('deleteEventBtn').onclick = deleteEvent;
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    renderCalendar();
    renderMiniCalendar();
    renderUpcomingEvents();
    attachEventListeners();
});
