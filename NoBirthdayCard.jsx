import React from 'react';

function NoBirthdayCard({ selectedMonth, setSelectedMonth }) {

    const months = [
        "Today",
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="nobirthday-card">
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#1e293b",
                    color: "white",
                    border: "none",
                    outline: "none",
                    fontSize: "0.65rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "center"
                }}
            >
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {month}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default NoBirthdayCard;