import React from 'react';
import Header from '../components/Header';
import CalendarCard from '../components/CalendarCard';
import BirthdayCard from '../components/BirthdayCard';
import AnnouncementCard from '../components/AnnouncementCard';
import WorkOrdersCard from '../components/WorkOrdersCard';
import DailyReviewCard from '../components/DailyReviewCard';
import TicketStatusCard from '../components/TicketStatusCard';
import InfrastructureCard from '../components/InfrastructureCard';
import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />
            
            <div className="dashboard-grid">
                {/* CALENDAR */}
                <div className="grid-item">
                    <CalendarCard />
                </div>
                
                {/* WORK ORDERS */}
                <div className="grid-item">
                    <WorkOrdersCard />
                </div>
                
                {/* DAILY REVIEW */}
                <div className="grid-item">
                    <DailyReviewCard />
                </div>
                
                {/* TICKET STATUS */}
                <div className="grid-item">
                    <TicketStatusCard />
                </div>
                
                {/* BIRTHDAY */}
                <div className="grid-item">
                    <BirthdayCard />
                </div>
                
                {/* ANNOUNCEMENTS */}
                <div className="grid-item">
                    <AnnouncementCard />
                </div>
                
                {/* INFRASTRUCTURE */}
                <div className="grid-item">
                    <InfrastructureCard />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;