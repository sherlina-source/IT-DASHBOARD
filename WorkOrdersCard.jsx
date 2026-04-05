import React, { useState, useEffect } from 'react';

function WorkOrdersCard() {
    const [openWO, setOpenWO] = useState([]);
    const [progressWO, setProgressWO] = useState([]);

    // ===== FUNCTION UNTUK MERAPIKAN JOB_NAME =====
    function formatJobName(str) {
        const exceptions = ['SSD', 'HDD', 'LAN', 'VPN'];
        return str
            .split(' ')
            .map(word => {
                if (exceptions.includes(word.toUpperCase())) return word.toUpperCase();
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    }

    // ===== FUNCTION FETCH WO =====
    const fetchWO = () => {
        fetch("https://stagingservicewo.salokapark.app/api/get_wo_request?id_dept=DP011")
            .then(response => response.json())
            .then(result => {
                const woData = result.data;

                // URUTKAN DATA TERBARU
                const sorted = woData.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                // FILTER STATUS
                const open = sorted
                    .filter(item => item.track_status === 2)
                    .slice(0, 5);

                const progress = sorted
                    .filter(item => item.track_status === 3)
                    .slice(0, 5);

                setOpenWO(open);
                setProgressWO(progress);
            })
            .catch(error => {
                console.error("Error mengambil data WO:", error);
            });
    };

    // ===== AUTO REFRESH 10 DETIK =====
    useEffect(() => {
        fetchWO(); 

        const interval = setInterval(() => {
            fetchWO();
        }, 10000); // 10 detik

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="card">
            <h2>🔧 WORK ORDERS</h2>

            {/* OPEN */}
            <div className="work-section">
                <h3>OPEN</h3>
                <ul className="work-list">
                    {openWO.map((wo, index) => (
                        <li key={index}>
                            <span>
                                {formatJobName(wo.job_name)} - {wo.departemen_request}
                            </span>
                            <span className="open-dot">🟢</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* IN PROGRESS */}
            <div className="work-section">
                <h3>IN PROGRESS</h3>
                <ul className="work-list">
                    {progressWO.map((wo, index) => (
                        <li key={index}>
                            <span>
                                {formatJobName(wo.job_name)} - {wo.departemen_request}
                            </span>
                            <span className="progress-check">✅</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WorkOrdersCard;