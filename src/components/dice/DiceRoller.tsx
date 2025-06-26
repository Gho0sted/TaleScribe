import React from 'react';
import { Button } from '../ui/Button';

export const DiceRoller = ({ onRoll }: { onRoll: (value: number) => void }) => {
  const roll = () => {
    const value = Math.floor(Math.random() * 20) + 1;
    onRoll(value);
  };
  return <Button onClick={roll}>Roll D20</Button>;
};
