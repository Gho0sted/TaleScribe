import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useLogStore } from '../../stores/useLogStore';
import { useAppTranslation } from '../../hooks/useAppTranslation';

const LogsPage: React.FC = () => {
  const { logs, clearLogs } = useLogStore();
  const { t } = useAppTranslation();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t('admin.logsTitle')}</h2>
        <Button onClick={clearLogs}>{t('admin.clearButton')}</Button>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">{t('admin.level')}</th>
            <th className="px-2 py-1 text-left">{t('admin.message')}</th>
            <th className="px-2 py-1 text-left">{t('admin.time')}</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-t border-gray-700">
              <td className="px-2 py-1">{l.level}</td>
              <td className="px-2 py-1">{l.message}</td>
              <td className="px-2 py-1">
                {new Date(l.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default LogsPage;
