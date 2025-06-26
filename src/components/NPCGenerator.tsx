import React from 'react';
import { useNPCGenerator } from '../stores/useContentStore';

const NPCGenerator: React.FC = () => {
  const { npcs, generateNPC, resetNPCs } = useNPCGenerator();

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">NPC Generator</h3>
      <div className="space-x-3 mb-4">
        <button className="btn-primary" onClick={generateNPC}>Generate</button>
        <button className="btn-secondary" onClick={resetNPCs}>Reset</button>
      </div>
      <div className="grid gap-4">
        {npcs.map((npc) => (
          <div key={npc.id} className="card animate-slideUp">
            <div className="font-bold mb-1">{npc.name}</div>
            <div className="text-sm text-gray-400">{npc.race} {npc.occupation}</div>
            <div className="text-sm text-gray-400">Voice: {npc.voiceTraits}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NPCGenerator;
