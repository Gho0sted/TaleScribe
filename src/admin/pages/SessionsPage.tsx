import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useSessionStore } from '../../stores/sessionStore';

const SessionsPage: React.FC = () => {
  const { sessions, removeSession } = useSessionStore();

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Сессии</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Дата</th>
            <th className="px-2 py-1 text-left">Заголовок</th>
            <th className="px-2 py-1" />
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id} className="border-t border-gray-700">
              <td className="px-2 py-1">{new Date(s.start).toLocaleDateString()}</td>
              <td className="px-2 py-1">{s.title}</td>
              <td className="px-2 py-1 space-x-2">
                <Button onClick={() => removeSession(s.id)}>Удалить</Button>
                <Button>Экспорт PDF</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default SessionsPage;
