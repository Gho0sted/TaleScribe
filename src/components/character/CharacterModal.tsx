import React from 'react';
import { Modal } from '../ui/Modal';

export const CharacterModal = ({ open, children }: { open: boolean; children: React.ReactNode }) => (
  <Modal open={open}>{children}</Modal>
);
