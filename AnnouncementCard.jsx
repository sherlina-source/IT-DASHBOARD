import React from 'react';

function AnnouncementCard() {
    const announcements = [
        { title: 'Server Maintenance', detail: 'Tonight 22:00 - 23:00 WIB', icon: '🔧' },
        { title: 'Inventory Update', detail: 'Version 2.4 Released', icon: '📦' }
    ];

    return (
        <div className="card">
            <h2>📢 ANNOUNCEMENTS</h2>
            <div className="card-content">
                {announcements.map((ann, index) => (
                    <div key={index} className="announcement-item">
                        <div className="announcement-title">{ann.icon} {ann.title}</div>
                        <div className="announcement-detail">{ann.detail}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AnnouncementCard;