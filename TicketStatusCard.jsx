import React from 'react';

function TicketStatusCard() {
    const ticketStats = [
        { label: 'Open', value: 12, color: '#2E5A7F' },
        { label: 'In Progress', value: 5, color: '#C6A43F' },
        { label: 'Closed', value: 32, color: '#2B5F4A' },
        { label: 'Overdue', value: 3, color: '#8B6B4D' }
    ];

    return (
        <div className="card">
            <h2>🎫 TICKET STATUS</h2>
            <div className="card-content">
                {ticketStats.map((stat, index) => (
                    <div key={index} className="ticket-stat-item">
                        <span>{stat.label}:</span>
                        <span className="stat-value" style={{color: stat.color}}>{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicketStatusCard;