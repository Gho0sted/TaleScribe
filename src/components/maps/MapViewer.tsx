import React, { useRef, useState } from 'react';
import { useMapStore } from '../../stores/mapStore';

const MapViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragMarker, setDragMarker] = useState<string | null>(null);
  const [dragToken, setDragToken] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [zoom, setZoom] = useState(1);

  const markers = useMapStore((s) => s.markers);
  const tokens = useMapStore((s) => s.tokens);
  const background = useMapStore((s) => s.background);
  const addMarker = useMapStore((s) => s.addMarker);
  const updateMarker = useMapStore((s) => s.updateMarker);
  const removeMarker = useMapStore((s) => s.removeMarker);
  const addToken = useMapStore((s) => s.addToken);
  const updateToken = useMapStore((s) => s.updateToken);
  const setBackground = useMapStore((s) => s.setBackground);

  const coords = (e: PointerEvent | React.PointerEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - pan.x) / (rect.width * zoom),
      y: (e.clientY - rect.top - pan.y) / (rect.height * zoom),
    };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== containerRef.current) return;
    const { x, y } = coords(e.nativeEvent);
    addMarker(x, y);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button === 1 || e.shiftKey) {
      setPanning(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (panning) {
      setPan((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
      return;
    }
    if (dragMarker) {
      const { x, y } = coords(e);
      updateMarker(dragMarker, x, y);
    } else if (dragToken) {
      const { x, y } = coords(e);
      updateToken(dragToken, { x, y });
    }
  };

  const stopDrag = () => {
    setDragMarker(null);
    setDragToken(null);
    setPanning(false);
  };

  const onWheel = (e: React.WheelEvent) => {
    const delta = -e.deltaY * 0.001;
    setZoom((z) => Math.min(3, Math.max(0.5, z + delta)));
  };

  const svgLines = markers.reduce<JSX.Element[]>((acc, m, i) => {
    if (i === 0) return acc;
    const prev = markers[i - 1];
    acc.push(
      <line
        key={`${prev.id}-${m.id}`}
        x1={prev.x * 100}
        y1={prev.y * 100}
        x2={m.x * 100}
        y2={m.y * 100}
        stroke="yellow"
        strokeWidth="0.3"
      />,
    );
    return acc;
  }, []);

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <input
          type="url"
          placeholder="Map image URL"
          className="input"
          onBlur={(e) => setBackground(e.target.value)}
        />
        <input
          type="url"
          placeholder="Token image URL"
          className="input"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              addToken({
                x: 0.5,
                y: 0.5,
                src: e.currentTarget.value,
                rotation: 0,
                scale: 1,
              });
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      <div
        ref={containerRef}
        data-testid="map-area"
        className="relative w-full h-96 border border-gray-700 overflow-hidden bg-gray-800"
        onClick={handleMapClick}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
        onPointerDown={onPointerDown}
        onWheel={onWheel}
      >
        <div
          className="absolute inset-0 bg-center bg-contain"
          style={{
            backgroundImage: `url(${background})`,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {svgLines}
          </svg>
          {markers.map((m) => (
            <div
              key={m.id}
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white cursor-pointer hover:scale-110 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }}
              onPointerDown={(e) => {
                e.stopPropagation();
                if (e.button === 2) {
                  removeMarker(m.id);
                  return;
                }
                setDragMarker(m.id);
              }}
            />
          ))}
          {tokens.map((t) => (
            <img
              key={t.id}
              src={t.src}
              className="absolute w-8 h-8 cursor-move select-none"
              style={{
                left: `${t.x * 100}%`,
                top: `${t.y * 100}%`,
                transform: `translate(-50%, -50%) rotate(${t.rotation}deg) scale(${t.scale})`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                setDragToken(t.id);
              }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapViewer;
