import React from 'react';

function WorkOrdersCard() {
    const workOrders = {
        open: [
            { id: '#231', title: 'Printer Error', dept: 'Finance' },
            { id: '#232', title: 'Internet Lambat', dept: 'HR' }
        ],
        inProgress: [
            { id: '#220', title: 'Server Upgrade' },
            { id: '#225', title: 'Update Inventory App' }
        ]
    };

    return (
        <div className="card">
            <h2>🔧 WORK ORDERS</h2>
            <div className="card-content">
                <div className="work-orders-section">
                    <h3>OPEN</h3>
                    {workOrders.open.map((wo, index) => (
                        <div key={index} className="work-order-item open">
                            <span>{wo.id} {wo.title} - {wo.dept}</span>
                            <span className="status-dot">🟢</span>
                        </div>
                    ))}
                </div>
                
                <div className="work-orders-section">
                    <h3>IN PROGRESS</h3>
                    {workOrders.inProgress.map((wo, index) => (
                        <div key={index} className="work-order-item progress">
                            <span>{wo.id} {wo.title}</span>
                            <span className="check-icon">✅</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkOrdersCard;