import React, { useState, useEffect } from 'react';

function CalendarCard() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [tomorrowEvents, setTomorrowEvents] = useState([]);
  const [customDateEvents, setCustomDateEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // API Configuration
  const API_KEY = 'AIzaSyAO3ojR5QElW7on3lefOPhWwB0B1dE9cr4';
  const CALENDAR_ID = 'c_06e2e787cefb7c612341319e806f163a36e131fcf395949eceb69021abea7b05@group.calendar.google.com';
  const BASE_URL = 'https://www.googleapis.com/calendar/v3';

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const fetchCalendarEvents = async (timeMin, timeMax, retryCount = 0) => {
    try {
      const params = new URLSearchParams({
        key: API_KEY,
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 50,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
      });

      const url = `${BASE_URL}/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`;
      const response = await fetch(url);
      
      if (response.status === 429) {
        if (retryCount < 3) {
          const waitTime = 2000 * (retryCount + 1);
          console.log(`Rate limit, retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return fetchCalendarEvents(timeMin, timeMax, retryCount + 1);
        }
        throw new Error('Rate limit exceeded');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  };

  const fetchTodayEvents = async () => {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    return fetchCalendarEvents(startOfDay, endOfDay);
  };

  const fetchTomorrowEvents = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfTomorrow = new Date(tomorrow);
    startOfTomorrow.setHours(0, 0, 0, 0);
    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);
    return fetchCalendarEvents(startOfTomorrow, endOfTomorrow);
  };

  const fetchEventsByDate = async (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return fetchCalendarEvents(startOfDay, endOfDay);
  };

  const loadAllEvents = async () => {
    try {
      const [today, tomorrow] = await Promise.all([
        fetchTodayEvents(),
        fetchTomorrowEvents()
      ]);
      
      setTodayEvents(today);
      setTomorrowEvents(tomorrow);
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      console.error('Failed to load calendar events:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomDateEvents = async (date) => {
    if (!date) return;
    
    try {
      const events = await fetchEventsByDate(date);
      setCustomDateEvents(events);
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      console.error('Failed to load custom date events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    loadCustomDateEvents(date);
    setShowCustomDate(true);
  };

  const handleResetToDefault = () => {
    setShowCustomDate(false);
    setSelectedDate(null);
    loadAllEvents();
  };

  const formatEventTime = (event) => {
    const start = event.start?.dateTime;
    if (!start) return 'All day';
    
    const date = new Date(start);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  useEffect(() => {
    if (showCustomDate) {
      if (selectedDate) {
        loadCustomDateEvents(selectedDate);
        const interval = setInterval(() => {
          loadCustomDateEvents(selectedDate);
        }, 10000);
        return () => clearInterval(interval);
      }
    } else {
      loadAllEvents();
      const interval = setInterval(loadAllEvents, 10000);
      return () => clearInterval(interval);
    }
  }, [showCustomDate, selectedDate]);

  // Loading state
  if (loading && todayEvents.length === 0 && !showCustomDate) {
    return (
      <div className="card calendar-card">
        <h2>📅 CALENDAR</h2>
        <div className="calendar-section">
          <p style={{ color: 'white', textAlign: 'center' }}>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card calendar-card">
      {/* Header dengan filter - TETAP DI ATAS GARIS */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '8px', 
        flexWrap: 'wrap', 
        gap: '8px' 
      }}>
        <h2 style={{ margin: 0, flex: 1 }}>📅 CALENDAR</h2>
        
        {/* Filter Tanggal - DIPERKECIL */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="date"
            onChange={(e) => handleDateSelect(new Date(e.target.value))}
            style={{
              padding: '3px 6px',
              fontSize: '0.65rem',
              borderRadius: '6px',
              border: '1px solid #4a5568',
              background: '#2d3a5a',
              color: 'white',
              cursor: 'pointer',
              width: '115px'
            }}
          />
          
          {showCustomDate && (
            <button
              onClick={handleResetToDefault}
              style={{
                padding: '3px 8px',
                fontSize: '0.65rem',
                borderRadius: '6px',
                border: '1px solid #4a5568',
                cursor: 'pointer',
                background: '#ff8a8a',
                color: 'white'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* TAMPILAN DEFAULT: TODAY & TOMORROW */}
      {!showCustomDate && (
        <>
          <div className="calendar-section">
            <h3>TODAY</h3>
            {todayEvents.length === 0 ? (
              <p style={{ color: '#b0c4de', fontSize: '0.7rem', padding: '4px 0' }}>
                No events scheduled
              </p>
            ) : (
              <ul className="calendar-list">
                {todayEvents.map((event) => (
                  <li key={event.id}>
                    <span className="calendar-time">{formatEventTime(event)}</span>
                    <span>{event.summary}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="calendar-section">
            <h3>TOMORROW</h3>
            {tomorrowEvents.length === 0 ? (
              <p style={{ color: '#b0c4de', fontSize: '0.7rem', padding: '4px 0' }}>
                No events scheduled
              </p>
            ) : (
              <ul className="calendar-list">
                {tomorrowEvents.map((event) => (
                  <li key={event.id}>
                    <span className="calendar-time">{formatEventTime(event)}</span>
                    <span>{event.summary}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      
      {/* TAMPILAN CUSTOM: Event di tanggal tertentu */}
      {showCustomDate && (
        <div className="calendar-section">
          <h3 style={{ 
            color: '#7fc9ff',
            borderBottom: '2px solid #7fc9ff',
            paddingBottom: '4px',
            marginBottom: '8px'
          }}>
            {selectedDate && formatDisplayDate(selectedDate)}
          </h3>
          
          {loading ? (
            <p style={{ color: 'white', textAlign: 'center', fontSize: '0.7rem' }}>
              Loading events...
            </p>
          ) : customDateEvents.length === 0 ? (
            <p style={{ color: '#b0c4de', fontSize: '0.7rem', padding: '8px 0', textAlign: 'center' }}>
              No events scheduled for this date
            </p>
          ) : (
            <ul className="calendar-list">
              {customDateEvents.map((event) => (
                <li key={event.id} style={{
                  padding: '6px 0',
                  borderBottom: '1px solid #4a5568'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="calendar-time">{formatEventTime(event)}</span>
                    <span style={{ flex: 1 }}>{event.summary}</span>
                  </div>
                  {event.location && (
                    <div style={{ fontSize: '0.6rem', color: '#b0c4de', marginLeft: '46px' }}>
                      📍 {event.location}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarCard;