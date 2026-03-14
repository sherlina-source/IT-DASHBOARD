import React from 'react';
import Header from '../components/Header';
import CalendarCard from '../components/CalendarCard';
import BirthdayCard from '../components/BirthdayCard';
import WorkOrdersCard from '../components/WorkOrdersCard';
import DailyReviewCard from '../components/DailyReviewCard';
import TicketStatusCard from '../components/TicketStatusCard';
import AnnouncementCard1 from '../components/AnnouncementCard1';
import AnnouncementCard2 from '../components/AnnouncementCard2';
import InfrastructureCard from '../components/InfrastructureCard';
import StatusFooter from '../components/StatusFooter'; // Komponen baru untuk footer
import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <Header />
            
            <div className="dashboard-grid">
                {/* LEFT SECTION - 2 Cards + Footer */}
                <div className="left-section">
                    <CalendarCard />
                    <div className="birthday-wrapper">
                        <BirthdayCard />
                        <StatusFooter /> {/* Menambahkan footer di bawah birthday */}
                    </div>
                </div>
                
                {/* MIDDLE SECTION - 3 Cards */}
                <div className="middle-section">
                    <WorkOrdersCard />
                    <DailyReviewCard />
                    <AnnouncementCard1 />
                </div>
                
                {/* RIGHT SECTION - 3 Cards */}
                <div className="right-section">
                    <TicketStatusCard />
                    <InfrastructureCard />
                    <AnnouncementCard2 />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;