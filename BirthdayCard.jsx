import React from 'react';

function BirthdayCard() {
    const birthdays = [
        { name: 'Rina Putri', dept: 'Finance Dept', icon: '🎂' },
        { name: 'Andi Setiawan', dept: 'HR Dept', icon: '🎉' }
    ];

    return (
        <div className="card">
            <h2>🎂 BIRTHDAY TODAY</h2>
            <div className="card-content">
                {birthdays.map((birthday, index) => (
                    <div key={index} className="birthday-item">
                        <div className="birthday-name">{birthday.icon} {birthday.name}</div>
                        <div className="birthday-dept">{birthday.dept}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BirthdayCard;