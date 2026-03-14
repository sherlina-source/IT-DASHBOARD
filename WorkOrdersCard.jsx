import React from 'react';

function WorkOrdersCard() {
    return (
        <div className="card">
            <h2>🔧 WORK ORDERS</h2>
            
            <div className="work-section">
                <h3>OPEN</h3>
                <ul className="work-list">
                    <li><span>#231 Printer Error - Finance</span> <span className="open-dot">🟢</span></li>
                    <li><span>#232 Internet Lambat - HR</span> <span className="open-dot">🟢</span></li>
                </ul>
            </div>

            <div className="work-section">
                <h3>IN PROGRESS</h3>
                <ul className="work-list">
                    <li><span>#220 Server Upgrade</span> <span className="progress-check">✅</span></li>
                    <li><span>#225 Update Inventory App</span> <span className="progress-check">✅</span></li>
                </ul>
            </div>
        </div>
    );
}

export default WorkOrdersCard;