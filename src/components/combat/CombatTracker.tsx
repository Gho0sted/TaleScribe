import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { useInitiative, useStatuses, Status } from '../../stores/combatStore';

const TURN_TIME = 30;

const StatusBadge: React.FC<{ status: Status; cid: string }> = ({
  status,
  cid,
}) => {
  const { removeStatus, adjustStatus } = useStatuses(cid);
  return (
    <div
      className="flex items-center space-x-1 text-xs bg-gray-700 px-2 py-1 rounded"
      title={`${status.name} (${status.duration})`}
    >
      <span>{status.icon}</span>
      <span>{status.duration}</span>
      <button onClick={() => adjustStatus(status.id, 1)}>+</button>
      <button onClick={() => adjustStatus(status.id, -1)}>-</button>
      <button onClick={() => removeStatus(status.id)}>x</button>
    </div>
  );
};

const CombatTracker: React.FC = () => {
  const { combatants, currentIndex, reorderCombatants, nextTurn } =
    useInitiative();
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);

  useEffect(() => {
    setTimeLeft(TURN_TIME);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          nextTurn();
          return TURN_TIME;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [currentIndex, nextTurn]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderCombatants(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="initiative">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {combatants.map((c, i) => (
                <Draggable key={c.id} draggableId={c.id} index={i}>
                  {(p) => (
                    <li
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className={`p-4 rounded-lg bg-gray-800 ${i === currentIndex ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold">{c.name}</div>
                          <div className="text-sm text-gray-400">
                            Init: {c.initiative}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {c.statuses.map((s) => (
                            <StatusBadge key={s.id} status={s} cid={c.id} />
                          ))}
                        </div>
                      </div>
                      {i === currentIndex && (
                        <div className="mt-2 h-2 bg-gray-700 rounded">
                          <div
                            className="h-2 bg-blue-500 rounded"
                            style={{
                              width: `${(timeLeft / TURN_TIME) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CombatTracker;
