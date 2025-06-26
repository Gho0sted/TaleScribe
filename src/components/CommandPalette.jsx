// Упрощённая компонентная палитра команд
import React from 'react';

export const CommandPalette = ({ palette }) => {
  if (!palette.open) return null;
  return (
    <div className="palette">
      <input
        autoFocus
        placeholder="Команда"
        value={palette.search}
        onChange={(e) => palette.setSearch(e.target.value)}
      />
      <ul>
        {palette.commands.map((cmd) => (
          <li
            key={cmd.id}
            onClick={() => {
              cmd.action();
              palette.setOpen(false);
            }}
          >
            {cmd.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
