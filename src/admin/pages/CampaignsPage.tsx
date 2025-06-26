import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTalescribe } from '../../contexts/TalescribeContext';

const CampaignsPage: React.FC = () => {
  const { campaigns, setCampaigns } = useTalescribe();

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Кампании</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Название</th>
            <th className="px-2 py-1 text-left">DM</th>
            <th className="px-2 py-1 text-left">Создана</th>
            <th className="px-2 py-1" />
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="border-t border-gray-700">
              <td className="px-2 py-1">{c.name}</td>
              <td className="px-2 py-1">{c.dmId}</td>
              <td className="px-2 py-1">{new Date(c.createdAt).toLocaleDateString()}</td>
              <td className="px-2 py-1 space-x-2">
                <Button onClick={() => deleteCampaign(c.id)}>Удалить</Button>
                <Button>Экспорт</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default CampaignsPage;
