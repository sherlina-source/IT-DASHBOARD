import React from 'react';

function DailyReviewCard() {
    return (
        <div className="card">
            <h2>📋 DAILY REVIEW</h2>
            
            <ul className="review-list">
                <li><span>Ardi</span> <span className="review-check">✔️</span></li>
                <li><span>Bagas</span> <span className="review-cross">❌</span></li>
                <li><span>Dimas</span> <span className="review-cross">❌</span></li>
                <li><span>Rudi</span> <span className="review-cross">❌</span></li>
                <li><span>Tono</span> <span className="review-cross">❌</span></li>
            </ul>
        </div>
    );
}

export default DailyReviewCard;