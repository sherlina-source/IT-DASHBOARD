// src/pages/Dashboard.jsx
import React from 'react';
import Header from '../components/Header';
import CalendarCard from '../components/CalendarCard';
import BirthdayCard from '../components/BirthdayCard';
import WorkOrdersCard from '../components/WorkOrdersCard';
import DailyReviewCard from '../components/DailyReviewCard';
import TicketStatusCard from '../components/TicketStatusCard';
import InfrastructureCard from '../components/InfrastructureCard';
import StatusFooter from '../components/StatusFooter';
import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <Header />
            
            <div className="dashboard-grid">

                {/* ===== LEFT SECTION ===== */}
                <div className="left-section">
                    <CalendarCard />

                    <div className="birthday-wrapper">
                        {/* 🔥 sekarang cuma footer */}
                        <StatusFooter />
                    </div>
                </div>

                {/* ===== MIDDLE SECTION ===== */}
                <div className="middle-section">
                    <WorkOrdersCard />
                    <DailyReviewCard />
                </div>

                {/* ===== RIGHT SECTION ===== */}
                <div className="right-section">
                    <TicketStatusCard />
                    <InfrastructureCard />

                    {/* 🔥 Birthday pindah ke sini */}
                    <BirthdayCard />
                </div>

            </div>
        </div>
    );
}

export default Dashboard;