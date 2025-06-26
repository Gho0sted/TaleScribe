import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useUsersStore } from '../../stores/useUsersStore';

const UsersPage: React.FC = () => {
  const { users, updateUser } = useUsersStore();

  const toggleRole = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    updateUser(id, { role: user.role === 'admin' ? 'user' : 'admin' });
  };

  const toggleStatus = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    updateUser(id, { status: user.status === 'active' ? 'blocked' : 'active' });
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Пользователи</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">ID</th>
            <th className="px-2 py-1 text-left">Email</th>
            <th className="px-2 py-1 text-left">Роль</th>
            <th className="px-2 py-1 text-left">Статус</th>
            <th className="px-2 py-1" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-gray-700">
              <td className="px-2 py-1">{u.id}</td>
              <td className="px-2 py-1">{u.email}</td>
              <td className="px-2 py-1">{u.role}</td>
              <td className="px-2 py-1">{u.status}</td>
              <td className="px-2 py-1 space-x-2">
                <Button onClick={() => toggleRole(u.id)}>Изменить роль</Button>
                <Button onClick={() => toggleStatus(u.id)}>
                  {u.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default UsersPage;
