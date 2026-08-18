import React, { useState, useCallback, useEffect } from 'react';

// ─── Minesweeper Game ──────────────────────────────────────────────────────

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
};

type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

interface Difficulty {
  label: string;
  rows: number;
  cols: number;
  mines: number;
}

const DIFFICULTIES: Difficulty[] = [
  { label: 'EASY',   rows: 9,  cols: 9,  mines: 10 },
  { label: 'MEDIUM', rows: 12, cols: 12, mines: 25 },
  { label: 'HARD',   rows: 14, cols: 14, mines: 40 },
];

const NEIGHBOR_COLORS: Record<number, string> = {
  1: '#4ade80',
  2: '#60a5fa',
  3: '#f87171',
  4: '#818cf8',
  5: '#f97316',
  6: '#22d3ee',
  7: '#e879f9',
  8: '#ffffff',
};

function createEmptyBoard(rows: number, cols: number): CellState[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0,
    }))
  );
}

function placeMines(board: CellState[][], rows: number, cols: number, mines: number, safeR: number, safeC: number): CellState[][] {
  const next = board.map(row => row.map(cell => ({ ...cell })));
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!next[r][c].isMine && !(r === safeR && c === safeC)) {
      next[r][c].isMine = true;
      placed++;
    }
  }
  // Calculate neighbors
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && next[nr][nc].isMine) count++;
        }
      }
      next[r][c].neighborCount = count;
    }
  }
  return next;
}

function floodReveal(board: CellState[][], rows: number, cols: number, r: number, c: number): CellState[][] {
  const next = board.map(row => row.map(cell => ({ ...cell })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    if (cr < 0 || cr >= rows || cc < 0 || cc >= cols) continue;
    const cell = next[cr][cc];
    if (cell.isRevealed || cell.isFlagged || cell.isMine) continue;
    cell.isRevealed = true;
    if (cell.neighborCount === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          stack.push([cr + dr, cc + dc]);
    }
  }
  return next;
}

const MinesweeperApp: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [board, setBoard] = useState<CellState[][]>(() => createEmptyBoard(DIFFICULTIES[0].rows, DIFFICULTIES[0].cols));
  const [status, setStatus] = useState<GameStatus>('idle');
  const [flagsLeft, setFlagsLeft] = useState(DIFFICULTIES[0].mines);
  const [time, setTime] = useState(0);
  const [showDiffMenu, setShowDiffMenu] = useState(false);
  const [isFlagMode, setIsFlagMode] = useState(false);

  // Timer
  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const resetGame = useCallback((diff: Difficulty = difficulty) => {
    setBoard(createEmptyBoard(diff.rows, diff.cols));
    setStatus('idle');
    setFlagsLeft(diff.mines);
    setTime(0);
    setShowDiffMenu(false);
  }, [difficulty]);

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    resetGame(diff);
  };

  const handleReveal = useCallback((r: number, c: number) => {
    if (status === 'won' || status === 'lost') return;
    setBoard(prev => {
      const cell = prev[r][c];
      if (cell.isRevealed || cell.isFlagged) return prev;

      let next = prev;
      // First click — place mines safely
      if (status === 'idle') {
        next = placeMines(createEmptyBoard(difficulty.rows, difficulty.cols), difficulty.rows, difficulty.cols, difficulty.mines, r, c);
        setStatus('playing');
      }

      if (next[r][c].isMine) {
        // Reveal all mines
        const boom = next.map(row => row.map(cell => ({
          ...cell,
          isRevealed: cell.isMine ? true : cell.isRevealed,
        })));
        setStatus('lost');
        return boom;
      }

      const revealed = floodReveal(next, difficulty.rows, difficulty.cols, r, c);

      // Check win
      const totalSafe = difficulty.rows * difficulty.cols - difficulty.mines;
      const revealedCount = revealed.flat().filter(c => c.isRevealed && !c.isMine).length;
      if (revealedCount === totalSafe) setStatus('won');

      return revealed;
    });
  }, [status, difficulty]);

  const handleFlag = useCallback((e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (status === 'won' || status === 'lost' || status === 'idle') return;
    setBoard(prev => {
      const cell = prev[r][c];
      if (cell.isRevealed) return prev;
      const next = prev.map(row => row.map(c => ({ ...c })));
      next[r][c].isFlagged = !cell.isFlagged;
      setFlagsLeft(f => cell.isFlagged ? f + 1 : f - 1);
      return next;
    });
  }, [status]);

  const handleCellClick = useCallback((r: number, c: number) => {
    if (isFlagMode) {
      if (status === 'won' || status === 'lost' || status === 'idle') return;
      setBoard(prev => {
        const cell = prev[r][c];
        if (cell.isRevealed) return prev;
        const next = prev.map(row => row.map(cell => ({ ...cell })));
        next[r][c].isFlagged = !cell.isFlagged;
        setFlagsLeft(f => cell.isFlagged ? f + 1 : f - 1);
        return next;
      });
    } else {
      handleReveal(r, c);
    }
  }, [isFlagMode, status, handleReveal]);

  const cellSize = difficulty.cols <= 9 ? 32 : difficulty.cols <= 12 ? 25 : 21;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      background: 'var(--neos-bg)',
      fontFamily: 'var(--font-mono)',
      color: 'var(--phosphor)',
      padding: '8px 12px',
      gap: '8px',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        justifyContent: 'space-between',
        background: 'rgba(0,255,100,0.04)',
        border: '1px solid var(--phosphor-dim)',
        borderRadius: '4px',
        padding: '8px 14px',
      }}>
        {/* Flag counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '60px' }}>
          <span style={{ fontSize: '16px' }}>🚩</span>
          <span style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#f87171',
            fontVariantNumeric: 'tabular-nums',
            minWidth: '32px',
            textAlign: 'right',
          }}>{String(Math.max(0, flagsLeft)).padStart(3, '0')}</span>
        </div>

        {/* Center: Reset + Difficulty */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => resetGame()}
            style={{
              background: 'linear-gradient(180deg, #1a2e1a 0%, #0d1a0d 100%)',
              border: '2px solid var(--phosphor-dim)',
              color: 'var(--phosphor)',
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              width: '42px',
              height: '42px',
              borderRadius: '6px',
              cursor: 'pointer',
              lineHeight: 1,
              transition: 'all 0.1s ease',
            }}
            title="New Game"
          >
            {status === 'won' ? '😎' : status === 'lost' ? '💀' : '🙂'}
          </button>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDiffMenu(v => !v)}
              style={{
                background: 'rgba(0,255,100,0.05)',
                border: '1px solid var(--phosphor-dim)',
                color: 'var(--phosphor-dim)',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                padding: '3px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
            >{difficulty.label} ▾</button>
            {showDiffMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '4px',
                background: '#0a130a',
                border: '1px solid var(--phosphor-mid)',
                borderRadius: '4px',
                zIndex: 100,
                overflow: 'hidden',
              }}>
                {DIFFICULTIES.map(d => (
                  <button
                    key={d.label}
                    onClick={() => handleDifficultyChange(d)}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: d.label === difficulty.label ? 'rgba(0,255,100,0.12)' : 'transparent',
                      border: 'none',
                      color: d.label === difficulty.label ? 'var(--phosphor)' : 'var(--phosphor-dim)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      padding: '7px 20px',
                      cursor: 'pointer',
                      letterSpacing: '1px',
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {d.label} · {d.rows}×{d.cols} · {d.mines}💣
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsFlagMode(v => !v)}
            style={{
              background: isFlagMode ? 'rgba(248,113,113,0.2)' : 'rgba(0,255,100,0.05)',
              border: `1px solid ${isFlagMode ? '#f87171' : 'var(--phosphor-dim)'}`,
              color: isFlagMode ? '#f87171' : 'var(--phosphor-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              padding: '2px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
            }}
            title="Toggle click mode for touch devices (Dig vs Flag)"
          >
            {isFlagMode ? '🚩 FLAG MODE' : '⛏ DIG MODE'}
          </button>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '60px', justifyContent: 'flex-end' }}>
          <span style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#f87171',
            fontVariantNumeric: 'tabular-nums',
            minWidth: '32px',
            textAlign: 'left',
          }}>{String(Math.min(999, time)).padStart(3, '0')}</span>
          <span style={{ fontSize: '16px' }}>⏱️</span>
        </div>
      </div>

      {/* Status banner */}
      {(status === 'won' || status === 'lost') && (
        <div style={{
          padding: '6px 18px',
          borderRadius: '4px',
          fontSize: '12px',
          letterSpacing: '2px',
          fontWeight: 'bold',
          background: status === 'won' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
          border: `1px solid ${status === 'won' ? '#4ade80' : '#f87171'}`,
          color: status === 'won' ? '#4ade80' : '#f87171',
        }}>
          {status === 'won' ? '✓ FIELD CLEARED · MISSION COMPLETE' : '✗ MINE DETONATED · GAME OVER'}
        </div>
      )}

      {/* Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${difficulty.cols}, ${cellSize}px)`,
          gap: '2px',
          padding: '10px',
          background: 'rgba(0,0,0,0.6)',
          border: '2px solid rgba(0,255,100,0.15)',
          borderRadius: '6px',
          userSelect: 'none',
        }}
        onContextMenu={e => e.preventDefault()}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isExploded = status === 'lost' && cell.isMine && cell.isRevealed;
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={e => handleFlag(e, r, c)}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: cell.isRevealed
                    ? (cell.isMine ? cellSize * 0.5 : cellSize * 0.48)
                    : cellSize * 0.5,
                  fontWeight: 'bold',
                  cursor: cell.isRevealed ? 'default' : 'pointer',
                  border: 'none',
                  borderRadius: '3px',
                  outline: 'none',
                  transition: 'background 0.05s ease',
                  background: isExploded
                    ? '#7f1d1d'
                    : cell.isRevealed
                      ? 'rgba(0,0,0,0.55)'
                      : 'rgba(0,255,100,0.08)',
                  boxShadow: cell.isRevealed
                    ? 'inset 0 1px 3px rgba(0,0,0,0.8)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.5)',
                  color: cell.isRevealed && !cell.isMine && cell.neighborCount > 0
                    ? NEIGHBOR_COLORS[cell.neighborCount] ?? '#fff'
                    : 'inherit',
                }}
                title={`(${r},${c})`}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? '💣'
                    : cell.neighborCount > 0
                      ? cell.neighborCount
                      : ''
                  : cell.isFlagged
                    ? '🚩'
                    : ''}
              </button>
            );
          })
        )}
      </div>

      {/* Instructions */}
      <div style={{
        fontSize: '9px',
        color: 'var(--phosphor-dim)',
        letterSpacing: '0.5px',
        textAlign: 'center',
        opacity: 0.6,
        lineHeight: 1.6,
      }}>
        LEFT CLICK: REVEAL · RIGHT CLICK: FLAG/UNFLAG MINE
      </div>
    </div>
  );
};

export default MinesweeperApp;
