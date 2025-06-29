import React, { useState } from 'react';
import TalentTable from '../components/TalentTable';
import PriorityCalculator from '../components/PriorityCalculator';
import { useTalescribe } from '../contexts/TalescribeContext';
import { CHARACTER_CLASSES } from '../constants';
import { useAppTranslation } from '../hooks/useAppTranslation';

const TalentsPage: React.FC = () => {
  const { selectedEdition } = useTalescribe();
  const classes = CHARACTER_CLASSES[selectedEdition];
  const [cls, setCls] = useState(classes[0].id);
  const { t } = useAppTranslation();

  return (
    <div className="p-8 space-y-8">
      <div>
        <label className="mr-2">{t('classes.classLabel')}</label>
        <select
          className="input"
          value={cls}
          onChange={(e) => setCls(e.target.value)}
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <TalentTable classId={cls} />
      <PriorityCalculator />
    </div>
  );
};

export default TalentsPage;
