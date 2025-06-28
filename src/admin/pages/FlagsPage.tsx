import React from 'react';
import { Card } from '../../components/ui/Card';
import { useFeatureFlagStore } from '../../stores/useFeatureFlagStore';
import { useAppTranslation } from '../../hooks/useAppTranslation';

const FlagsPage: React.FC = () => {
  const { flags, toggleFlag } = useFeatureFlagStore();
  const { t } = useAppTranslation();
  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">{t('admin.flagsTitle')}</h2>
      <div className="space-y-2">
        {Object.entries(flags).map(([name, value]) => (
          <label key={name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleFlag(name as keyof typeof flags)}
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default FlagsPage;
