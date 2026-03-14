import React from 'react';

function TicketStatusCard() {
    return (
        <div className="card">
            <h2>🎫 TICKET STATUS</h2>
            
            <ul className="ticket-list">
                <li><span>Open:</span> <span className="ticket-value">12</span></li>
                <li><span>In Progress:</span> <span className="ticket-value">5</span></li>
                <li><span>Closed:</span> <span className="ticket-value">32</span></li>
                <li><span>Overdue:</span> <span className="ticket-value">3</span></li>
            </ul>
        </div>
    );
}

export default TicketStatusCard;