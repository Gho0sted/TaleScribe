import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTalescribe } from '../../contexts/TalescribeContext';

const SpellList: React.FC = () => {
  const { spells } = useTalescribe();
  return (
    <Droppable droppableId="spells">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-2 max-h-60 overflow-y-auto p-2 bg-gray-800 rounded"
        >
          {spells.map((spell, i) => (
            <Draggable key={spell.id} draggableId={spell.id} index={i}>
              {(p) => (
                <div
                  ref={p.innerRef}
                  {...p.draggableProps}
                  {...p.dragHandleProps}
                  className="p-2 bg-gray-700 rounded text-sm text-white cursor-move"
                >
                  {spell.name}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SpellList;
