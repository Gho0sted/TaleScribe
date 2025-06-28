import React, { useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import SessionCalendar from '../campaigns/SessionCalendar';
import SessionJournal from '../campaigns/SessionJournal';
import MasterConsole from '../chat/MasterConsole';
import { backupNow } from '../../services/backupService';

const CampaignsPage: React.FC = () => {
  useEffect(() => {
    backupNow('google', 'campaign').catch(() => {
      console.error('Auto backup failed');
    });
  }, []);
  return (
    <div className="p-8">
      <div className="mb-4 space-x-4">
        <NavLink
          to="calendar"
          className={({ isActive }) => (isActive ? 'btn' : 'btn bg-gray-700')}
        >
          Календарь
        </NavLink>
        <NavLink
          to="journal"
          className={({ isActive }) => (isActive ? 'btn' : 'btn bg-gray-700')}
        >
          Журнал
        </NavLink>
        <NavLink
          to="console"
          className={({ isActive }) => (isActive ? 'btn' : 'btn bg-gray-700')}
        >
          Консоль
        </NavLink>
      </div>
      <Routes>
        <Route path="calendar" element={<SessionCalendar />} />
        <Route
          path="journal"
          element={<SessionJournal sessionId="default" />}
        />
        <Route path="console" element={<MasterConsole />} />
      </Routes>
    </div>
  );
};

export default CampaignsPage;
