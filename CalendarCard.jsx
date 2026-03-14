import React from 'react';

function CalendarCard() {
    return (
        <div className="card calendar-card">
            <h2>📅 CALENDAR</h2>
            
            <div className="calendar-section">
                <h3>TODAY</h3>
                <ul className="calendar-list">
                    <li><span className="calendar-time">09:00</span> Meeting Procurement</li>
                    <li><span className="calendar-time">11:00</span> Server Maintenance</li>
                    <li><span className="calendar-time">14:00</span> Sprint Review (Ongoing)</li>
                </ul>
            </div>

            <div className="calendar-section">
                <h3>TOMORROW</h3>
                <ul className="calendar-list">
                    <li><span className="calendar-time">10:00</span> Vendor Discussion</li>
                    <li><span className="calendar-time">15:00</span> Feature Planning</li>
                </ul>
            </div>
        </div>
    );
}

export default CalendarCard;