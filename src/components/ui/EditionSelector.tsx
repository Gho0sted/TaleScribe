import React, { useState } from 'react';
import { ChevronDown, Check } from '../../constants/icons';
import { DND_EDITIONS } from '../../constants';
import { Edition } from '../../types';

interface EditionSelectorProps {
  selectedEdition: Edition;
  setSelectedEdition: (edition: Edition) => void;
}

const EditionSelector: React.FC<EditionSelectorProps> = ({
  selectedEdition,
  setSelectedEdition,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentEdition = DND_EDITIONS.find((ed) => ed.id === selectedEdition);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl transition-all shadow-sm border border-gray-300 dark:border-gray-600 text-sm font-medium"
      >
        <span className="text-xl">{currentEdition?.icon}</span>
        <span className="text-gray-900 dark:text-white">{currentEdition?.name}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="py-2">
            {DND_EDITIONS.map((edition) => (
              <button
                key={edition.id}
                onClick={() => {
                  setSelectedEdition(edition.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedEdition === edition.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-xl">{edition.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{edition.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{edition.description}</div>
                </div>
                {selectedEdition === edition.id && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditionSelector;
