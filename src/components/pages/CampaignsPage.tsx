import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import SessionCalendar from '../campaigns/SessionCalendar';
import SessionJournal from '../campaigns/SessionJournal';

const CampaignsPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-4 space-x-4">
        <NavLink to="calendar" className={({isActive}) => isActive ? 'btn' : 'btn bg-gray-700'}>Календарь</NavLink>
        <NavLink to="journal" className={({isActive}) => isActive ? 'btn' : 'btn bg-gray-700'}>Журнал</NavLink>
      </div>
      <Routes>
        <Route path="calendar" element={<SessionCalendar />} />
        <Route path="journal" element={<SessionJournal sessionId="default" />} />
      </Routes>
    </div>
  );
};

export default CampaignsPage;
