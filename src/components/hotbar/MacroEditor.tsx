import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useHotbarStore } from '../../stores/useHotbarStore';

interface Props {
  index: number;
  open: boolean;
  onClose: () => void;
}

const MacroEditor: React.FC<Props> = ({ index, open, onClose }) => {
  const macro = useHotbarStore((s) => s.slots[index]);
  const setSlot = useHotbarStore((s) => s.setSlot);
  const [template, setTemplate] = useState(macro?.template || '');

  const save = () => {
    setSlot(index, { type: 'custom', id: `custom-${index}`, template });
    onClose();
  };

  return (
    <Modal open={open}>
      <div className="p-4 bg-gray-800 rounded space-y-4 w-80">
        <textarea
          className="input w-full h-32"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Введите шаблон"
        />
        <button className="btn-primary" onClick={save}>
          Сохранить макрос
        </button>
      </div>
    </Modal>
  );
};

export default MacroEditor;
