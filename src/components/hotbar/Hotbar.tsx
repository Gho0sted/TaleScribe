import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useHotbar, Macro } from '../../stores/useHotbarStore';
import { useTalescribe } from '../../contexts/TalescribeContext';
import { useChat } from '../../stores/useChatStore';
import { DiceUtils } from '../../utils/DiceUtils';
import MacroEditor from './MacroEditor';

interface HotbarProps {
  length?: number;
}

const parseTemplate = (template: string): string => {
  return template.replace(/(\d+)d(\d+)([+-]\d+)?/g, (_, c, s, m) => {
    const res = DiceUtils.rollDice(Number(c), Number(s), m ? Number(m) : 0);
    return `${res.total} [${res.rolls.join(', ')}${res.modifier ? DiceUtils.formatModifier(res.modifier) : ''}]`;
  });
};

const Hotbar: React.FC<HotbarProps> = ({ length = 8 }) => {
  const { slots, setSlot, setSlotCount } = useHotbar();
  const { spells } = useTalescribe();
  const { addMessage } = useChat();
  const [editIdx, setEditIdx] = useState<number | null>(null);

  useEffect(() => {
    setSlotCount(length);
  }, [length, setSlotCount]);

  const handleClick = (macro: Macro | null) => {
    if (!macro) return;
    if (macro.type === 'spell') {
      const spell = spells.find((s) => s.id === macro.id);
      const roll = DiceUtils.rollDice(1, 20);
      addMessage('System', 'NPC', `${spell?.name || macro.id}: ${roll.total}`);
    } else if (macro.type === 'ability') {
      const roll = DiceUtils.rollDice(1, 20);
      addMessage('System', 'NPC', `Ability ${macro.id}: ${roll.total}`);
    } else if (macro.type === 'custom' && macro.template) {
      const text = parseTemplate(macro.template);
      addMessage('System', 'NPC', text);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        {slots.map((slot, i) => (
          <Droppable droppableId={`slot-${i}`} key={i}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center relative"
                onClick={() => handleClick(slot)}
              >
                {slot ? (
                  <span className="text-xs text-center px-1">
                    {slot.type === 'custom' ? 'C' : slot.id}
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">+</span>
                )}
                <button
                  className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-4 h-4 text-[10px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditIdx(i);
                  }}
                >
                  ✎
                </button>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
      <MacroEditor
        index={editIdx ?? 0}
        open={editIdx !== null}
        onClose={() => setEditIdx(null)}
      />
    </div>
  );
};

export default Hotbar;
