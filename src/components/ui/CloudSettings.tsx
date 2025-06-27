import React, { useEffect, useState } from 'react';
import { IconCloud, IconRefreshCw } from '../../constants/icons';
import {
  backupNow,
  listBackups,
  restoreBackup,
} from '../../services/backupService';
import { BackupFile, cloudSync } from '../../services/cloudSyncService';

const CloudSettings: React.FC = () => {
  const [files, setFiles] = useState<BackupFile[]>([]);
  const [loading, setLoading] = useState(false);

  const provider: 'google' = 'google';

  const load = async () => {
    setLoading(true);
    try {
      const list = await listBackups(provider);
      setFiles(list);
    } catch (e) {
      alert('Failed to load backups');
    } finally {
      setLoading(false);
    }
  };

  const doBackup = async () => {
    setLoading(true);
    try {
      await backupNow(provider, 'campaign');
      await load();
      alert('Backup complete');
    } catch (e) {
      alert('Backup failed');
    } finally {
      setLoading(false);
    }
  };

  const doRestore = async (id: string) => {
    setLoading(true);
    try {
      await restoreBackup(provider, id);
      alert('Restore complete');
    } catch (e) {
      alert('Restore failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <button
        onClick={() => cloudSync.authorizeGoogle()}
        className="btn-primary"
      >
        Connect Google Drive
      </button>
      <div className="space-x-2">
        <button onClick={doBackup} className="btn-primary">
          <IconCloud className="h-4 w-4 mr-2" />
          Backup Now
        </button>
        <button onClick={load} className="btn-primary">
          <IconRefreshCw className="h-4 w-4 mr-2" />
          Refresh list
        </button>
      </div>
      {loading && <div className="text-gray-400">Loading...</div>}
      <ul className="space-y-2">
        {files.map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>{f.name}</span>
            <button onClick={() => doRestore(f.id)} className="btn-primary">
              Restore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CloudSettings;
