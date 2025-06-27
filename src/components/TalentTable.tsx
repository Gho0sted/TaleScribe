import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { CLASS_TALENTS, ClassTalent } from '../constants/CLASS_TALENTS';
import { useTalentStore } from '../stores/useTalentStore';
import {
  IconDownload,
  IconPlus,
  IconTrash,
  IconEdit,
} from '../constants/icons';

interface TalentTableProps {
  classId: string;
}

const TalentTable: React.FC<TalentTableProps> = ({ classId }) => {
  const talents = useTalentStore((s) => s.talents[classId] || []);
  const setClassTalents = useTalentStore((s) => s.setClassTalents);
  const addTalent = useTalentStore((s) => s.addTalent);
  const updateTalent = useTalentStore((s) => s.updateTalent);
  const removeTalent = useTalentStore((s) => s.removeTalent);

  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<number | ''>('');
  const [newTalent, setNewTalent] = useState<ClassTalent>({
    name: '',
    description: '',
    level: 1,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editTalent, setEditTalent] = useState<ClassTalent>(newTalent);

  useEffect(() => {
    if (!talents.length && CLASS_TALENTS[classId]) {
      setClassTalents(
        classId,
        CLASS_TALENTS[classId].map((t) => ({
          ...t,
          id: Date.now().toString() + Math.random(),
        })),
      );
    }
  }, [classId]);

  const filtered = talents.filter(
    (t) =>
      (!search || t.name.toLowerCase().includes(search.toLowerCase())) &&
      (!level || t.level === Number(level)),
  );

  const handleAdd = () => {
    if (!newTalent.name) return;
    addTalent(classId, newTalent);
    setNewTalent({ name: '', description: '', level: 1 });
  };

  const handleExport = (format: 'csv' | 'markdown') => {
    let data = '';
    if (format === 'csv') {
      data = Papa.unparse(talents);
    } else {
      data = `| Уровень | Название | Описание |\n| --- | --- | --- |\n`;
      talents.forEach((t) => {
        data += `| ${t.level} | ${t.name} | ${t.description} |\n`;
      });
    }
    const blob = new Blob([data], {
      type: format === 'csv' ? 'text/csv' : 'text/markdown',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talents.${format === 'csv' ? 'csv' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          className="input"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input w-24"
          type="number"
          placeholder="Уровень"
          value={level}
          onChange={(e) =>
            setLevel(e.target.value ? Number(e.target.value) : '')
          }
        />
        <button className="btn-primary" onClick={() => handleExport('csv')}>
          <IconDownload className="w-4 h-4 mr-1" />
          CSV
        </button>
        <button
          className="btn-primary"
          onClick={() => handleExport('markdown')}
        >
          <IconDownload className="w-4 h-4 mr-1" />
          MD
        </button>
      </div>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="p-2">Уровень</th>
            <th className="p-2">Название</th>
            <th className="p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((talent) => (
            <tr key={talent.id} className="border-b border-gray-700">
              <td className="p-2">{talent.level}</td>
              <td className="p-2" title={talent.description}>
                {talent.name}
              </td>
              <td className="p-2 space-x-2">
                <button
                  className="btn"
                  onClick={() => {
                    setEditId(talent.id);
                    setEditTalent(talent);
                  }}
                >
                  <IconEdit className="w-4 h-4" />
                </button>
                <button
                  className="btn"
                  onClick={() => removeTalent(classId, talent.id)}
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId && (
        <div className="space-y-2">
          <input
            className="input"
            placeholder="Название"
            value={editTalent.name}
            onChange={(e) =>
              setEditTalent({ ...editTalent, name: e.target.value })
            }
          />
          <textarea
            className="input"
            placeholder="Описание"
            value={editTalent.description}
            onChange={(e) =>
              setEditTalent({ ...editTalent, description: e.target.value })
            }
          />
          <input
            className="input"
            type="number"
            placeholder="Уровень"
            value={editTalent.level}
            onChange={(e) =>
              setEditTalent({ ...editTalent, level: Number(e.target.value) })
            }
          />
          <button
            className="btn-primary"
            onClick={() => {
              updateTalent(classId, editId, editTalent);
              setEditId(null);
            }}
          >
            Сохранить
          </button>
        </div>
      )}
      <div className="space-y-2">
        <h4 className="font-semibold">Добавить</h4>
        <input
          className="input"
          placeholder="Название"
          value={newTalent.name}
          onChange={(e) => setNewTalent({ ...newTalent, name: e.target.value })}
        />
        <textarea
          className="input"
          placeholder="Описание"
          value={newTalent.description}
          onChange={(e) =>
            setNewTalent({ ...newTalent, description: e.target.value })
          }
        />
        <input
          className="input"
          type="number"
          value={newTalent.level}
          onChange={(e) =>
            setNewTalent({ ...newTalent, level: Number(e.target.value) })
          }
        />
        <button className="btn-primary" onClick={handleAdd}>
          <IconPlus className="w-4 h-4 mr-1" />
          Добавить
        </button>
      </div>
    </div>
  );
};

export default TalentTable;
