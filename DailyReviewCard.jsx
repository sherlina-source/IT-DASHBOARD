import React from 'react';

function DailyReviewCard() {
    const reviews = [
        { name: 'Ardi', status: 'done' },
        { name: 'Bagas', status: 'pending' },
        { name: 'Dimas', status: 'pending' },
        { name: 'Rudi', status: 'pending' },
        { name: 'Tono', status: 'pending' }
    ];

    return (
        <div className="card">
            <h2>📋 DAILY REVIEW</h2>
            <div className="card-content">
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <span>{review.name}</span>
                        <span className={`status-icon ${review.status}`}>
                            {review.status === 'done' ? '✔️' : '❌'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DailyReviewCard;