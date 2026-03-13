import React from 'react';

function CalendarCard() {
    const events = {
        today: [
            { time: '09:00', title: 'Meeting Procurement' },
            { time: '11:00', title: 'Server Maintenance' },
            { time: '14:00', title: 'Sprint Review (Ongoing)' }
        ],
        tomorrow: [
            { time: '10:00', title: 'Vendor Discussion' },
            { time: '15:00', title: 'Feature Planning' }
        ]
    };

    return (
        <div className="card">
            <h2>📅 CALENDAR</h2>
            <div className="card-content">
                <div className="calendar-section">
                    <h3>TODAY</h3>
                    {events.today.map((event, index) => (
                        <div key={index} className="event-item">
                            <span className="event-time">{event.time}</span>
                            <span className="event-title">{event.title}</span>
                        </div>
                    ))}
                </div>
                
                <div className="calendar-section">
                    <h3>TOMORROW</h3>
                    {events.tomorrow.map((event, index) => (
                        <div key={index} className="event-item">
                            <span className="event-time">{event.time}</span>
                            <span className="event-title">{event.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CalendarCard;