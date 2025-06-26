import React, { useEffect, useState } from 'react';
import { useSessionStore } from '../../stores/sessionStore';
import { format } from 'date-fns';
import { scheduleNotification, requestPermission } from '../../services/notificationService';

declare global {
  interface Window { gapi: any }
}

const SCOPES = 'https://www.googleapis.com/auth/calendar';

const SessionCalendar: React.FC = () => {
  const { sessions, addSession, setSessions } = useSessionStore();
  const [signedIn, setSignedIn] = useState(false);
  const [gapiReady, setGapiReady] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    requestPermission();
    const start = () => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY,
            clientId: process.env.GOOGLE_CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: SCOPES,
          });
          const auth = window.gapi.auth2.getAuthInstance();
          setSignedIn(auth.isSignedIn.get());
          setGapiReady(true);
          auth.isSignedIn.listen(setSignedIn);
          if (auth.isSignedIn.get()) loadEvents();
        } catch (e) {
          console.error('Failed to init gapi:', e);
        }
      });
    };

    if (window.gapi) {
      start();
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.onload = start;
      script.onerror = () => console.error('Failed to load Google API script');
      document.body.appendChild(script);
    }
  }, []);

  const loadEvents = async () => {
    try {
      const res = await window.gapi.client.calendar.events.list({ calendarId: 'primary' });
      const items = res.result.items || [];
      const ev = items.map((i: any) => ({
        id: i.id,
        title: i.summary,
        description: i.description,
        start: i.start.dateTime || i.start.date,
        end: i.end.dateTime || i.end.date,
      }));
      setSessions(ev);
    } catch (e) {
      console.error(e);
    }
  };

  const signIn = () => {
    const auth = window.gapi?.auth2?.getAuthInstance?.();
    if (auth) {
      auth.signIn();
    } else {
      console.error('GAPI auth2 not initialized');
    }
  };

  const signOut = () => {
    const auth = window.gapi?.auth2?.getAuthInstance?.();
    if (auth) {
      auth.signOut();
    }
  };

  const createEvent = async () => {
    const startDate = new Date(date);
    const event = {
      summary: title,
      start: { dateTime: startDate.toISOString() },
      end: { dateTime: new Date(startDate.getTime() + 60 * 60 * 1000).toISOString() },
    };
    try {
      const res = await window.gapi.client.calendar.events.insert({ calendarId: 'primary', resource: event });
      addSession({
        id: res.result.id,
        title: res.result.summary,
        description: '',
        start: res.result.start.dateTime,
        end: res.result.end.dateTime,
      });
      scheduleNotification(new Date(res.result.start.dateTime), res.result.summary, 'Session reminder');
      setTitle('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        {gapiReady ? (
          signedIn ? (
            <button onClick={signOut} className="btn">Sign out</button>
          ) : (
            <button onClick={signIn} className="btn">Sign in</button>
          )
        ) : (
          <span>Loading...</span>
        )}
      </div>
      {signedIn && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            <button onClick={createEvent} className="btn">Add</button>
          </div>
          <ul className="space-y-2">
            {sessions.map((s) => (
              <li key={s.id} className="border p-2 rounded-lg">
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-400">{format(new Date(s.start), 'PPpp')}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SessionCalendar;
