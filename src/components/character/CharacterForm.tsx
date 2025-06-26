import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const CharacterForm = () => (
  <form>
    <Input placeholder="Name" />
    <Button type="submit">Save</Button>
  </form>
);
