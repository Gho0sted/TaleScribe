import React from 'react';

export const DiceHistory = ({ rolls }: { rolls: number[] }) => (
  <ul>
    {rolls.map((r, i) => (
      <li key={i}>{r}</li>
    ))}
  </ul>
);
