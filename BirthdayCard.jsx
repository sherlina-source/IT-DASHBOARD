import React from 'react';

function BirthdayCard() {
    return (
        <div className="card birthday-card">
            <h2>🎂  BIRTHDAY TODAY</h2>
            
            <div className="birthday-item">
                <div className="birthday-name">Rina Putri</div>
                <div className="birthday-dept">Finance Dept</div>
            </div>
            
            <div className="birthday-item">
                <div className="birthday-name">Andi Setiawan</div>
                <div className="birthday-dept">HR Dept</div>
            </div>
        </div>
    );
}

export default BirthdayCard;