import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface RetroWindowProps {
  id: string;
  title: string;
  path: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isFocused: boolean;
  isMinimized: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  soundEnabled: boolean;
  onSound: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const RetroWindow: React.FC<RetroWindowProps> = ({
  id,
  title,
  path,
  icon,
  children,
  isFocused,
  isMinimized,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  soundEnabled,
  onSound,
  defaultPosition = { x: 200, y: 55 },
  defaultSize = { width: 680, height: 500 },
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaxPos, setPreMaxPos] = useState(defaultPosition);
  const [preMaxSize, setPreMaxSize] = useState(defaultSize);
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);

  // Drag state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number } | null>(null);

  // Resize state
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; startW: number; startH: number } | null>(null);

  const handleMaximize = useCallback(() => {
    onSound();
    if (!isMaximized) {
      setPreMaxPos(position);
      setPreMaxSize(size);
    } else {
      setPosition(preMaxPos);
      setSize(preMaxSize);
    }
    setIsMaximized(v => !v);
  }, [isMaximized, position, size, preMaxPos, preMaxSize, onSound]);

  // ── Drag Handlers (Native Pointer Capture) ─────────────────────────
  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    if (!isFocused) onFocus();

    // Prevent text selection during drag
    e.preventDefault();

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    isDraggingRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handleTitlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !dragStartRef.current) return;

    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;

    const newX = Math.max(2, dragStartRef.current.posX + dx);
    const newY = Math.max(2, dragStartRef.current.posY + dy);

    setPosition({ x: newX, y: newY });
  };

  const handleTitlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      dragStartRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch { }
    }
  };

  // ── Resize Handlers (Corner Handle) ────────────────────────────────
  const handleResizePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.stopPropagation();
    e.preventDefault();
    if (!isFocused) onFocus();

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    isResizingRef.current = true;
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
  };

  const handleResizePointerMove = (e: React.PointerEvent) => {
    if (!isResizingRef.current || !resizeStartRef.current) return;

    const dx = e.clientX - resizeStartRef.current.mouseX;
    const dy = e.clientY - resizeStartRef.current.mouseY;

    const newW = Math.max(320, resizeStartRef.current.startW + dx);
    const newH = Math.max(220, resizeStartRef.current.startH + dy);

    setSize({ width: newW, height: newH });
  };

  const handleResizePointerUp = (e: React.PointerEvent) => {
    if (isResizingRef.current) {
      isResizingRef.current = false;
      resizeStartRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch { }
    }
  };

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.06 }}
      style={{
        position: 'absolute',
        left: isMaximized ? '4px' : position.x,
        top: isMaximized ? '4px' : position.y,
        width: isMaximized ? 'calc(100% - 8px)' : size.width,
        height: isMaximized ? 'calc(100% - 54px)' : size.height,
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px 6px 0 0',
        overflow: 'hidden',
      }}
      className={`bg-window phosphor-reveal ${isFocused ? 'window-border' : 'window-border-inactive'}`}
      onPointerDown={() => { if (!isFocused) onFocus(); }}
    >
      {/* ── Title Bar ───────────────────────────────────────────── */}
      <div
        className={`flex items-center select-none ${isFocused ? 'titlebar-active' : 'titlebar-inactive'}`}
        style={{
          height: '30px',
          minHeight: '30px',
          flexShrink: 0,
          padding: '0 6px 0 8px',
          gap: '6px',
          cursor: isMaximized ? 'default' : 'grab',
          touchAction: 'none',
        }}
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        onDoubleClick={handleMaximize}
      >
        {/* Pixel icon */}
        {icon && (
          <span style={{
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            imageRendering: 'pixelated',
            pointerEvents: 'none',
          }}>
            {icon}
          </span>
        )}

        {/* Path / title text */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 'bold',
            color: isFocused ? 'var(--title-text-active)' : 'var(--title-text-inactive)',
            letterSpacing: '0.8px',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textShadow: isFocused ? '0 0 8px rgba(192,240,200,0.3)' : 'none',
            pointerEvents: 'none',
          }}
        >
          {path}
        </span>

        {/* Window Controls — raised Win95 bevel buttons */}
        <div
          style={{ display: 'flex', gap: '3px', flexShrink: 0, marginLeft: '6px' }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Minimize _ */}
          <button
            className="win-ctrl"
            title="Minimize"
            onClick={(e) => { e.stopPropagation(); onSound(); onMinimize(); }}
          >
            <span style={{ display: 'block', width: '10px', height: '2px', background: 'currentColor', marginTop: '6px' }} />
          </button>

          {/* Maximize □ / Restore ⧉ */}
          <button
            className="win-ctrl"
            title={isMaximized ? 'Restore' : 'Maximize'}
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
          >
            {isMaximized
              ? <span style={{ fontSize: '10px', lineHeight: 1, fontWeight: 'bold' }}>⧉</span>
              : <span style={{ display: 'block', width: '10px', height: '9px', border: '2px solid currentColor' }} />
            }
          </button>

          {/* Close ✕ */}
          <button
            className="win-ctrl win-ctrl-close"
            title="Close"
            onClick={(e) => { e.stopPropagation(); onSound(); onClose(); }}
            style={{ fontSize: '11px', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Window Body ─────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-hidden retro-scroll window-body-inset"
        style={{ background: 'var(--neos-window)', position: 'relative' }}
      >
        {children}
      </div>

      {/* ── Interactive Resize Handle (Bottom-Right Corner) ────── */}
      {!isMaximized && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '18px',
            height: '18px',
            cursor: 'se-resize',
            opacity: 0.6,
            zIndex: 10,
            touchAction: 'none',
          }}
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          title="Drag to resize window"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'block', pointerEvents: 'none' }}>
            <line x1="6" y1="18" x2="18" y2="6" stroke="var(--phosphor)" strokeWidth="1.5" />
            <line x1="10" y1="18" x2="18" y2="10" stroke="var(--phosphor)" strokeWidth="1.5" />
            <line x1="14" y1="18" x2="18" y2="14" stroke="var(--phosphor)" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default RetroWindow;
