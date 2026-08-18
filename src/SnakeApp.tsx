import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playBeep, playGameOver } from './sound';

const GRID_SIZE = 18;
const INITIAL_SNAKE = [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 },
];

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeAppProps {
  soundEnabled: boolean;
}

const SnakeApp: React.FC<SnakeAppProps> = ({ soundEnabled }) => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 12, y: 9 });
  const [dir, setDir] = useState<Direction>('RIGHT');
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake_highscore') || '0', 10);
  });

  const dirRef = useRef<Direction>('RIGHT');
  dirRef.current = dir;

  const generateFood = useCallback((currentSnake: { x: number; y: number }[]) => {
    let newFood: { x: number; y: number };
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDir('RIGHT');
    dirRef.current = 'RIGHT';
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setGameHasStarted(true);
    setFood(generateFood(INITIAL_SNAKE));
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const current = dirRef.current;
      if (!gameHasStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        setGameHasStarted(true);
      }
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && current !== 'DOWN') {
        setDir('UP');
      } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && current !== 'UP') {
        setDir('DOWN');
      } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && current !== 'RIGHT') {
        setDir('LEFT');
      } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && current !== 'LEFT') {
        setDir('RIGHT');
      } else if (e.key === ' ') {
        setIsPaused(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameHasStarted]);

  // Game loop
  useEffect(() => {
    if (!gameHasStarted || isGameOver || isPaused) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (dirRef.current) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setIsGameOver(true);
          playGameOver(soundEnabled);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(s => s.x === head.x && s.y === head.y)) {
          setIsGameOver(true);
          playGameOver(soundEnabled);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          playBeep(660, 0.08, 'square', soundEnabled);
          setScore(s => {
            const next = s + 10;
            if (next > highScore) {
              setHighScore(next);
              localStorage.setItem('snake_highscore', next.toString());
            }
            return next;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [gameHasStarted, food, isGameOver, isPaused, generateFood, highScore, soundEnabled]);

  const handleDirChange = useCallback((newDir: Direction) => {
    if (!gameHasStarted) setGameHasStarted(true);
    const current = dirRef.current;
    if (newDir === 'UP' && current !== 'DOWN') setDir('UP');
    if (newDir === 'DOWN' && current !== 'UP') setDir('DOWN');
    if (newDir === 'LEFT' && current !== 'RIGHT') setDir('LEFT');
    if (newDir === 'RIGHT' && current !== 'LEFT') setDir('RIGHT');
  }, [gameHasStarted]);

  return (
    <div className="h-full flex flex-col p-3 font-mono bg-void overflow-y-auto">
      {/* Header Info */}
      <div className="pb-2 mb-2 border-b border-dim-color flex justify-between items-center">
        <div className="font-vt323 text-xl text-p text-glow">
          SNAKE.EXE — RETRO ARCADE
        </div>
        <div className="flex gap-4 text-xs">
          <span>SCORE: <strong className="text-p">{score}</strong></span>
          <span>HIGH: <strong className="text-amber">{highScore}</strong></span>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="flex-1 flex flex-col items-center justify-center relative py-2">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(300px, 78vw)',
            height: 'min(300px, 78vw)',
            border: '2px solid var(--border-mid)',
            background: 'var(--window-bg-dark)',
            position: 'relative',
          }}
        >
          {/* Render Snake & Food */}
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                style={{
                  background: isHead
                    ? 'var(--phosphor-hot)'
                    : isSnake
                    ? 'var(--phosphor)'
                    : isFood
                    ? 'var(--amber)'
                    : 'transparent',
                  boxShadow: isHead
                    ? 'var(--glow-phosphor)'
                    : isFood
                    ? '0 0 6px var(--amber)'
                    : undefined,
                  border: isSnake || isFood ? '1px solid var(--void)' : undefined,
                }}
              />
            );
          })}

          {/* Start Screen Overlay */}
          {!gameHasStarted && !isGameOver && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center z-20">
              <div className="font-vt323 text-3xl text-p text-glow mb-1">SNAKE.EXE</div>
              <div className="text-xs text-p-dim mb-4">PRESS ARROW KEYS OR USE D-PAD BELOW</div>
              <button className="retro-btn" onClick={() => setGameHasStarted(true)}>
                [ START GAME ]
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center z-20">
              <div className="font-vt323 text-3xl text-amber mb-1">GAME OVER</div>
              <div className="text-xs text-p-dim mb-4">FINAL SCORE: {score}</div>
              <button className="retro-btn" onClick={resetGame}>
                [ PLAY AGAIN ]
              </button>
            </div>
          )}

          {/* Pause Overlay */}
          {isPaused && !isGameOver && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-20">
              <div className="font-vt323 text-3xl text-p blink">PAUSED</div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2 mt-2">
          <button className="retro-btn text-xs" onClick={() => setIsPaused(p => !p)}>
            {isPaused ? '[ RESUME ]' : '[ PAUSE ]'}
          </button>
          <button className="retro-btn retro-btn-amber text-xs" onClick={resetGame}>
            [ RESTART ]
          </button>
        </div>

        {/* On-Screen D-Pad for Mobile Touch Devices */}
        <div className="sm:hidden flex flex-col items-center mt-3 gap-1 select-none">
          <button
            className="retro-btn text-sm w-12 h-9 flex items-center justify-center active:scale-95"
            onClick={() => handleDirChange('UP')}
          >
            ▲
          </button>
          <div className="flex gap-3">
            <button
              className="retro-btn text-sm w-12 h-9 flex items-center justify-center active:scale-95"
              onClick={() => handleDirChange('LEFT')}
            >
              ◄
            </button>
            <button
              className="retro-btn text-sm w-12 h-9 flex items-center justify-center active:scale-95"
              onClick={() => handleDirChange('DOWN')}
            >
              ▼
            </button>
            <button
              className="retro-btn text-sm w-12 h-9 flex items-center justify-center active:scale-95"
              onClick={() => handleDirChange('RIGHT')}
            >
              ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeApp;
