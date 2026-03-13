import React from 'react';

function InfrastructureCard() {
    const infrastructure = [
        { name: 'APP SERVER', status: 'ONLINE', class: 'online', icon: '🖥️' },
        { name: 'DATABASE', status: 'ONLINE', class: 'online', icon: '💾' },
        { name: 'INTERNET ISP 1', status: 'ONLINE', class: 'online', icon: '🌐' },
        { name: 'BACKUP SYSTEM', status: 'WARNING', class: 'warning', icon: '🔒' }
    ];

    return (
        <div className="card">
            <h2>⚡ INFRASTRUCTURE STATUS</h2>
            <div className="infrastructure-grid">
                {infrastructure.map((item, index) => (
                    <div key={index} className={`infrastructure-item ${item.class}`}>
                        <span className="item-name">{item.icon} {item.name}</span>
                        <span className="item-status">
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfrastructureCard;