import React, { useState } from 'react';
import { IconDownload, IconUpload, IconRefreshCw } from '../constants/icons';
import CloudSettings from '../components/ui/CloudSettings';
import { useTalescribe } from '../contexts/TalescribeContext';
import { downloadFile } from '../utils/downloadFile';
import {
  exportCharacters,
  importCharacters,
  exportToFoundry,
} from '../services/exportService';

const DataManagerPage: React.FC = () => {
  const { characters, setCharacters } = useTalescribe();
  const [tab, setTab] = useState<
    'export' | 'import' | 'integrations' | 'cloud'
  >('export');
  const [loading, setLoading] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const data = await importCharacters(file);
    if (data.length) setCharacters(data);
    setLoading(false);
  };

  const handleExport = (format: 'json' | 'markdown' | 'csv' | 'pdf') => {
    const blob = exportCharacters(characters, format);
    const ext = format === 'markdown' ? 'md' : format;
    downloadFile(blob, `characters.${ext}`);
  };

  return (
    <div className="p-8 text-white">
      <div className="space-x-4 mb-6">
        <button
          className={`btn-primary ${tab === 'export' ? '' : 'opacity-70'}`}
          onClick={() => setTab('export')}
        >
          Экспорт
        </button>
        <button
          className={`btn-primary ${tab === 'import' ? '' : 'opacity-70'}`}
          onClick={() => setTab('import')}
        >
          Импорт
        </button>
        <button
          className={`btn-primary ${tab === 'integrations' ? '' : 'opacity-70'}`}
          onClick={() => setTab('integrations')}
        >
          Интеграции
        </button>
        <button
          className={`btn-primary ${tab === 'cloud' ? '' : 'opacity-70'}`}
          onClick={() => setTab('cloud')}
        >
          Cloud
        </button>
      </div>

      {tab === 'export' && (
        <div className="space-x-4">
          <button className="btn-primary" onClick={() => handleExport('json')}>
            <IconDownload className="h-5 w-5 mr-2" />
            JSON
          </button>
          <button
            className="btn-primary"
            onClick={() => handleExport('markdown')}
          >
            <IconDownload className="h-5 w-5 mr-2" />
            Markdown
          </button>
          <button className="btn-primary" onClick={() => handleExport('csv')}>
            <IconDownload className="h-5 w-5 mr-2" />
            CSV
          </button>
          <button className="btn-primary" onClick={() => handleExport('pdf')}>
            <IconDownload className="h-5 w-5 mr-2" />
            PDF
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              const blob = exportToFoundry('characters', characters);
              downloadFile(blob, 'foundry-characters.json');
            }}
          >
            Export to Foundry
          </button>
        </div>
      )}

      {tab === 'import' && (
        <div className="space-y-4">
          <input
            type="file"
            accept=".json,.csv,.md,.markdown,.pdf"
            onChange={handleImport}
          />
          {loading && <div className="text-gray-400">Loading...</div>}
        </div>
      )}

      {tab === 'integrations' && (
        <div className="space-y-4">
          <p className="flex items-center">
            <IconRefreshCw className="h-5 w-5 mr-2" />
            D&D Beyond sync coming soon...
          </p>
        </div>
      )}

      {tab === 'cloud' && <CloudSettings />}
    </div>
  );
};

export default DataManagerPage;
