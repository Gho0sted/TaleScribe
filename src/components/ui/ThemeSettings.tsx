import React from 'react';
import { useThemeStore } from '../../stores/useThemeStore';

const fonts = ['Roboto', 'Inter, sans-serif', 'Open Sans'];

const ThemeSettings: React.FC = () => {
  const {
    scale,
    font,
    primaryColor,
    secondaryColor,
    setScale,
    setFont,
    setPrimaryColor,
    setSecondaryColor,
  } = useThemeStore();

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="block mb-1">Zoom: {Math.round(scale * 100)}%</label>
        <input
          type="range"
          min="0.8"
          max="1.2"
          step="0.01"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Font</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="input"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Primary Accent</label>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">Secondary Accent</label>
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ThemeSettings;
