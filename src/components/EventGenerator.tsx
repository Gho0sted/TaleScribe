/**
 * Random event generator for adventures.
 * Компонент генерации случайных событий для приключений.
 */
import React, { useState } from 'react';
import { useEventGenerator } from '../stores/useContentStore';
import { useAppTranslation } from '../hooks/useAppTranslation';

const EventGenerator: React.FC = () => {
  const { t } = useAppTranslation();
  const { events, generateEvent, resetEvents } = useEventGenerator();
  const [category, setCategory] = useState<'weather' | 'road' | 'intrigue'>(
    'weather',
  );

  const onGenerate = () => generateEvent(category);

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Event Generator</h3>
      <div className="flex items-center space-x-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="input"
        >
          <option value="weather">Weather</option>
          <option value="road">Road</option>
          <option value="intrigue">Intrigue</option>
        </select>
      </div>
      <div className="space-x-3">
        <button className="btn-primary" onClick={onGenerate}>
          Generate
        </button>
        <button className="btn-secondary" onClick={resetEvents}>
          Reset
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-400">{t('generatorsPage.noEvents')}</p>
        ) : (
          events.map((e) => (
            <div key={e.id} className="card animate-slideUp">
              <div className="font-bold mb-2">{e.title}</div>
              <p className="text-sm text-gray-400">{e.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventGenerator;
