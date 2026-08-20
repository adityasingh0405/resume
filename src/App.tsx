import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BiosScreen from './BiosScreen';
import RetroWindow from './RetroWindow';
import AboutApp from './AboutApp';
import TerminalApp from './TerminalApp';
import ProjectsApp from './ProjectsApp';
import SkillsApp from './SkillsApp';
import ExperienceApp from './ExperienceApp';
import ContactApp from './ContactApp';
import GithubApp from './GithubApp';
import LeetcodeApp from './LeetcodeApp';
import ResearchApp from './ResearchApp';
import SnakeApp from './SnakeApp';
import MinesweeperApp from './MinesweeperApp';
import SynthApp from './SynthApp';
import DisplayCfgApp, { ThemeMode } from './DisplayCfgApp';
import StickyNotesApp from './StickyNotesApp';
import { SpotifyWidget } from './SpotifyWidget';
import RetroMonitorFrame from './RetroMonitorFrame';
import { playClick, playFloppySeek, playClose } from './sound';

import {
  IconTerminal,
  IconAboutCard,
  IconFolder,
  IconChip,
  IconScroll,
  IconSnake,
  IconSynth,
  IconDisplay,
  IconNotes,
  IconMail,
  IconGithub,
  IconLeetcode,
  IconResearch,
  IconMinesweeper,
} from './PixelIcons';

// ─── App Registry ──────────────────────────────────────────────────────────

export type AppId =
  | 'about'
  | 'terminal'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'github'
  | 'leetcode'
  | 'research'
  | 'contact'
  | 'snake'
  | 'minesweeper'
  | 'synth'
  | 'display'
  | 'notes';

interface AppDef {
  id: AppId;
  label: string;
  exe: string;
  path: string;
  icon: React.ReactElement<{ size?: number }>;
  category: 'SYSTEM' | 'APPS' | 'GAMES' | 'TOOLS';
  isDesktop?: boolean;
  secretApp?: boolean;
  defaultPos: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

const APPS: AppDef[] = [
  {
    id: 'about',
    label: 'ABOUT.EXE',
    exe: 'ABOUT.EXE',
    path: 'C:\\PEGASUS\\ABOUT.EXE',
    icon: <IconAboutCard size={46} />,
    category: 'SYSTEM',
    isDesktop: true,
    defaultPos: { x: 200, y: 50 },
    defaultSize: { width: 680, height: 500 },
  },
  {
    id: 'terminal',
    label: 'TERMINAL.EXE',
    exe: 'TERMINAL.EXE',
    path: 'C:\\PEGASUS\\TERMINAL.EXE',
    icon: <IconTerminal size={46} />,
    category: 'SYSTEM',
    isDesktop: false,
    secretApp: true,
    defaultPos: { x: 220, y: 50 },
    defaultSize: { width: 680, height: 490 },
  },
  {
    id: 'projects',
    label: 'PROJECTS/',
    exe: 'PROJECTS.DIR',
    path: 'C:\\PEGASUS\\PROJECTS\\',
    icon: <IconFolder size={46} />,
    category: 'APPS',
    isDesktop: true,
    defaultPos: { x: 220, y: 55 },
    defaultSize: { width: 750, height: 540 },
  },
  {
    id: 'skills',
    label: 'SKILLS.DLL',
    exe: 'SKILLS.DLL',
    path: 'C:\\PEGASUS\\SKILLS.DLL',
    icon: <IconChip size={46} />,
    category: 'SYSTEM',
    isDesktop: true,
    defaultPos: { x: 240, y: 48 },
    defaultSize: { width: 700, height: 510 },
  },
  {
    id: 'experience',
    label: 'XPERIENCE.LOG',
    exe: 'XPERIENCE.LOG',
    path: 'C:\\PEGASUS\\XPERIENCE.LOG',
    icon: <IconScroll size={46} />,
    category: 'APPS',
    isDesktop: true,
    defaultPos: { x: 210, y: 60 },
    defaultSize: { width: 680, height: 520 },
  },
  {
    id: 'github',
    label: 'GITHUB.URL',
    exe: 'GITHUB.URL',
    path: 'C:\\PEGASUS\\GITHUB.URL',
    icon: <IconGithub size={46} />,
    category: 'APPS',
    isDesktop: true,
    defaultPos: { x: 230, y: 50 },
    defaultSize: { width: 660, height: 510 },
  },
  {
    id: 'leetcode',
    label: 'LEETCODE.EXE',
    exe: 'LEETCODE.EXE',
    path: 'C:\\PEGASUS\\LEETCODE.EXE',
    icon: <IconLeetcode size={46} />,
    category: 'APPS',
    isDesktop: true,
    defaultPos: { x: 250, y: 55 },
    defaultSize: { width: 650, height: 510 },
  },
  {
    id: 'research',
    label: 'RESEARCH.PDF',
    exe: 'RESEARCH.PDF',
    path: 'C:\\PEGASUS\\RESEARCH.PDF',
    icon: <IconResearch size={46} />,
    category: 'APPS',
    isDesktop: true,
    defaultPos: { x: 220, y: 65 },
    defaultSize: { width: 680, height: 520 },
  },
  {
    id: 'contact',
    label: 'CONTACT.BAT',
    exe: 'CONTACT.BAT',
    path: 'C:\\PEGASUS\\CONTACT.BAT',
    icon: <IconMail size={46} />,
    category: 'APPS',
    isDesktop: true,
    defaultPos: { x: 230, y: 65 },
    defaultSize: { width: 620, height: 500 },
  },
  {
    id: 'snake',
    label: 'SNAKE.EXE',
    exe: 'SNAKE.EXE',
    path: 'C:\\PEGASUS\\GAMES\\SNAKE.EXE',
    icon: <IconSnake size={46} />,
    category: 'GAMES',
    isDesktop: false,
    defaultPos: { x: 260, y: 55 },
    defaultSize: { width: 460, height: 510 },
  },
  {
    id: 'minesweeper',
    label: 'MINES.EXE',
    exe: 'MINES.EXE',
    path: 'C:\\PEGASUS\\GAMES\\MINES.EXE',
    icon: <IconMinesweeper size={46} />,
    category: 'GAMES',
    isDesktop: false,
    defaultPos: { x: 220, y: 60 },
    defaultSize: { width: 480, height: 560 },
  },
  {
    id: 'synth',
    label: 'SYNTH.EXE',
    exe: 'SYNTH.EXE',
    path: 'C:\\PEGASUS\\TOOLS\\SYNTH.EXE',
    icon: <IconSynth size={46} />,
    category: 'TOOLS',
    isDesktop: false,
    defaultPos: { x: 220, y: 75 },
    defaultSize: { width: 580, height: 470 },
  },
  {
    id: 'display',
    label: 'DISPLAY.CFG',
    exe: 'DISPLAY.CFG',
    path: 'C:\\PEGASUS\\SYS\\DISPLAY.CFG',
    icon: <IconDisplay size={46} />,
    category: 'SYSTEM',
    isDesktop: false,
    defaultPos: { x: 240, y: 70 },
    defaultSize: { width: 560, height: 480 },
  },
  {
    id: 'notes',
    label: 'NOTES.TXT',
    exe: 'NOTES.TXT',
    path: 'C:\\PEGASUS\\DOCS\\NOTES.TXT',
    icon: <IconNotes size={46} />,
    category: 'TOOLS',
    isDesktop: false,
    defaultPos: { x: 270, y: 60 },
    defaultSize: { width: 500, height: 420 },
  },
];

// ─── Clock ─────────────────────────────────────────────────────────────────

const Clock: React.FC = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        })
      );

      const d = now.getDate().toString().padStart(2, '0');
      const m = (now.getMonth() + 1).toString().padStart(2, '0');
      const y = now.getFullYear();

      setDate(`${d}-${m}-${y}`);
    };

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0px',
        lineHeight: 1.15,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 'bold',
          color: 'var(--phosphor)',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
        }}
      >
        {time}
      </span>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--phosphor-dim)',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
        }}
      >
        {date}
      </span>
    </div>
  );
};

// ─── CPU Meter ─────────────────────────────────────────────────────────────

const CpuMeter: React.FC<{ taskCount: number }> = ({ taskCount }) => {
  const [load, setLoad] = useState(4);

  useEffect(() => {
    const base = Math.min(taskCount * 14 + 4, 78);

    const id = setInterval(
      () => setLoad(base + Math.floor(Math.random() * 10)),
      900
    );

    return () => clearInterval(id);
  }, [taskCount]);

  const bars = Math.floor(load / 10);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          color: 'var(--phosphor-dim)',
          letterSpacing: '1px',
        }}
      >
        CPU
      </span>

      <div
        style={{
          display: 'flex',
          gap: '1px',
          alignItems: 'flex-end',
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`cpu-bar ${i < bars
              ? i > 7
                ? 'active-high'
                : i > 5
                  ? 'active-mid'
                  : 'active-low'
              : ''
              }`}
            style={{
              height: `${8 + i}px`,
            }}
          />
        ))}
      </div>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          color: 'var(--phosphor-dim)',
          minWidth: '24px',
        }}
      >
        {load}%
      </span>
    </div>
  );
};

// ─── Desktop Icon ──────────────────────────────────────────────────────────

const DesktopIcon: React.FC<{
  app: AppDef;
  isSelected: boolean;
  isOpen: boolean;
  onSingleClick: () => void;
  onDoubleClick: () => void;
}> = ({
  app,
  isSelected,
  isOpen,
  onSingleClick,
  onDoubleClick,
}) => (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isOpen ? 'running' : ''
        }`}
      onClick={(e) => {
        e.stopPropagation();
        onSingleClick();
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
          onDoubleClick();
        }
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      title={`Double-click to open ${app.label}`}
    >
      <div
        className="icon-wrapper"
        style={{
          filter:
            isSelected || isOpen
              ? 'brightness(1.2)'
              : 'brightness(0.75)',
        }}
      >
        {app.icon}
      </div>

      <span className="icon-label">{app.label}</span>
    </div>
  );

// ─── Main App ──────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppId[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<AppId | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<AppId[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [windowZOrder, setWindowZOrder] = useState<AppId[]>([]);
  const [themeMode, setThemeMode] = useState<ThemeMode>('green');

  // ── Notification state ────────────────────────────────────────────────
  const [showNotifications, setShowNotifications] = useState(false);

  const sound = useCallback(
    () => playClick(soundEnabled),
    [soundEnabled]
  );

  const openApp = useCallback(
    (id: AppId) => {
      playFloppySeek(soundEnabled);

      setOpenWindows((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );

      setMinimizedWindows((prev) =>
        prev.filter((w) => w !== id)
      );

      setFocusedWindow(id);

      setWindowZOrder((prev) => [
        ...prev.filter((w) => w !== id),
        id,
      ]);

      setShowStartMenu(false);
      setSearchQuery('');
    },
    [soundEnabled]
  );

  const closeApp = useCallback(
    (id: AppId) => {
      playClose(soundEnabled);

      setOpenWindows((prev) =>
        prev.filter((w) => w !== id)
      );

      setMinimizedWindows((prev) =>
        prev.filter((w) => w !== id)
      );

      setWindowZOrder((prev) =>
        prev.filter((w) => w !== id)
      );

      if (focusedWindow === id) {
        const remaining = windowZOrder.filter(
          (w) => w !== id
        );

        setFocusedWindow(
          remaining[remaining.length - 1] ?? null
        );
      }
    },
    [soundEnabled, focusedWindow, windowZOrder]
  );

  const minimizeApp = useCallback(
    (id: AppId) => {
      setMinimizedWindows((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );

      if (focusedWindow === id) {
        const z = windowZOrder.filter(
          (w) => w !== id
        );

        setFocusedWindow(
          z[z.length - 1] ?? null
        );
      }
    },
    [focusedWindow, windowZOrder]
  );

  const focusApp = useCallback((id: AppId) => {
    setFocusedWindow(id);

    setWindowZOrder((prev) => [
      ...prev.filter((w) => w !== id),
      id,
    ]);
  }, []);

  const toggleMinimize = useCallback(
    (id: AppId) => {
      sound();

      if (minimizedWindows.includes(id)) {
        setMinimizedWindows((prev) =>
          prev.filter((w) => w !== id)
        );

        focusApp(id);
      } else if (focusedWindow === id) {
        minimizeApp(id);
      } else {
        focusApp(id);
      }
    },
    [
      minimizedWindows,
      focusedWindow,
      sound,
      focusApp,
      minimizeApp,
    ]
  );

  const getZIndex = useCallback(
    (id: AppId) => {
      return (
        100 + windowZOrder.indexOf(id) * 10
      );
    },
    [windowZOrder]
  );

  const reboot = () => {
    sound();

    setShowStartMenu(false);
    setShowNotifications(false);

    setOpenWindows([]);
    setFocusedWindow(null);
    setMinimizedWindows([]);
    setWindowZOrder([]);
    setBooted(false);
  };

  // ── Secret Terminal shortcut: Ctrl + ` ──────────────────────────────

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey &&
        e.key === '`'
      ) {
        e.preventDefault();
        e.stopPropagation();

        openApp('terminal');
      }
    };

    window.addEventListener(
      'keydown',
      handleKey,
      true
    );

    return () =>
      window.removeEventListener(
        'keydown',
        handleKey,
        true
      );
  }, [openApp]);

  const filteredApps = APPS.filter(
    (a) =>
      !a.secretApp &&
      (a.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        a.exe
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'about':
        return <AboutApp />;

      case 'terminal':
        return <TerminalApp />;

      case 'projects':
        return <ProjectsApp />;

      case 'skills':
        return <SkillsApp />;

      case 'experience':
        return <ExperienceApp />;

      case 'github':
        return <GithubApp />;

      case 'leetcode':
        return <LeetcodeApp />;

      case 'research':
        return <ResearchApp />;

      case 'contact':
        return <ContactApp />;

      case 'snake':
        return (
          <SnakeApp soundEnabled={soundEnabled} />
        );

      case 'minesweeper':
        return <MinesweeperApp />;

      case 'synth':
        return (
          <SynthApp soundEnabled={soundEnabled} />
        );

      case 'display':
        return (
          <DisplayCfgApp
            currentTheme={themeMode}
            onThemeChange={setThemeMode}
            soundEnabled={soundEnabled}
            onSoundToggle={() =>
              setSoundEnabled((s) => !s)
            }
          />
        );

      case 'notes':
        return <StickyNotesApp />;
    }
  };

  const categoryOrder: AppDef['category'][] = [
    'SYSTEM',
    'APPS',
    'GAMES',
    'TOOLS',
  ];

  const byCategory = categoryOrder.map((cat) => ({
    cat,
    apps: APPS.filter(
      (a) =>
        !a.secretApp &&
        a.category === cat
    ),
  }));

  return (
    <RetroMonitorFrame
      soundEnabled={soundEnabled}
      onOpenTerminal={() =>
        openApp('terminal')
      }
    >
      <div
        className={`crt-bezel theme-${themeMode}`}
      >
        {/* ── BIOS Boot ─────────────────────────────────────────────── */}

        {!booted && (
          <BiosScreen
            onComplete={() =>
              setBooted(true)
            }
          />
        )}

        <div className="crt-bezel-inner">
          <div className="crt-glass crt-flicker">

            {/* ── Desktop ───────────────────────────────────────── */}

            <div
              className="desktop-bg w-full h-full relative"
              style={{
                paddingTop: '10px',
                paddingBottom: '50px',
              }}
              onClick={(e) => {
                const t =
                  e.target as HTMLElement;

                if (
                  !t.closest('.desktop-icon') &&
                  !t.closest('.start-menu') &&
                  !t.closest('.xp-start-menu') &&
                  !t.closest('.start-button')
                ) {
                  setSelectedIcon(null);
                  setShowStartMenu(false);

                  // Close notification popup when clicking
                  // somewhere else on the desktop.
                  setShowNotifications(false);
                }
              }}
            >

              {/* ── Desktop Icon Grid ─────────────────────────── */}

              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(2, 88px)',
                  gap: '12px 6px',
                  zIndex: 10,
                }}
              >
                {APPS.filter(
                  (app) => app.isDesktop
                ).map((app) => (
                  <DesktopIcon
                    key={app.id}
                    app={app}
                    isSelected={
                      selectedIcon === app.id
                    }
                    isOpen={openWindows.includes(
                      app.id
                    )}
                    onSingleClick={() => {
                      sound();
                      setSelectedIcon(app.id);
                    }}
                    onDoubleClick={() =>
                      openApp(app.id)
                    }
                  />
                ))}
              </div>

              {/* ── Spotify Desktop Widget ──────────────── */}

              <SpotifyWidget
                soundEnabled={soundEnabled}
              />

              {/* ── Open Windows ────────────────────────── */}

              <AnimatePresence>
                {openWindows.map((id) => {
                  const app =
                    APPS.find(
                      (a) => a.id === id
                    )!;

                  return (
                    <RetroWindow
                      key={id}
                      id={id}
                      title={app.label}
                      path={app.path}
                      icon={React.cloneElement(
                        app.icon,
                        { size: 14 }
                      )}
                      isFocused={
                        focusedWindow === id
                      }
                      isMinimized={minimizedWindows.includes(
                        id
                      )}
                      zIndex={getZIndex(id)}
                      onFocus={() =>
                        focusApp(id)
                      }
                      onClose={() =>
                        closeApp(id)
                      }
                      onMinimize={() =>
                        minimizeApp(id)
                      }
                      soundEnabled={soundEnabled}
                      onSound={sound}
                      defaultPosition={
                        app.defaultPos
                      }
                      defaultSize={
                        app.defaultSize
                      }
                    >
                      {renderAppContent(id)}
                    </RetroWindow>
                  );
                })}
              </AnimatePresence>

              {/* ── Start Menu ──────────────────────────── */}

              <AnimatePresence>
                {showStartMenu && (
                  <motion.div
                    className="xp-start-menu"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.1,
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '50px',
                      left: '3px',
                      width: '360px',
                      zIndex: 300,
                    }}
                  >

                    {/* WinXP Header */}

                    <div className="xp-start-header">
                      <div className="xp-user-avatar">
                        <IconTerminal size={22} />
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <span className="xp-user-name">
                          ADITYA SINGH
                        </span>

                        <span className="xp-user-subtitle">
                          Administrator · PEGASUS v1.984
                        </span>
                      </div>
                    </div>

                    {/* Main Content */}

                    <div className="xp-start-body-single">

                      <div
                        style={{
                          padding:
                            '6px 8px 6px',
                          borderBottom:
                            '1px solid var(--bevel-mid)',
                          background:
                            '#050c06',
                        }}
                      >
                        <input
                          className="retro-form-input"
                          placeholder="SEARCH ALL APPS..."
                          value={searchQuery}
                          onChange={(e) =>
                            setSearchQuery(
                              e.target.value
                            )
                          }
                          autoFocus
                          style={{
                            fontSize: '10px',
                            width: '100%',
                          }}
                        />
                      </div>

                      <div className="retro-scroll xp-start-single-scroll">

                        {filteredApps.map(
                          (app) => (
                            <div
                              key={app.id}
                              className="xp-start-item"
                              onClick={() => {
                                sound();
                                openApp(
                                  app.id
                                );
                                setShowStartMenu(
                                  false
                                );
                              }}
                            >

                              <span
                                style={{
                                  display:
                                    'flex',
                                  flexShrink: 0,
                                  imageRendering:
                                    'pixelated',
                                }}
                              >
                                {React.cloneElement(
                                  app.icon,
                                  { size: 24 }
                                )}
                              </span>

                              <div
                                style={{
                                  flex: 1,
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    display:
                                      'flex',
                                    alignItems:
                                      'center',
                                    justifyContent:
                                      'space-between',
                                    gap: '4px',
                                  }}
                                >

                                  <span
                                    style={{
                                      fontSize:
                                        '12px',
                                      fontWeight:
                                        'bold',
                                      color:
                                        'var(--phosphor)',
                                      whiteSpace:
                                        'nowrap',
                                      overflow:
                                        'hidden',
                                      textOverflow:
                                        'ellipsis',
                                    }}
                                  >
                                    {app.label}
                                  </span>

                                  <span
                                    style={{
                                      fontSize:
                                        '8px',
                                      padding:
                                        '0 4px',
                                      border:
                                        '1px solid var(--border-dim)',
                                      color:
                                        app.category ===
                                          'GAMES'
                                          ? 'var(--amber)'
                                          : app.category ===
                                            'TOOLS'
                                            ? 'var(--phosphor-hot)'
                                            : 'var(--phosphor-dim)',
                                      background:
                                        'rgba(0,10,2,0.8)',
                                      flexShrink: 0,
                                    }}
                                  >
                                    {
                                      app.category
                                    }
                                  </span>

                                </div>

                                <div
                                  style={{
                                    fontSize:
                                      '9px',
                                    color:
                                      'var(--phosphor-dark)',
                                    letterSpacing:
                                      '0.5px',
                                    whiteSpace:
                                      'nowrap',
                                    overflow:
                                      'hidden',
                                    textOverflow:
                                      'ellipsis',
                                  }}
                                >
                                  {app.path}
                                </div>
                              </div>

                              {openWindows.includes(
                                app.id
                              ) && (
                                  <span
                                    style={{
                                      fontSize:
                                        '8px',
                                      color:
                                        'var(--phosphor-hot)',
                                      fontFamily:
                                        'var(--font-mono)',
                                      flexShrink: 0,
                                      letterSpacing:
                                        '1px',
                                      border:
                                        '1px solid var(--bevel-light)',
                                      padding:
                                        '1px 4px',
                                      borderRadius:
                                        '2px',
                                    }}
                                  >
                                    RUNNING
                                  </span>
                                )}

                            </div>
                          )
                        )}

                      </div>
                    </div>

                    {/* Footer */}

                    <div className="xp-start-footer">

                      <button
                        className="xp-footer-btn"
                        onClick={() => {
                          sound();
                          setSoundEnabled(
                            (v) => !v
                          );
                        }}
                      >
                        <span>
                          ♪ AUDIO:{' '}
                          {soundEnabled
                            ? 'ON'
                            : 'OFF'}
                        </span>
                      </button>

                      <button
                        className="xp-footer-btn xp-btn-reboot"
                        onClick={reboot}
                      >
                        <span>
                          ⟳ REBOOT SYSTEM
                        </span>
                      </button>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Taskbar ─────────────────────────────── */}

              <div
                className="taskbar"
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  left: '3px',
                  right: '3px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0 5px',
                  zIndex: 200,
                }}
              >

                {/* Start button */}

                <button
                  className={`start-button ${showStartMenu
                    ? 'active'
                    : ''
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound();

                    setShowStartMenu(
                      (v) => !v
                    );

                    setShowNotifications(
                      false
                    );
                  }}
                >
                  <IconTerminal size={13} />
                  <span>START</span>
                </button>

                {/* Divider */}

                <div
                  style={{
                    width: '1px',
                    height: '22px',
                    background:
                      'var(--bevel-dark)',
                    borderRight:
                      '1px solid var(--bevel-mid)',
                    flexShrink: 0,
                  }}
                />

                {/* Window tabs */}

                <div
                  style={{
                    display: 'flex',
                    gap: '3px',
                    flex: 1,
                    overflow: 'hidden',
                    alignItems: 'center',
                  }}
                >
                  {openWindows.map((id) => {
                    const app =
                      APPS.find(
                        (a) => a.id === id
                      )!;

                    const isMin =
                      minimizedWindows.includes(
                        id
                      );

                    const isFoc =
                      focusedWindow === id &&
                      !isMin;

                    return (
                      <button
                        key={id}
                        className={`taskbar-btn ${isFoc
                          ? 'active'
                          : ''
                          } ${isMin
                            ? 'minimized'
                            : ''
                          }`}
                        onClick={() =>
                          toggleMinimize(id)
                        }
                        title={app.label}
                      >
                        <span
                          style={{
                            display: 'flex',
                            flexShrink: 0,
                            imageRendering:
                              'pixelated',
                          }}
                        >
                          {React.cloneElement(
                            app.icon,
                            { size: 16 }
                          )}
                        </span>

                        <span>
                          {isMin
                            ? '▾ '
                            : '▸ '}
                          {app.exe}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Divider */}

                <div
                  style={{
                    width: '1px',
                    height: '22px',
                    background:
                      'var(--bevel-dark)',
                    borderRight:
                      '1px solid var(--bevel-mid)',
                    flexShrink: 0,
                  }}
                />

                {/* ── System Tray ───────────────────────── */}

                <div
                  className="system-tray"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    flexShrink: 0,
                  }}
                >

                  {/* WiFi */}

                  <div
                    title="Network connected"
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      cursor: 'default',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--phosphor)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path
                        d="M1.5 8.5C5.5 4.5 10.5 2.5 12 2.5s6.5 2 10.5 6"
                        opacity="0.4"
                      />

                      <path
                        d="M5 12c1.9-1.9 4.2-3 7-3s5.1 1.1 7 3"
                        opacity="0.7"
                      />

                      <path
                        d="M8.5 15.5C9.8 14.2 10.9 13.5 12 13.5s2.2.7 3.5 2"
                      />

                      <circle
                        cx="12"
                        cy="19"
                        r="1.5"
                        fill="var(--phosphor)"
                        stroke="none"
                      />
                    </svg>
                  </div>

                  {/* Speaker */}

                  <button
                    onClick={() => {
                      sound();
                      setSoundEnabled(
                        (v) => !v
                      );
                    }}
                    title={
                      soundEnabled
                        ? 'Mute audio'
                        : 'Enable audio'
                    }
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: soundEnabled
                        ? 'var(--phosphor)'
                        : 'var(--amber)',
                    }}
                  >
                    {soundEnabled ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polygon
                          points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                          fill="currentColor"
                          stroke="none"
                        />

                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />

                        <path
                          d="M19.07 4.93a10 10 0 0 1 0 14.14"
                          opacity="0.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polygon
                          points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                          fill="currentColor"
                          stroke="none"
                        />

                        <line
                          x1="23"
                          y1="9"
                          x2="17"
                          y2="15"
                        />

                        <line
                          x1="17"
                          y1="9"
                          x2="23"
                          y2="15"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Battery */}

                  <div
                    title="Battery charging"
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      cursor: 'default',
                    }}
                  >
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="1.5"
                        width="16"
                        height="11"
                        rx="2"
                        stroke="var(--phosphor)"
                        strokeWidth="1.2"
                        fill="#1a1a1a"
                      />

                      <rect
                        x="17"
                        y="4.5"
                        width="2.5"
                        height="5"
                        rx="1"
                        fill="var(--phosphor)"
                        opacity="0.6"
                      />

                      <rect
                        x="2"
                        y="3"
                        width="12"
                        height="8"
                        rx="1"
                        fill="#22c55e"
                      />

                      <path
                        d="M9.5 3.5L7 7h3l-1.5 3.5L12.5 6.5H9.5z"
                        fill="#ffffff"
                        stroke="none"
                      />
                    </svg>
                  </div>

                  {/* Divider */}

                  <div
                    style={{
                      width: '1px',
                      height: '20px',
                      background:
                        'var(--bevel-mid)',
                      flexShrink: 0,
                      margin: '0 2px',
                    }}
                  />

                  {/* Clock */}

                  <Clock />

                  {/* Divider */}

                  <div
                    style={{
                      width: '1px',
                      height: '20px',
                      background:
                        'var(--bevel-mid)',
                      flexShrink: 0,
                      margin: '0 2px',
                    }}
                  />

                  {/* ═══════════════════════════════════════════════
                      NOTIFICATIONS
                     ═══════════════════════════════════════════════ */}

                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        'center',
                    }}
                  >

                    {/* ── Notification Popup ─────────────────── */}

                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.96,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.96,
                          }}
                          transition={{
                            duration: 0.12,
                          }}
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          style={{
                            position:
                              'absolute',
                            right: '-4px',
                            bottom: '36px',
                            width: '300px',
                            background:
                              '#071008',
                            border:
                              '1px solid var(--phosphor-dim)',
                            boxShadow:
                              '0 0 0 1px #020502, 0 8px 24px rgba(0,0,0,0.7), 0 0 12px rgba(34,197,94,0.12)',
                            zIndex: 9999,
                            fontFamily:
                              'var(--font-mono)',
                          }}
                        >

                          {/* Header */}

                          <div
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'space-between',
                              padding:
                                '7px 9px',
                              background:
                                '#0b160c',
                              borderBottom:
                                '1px solid var(--bevel-mid)',
                            }}
                          >
                            <span
                              style={{
                                color:
                                  'var(--phosphor)',
                                fontSize:
                                  '10px',
                                fontWeight:
                                  'bold',
                                letterSpacing:
                                  '1px',
                                textShadow:
                                  '0 0 6px rgba(74,255,119,0.5)',
                              }}
                            >
                              SYSTEM NOTIFICATIONS
                            </span>

                            <button
                              onClick={() =>
                                setShowNotifications(
                                  false
                                )
                              }
                              style={{
                                background:
                                  'none',
                                border: 'none',
                                color:
                                  'var(--phosphor-dim)',
                                fontFamily:
                                  'var(--font-mono)',
                                fontSize:
                                  '11px',
                                cursor:
                                  'pointer',
                                padding:
                                  '0 2px',
                              }}
                              title="Close notifications"
                            >
                              [X]
                            </button>
                          </div>

                          {/* ── Notification 1 ─────────────────── */}

                          <div
                            style={{
                              padding:
                                '10px',
                              borderBottom:
                                '1px solid rgba(74,255,119,0.12)',
                              display:
                                'flex',
                              gap: '9px',
                            }}
                          >
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                marginTop:
                                  '4px',
                                flexShrink: 0,
                                background:
                                  'var(--phosphor)',
                                boxShadow:
                                  '0 0 6px var(--phosphor)',
                              }}
                            />

                            <div>
                              <div
                                style={{
                                  color:
                                    'var(--phosphor)',
                                  fontSize:
                                    '10px',
                                  fontWeight:
                                    'bold',
                                  marginBottom:
                                    '4px',
                                }}
                              >
                                Instagram
                              </div>

                              <div
                                style={{
                                  color:
                                    'var(--phosphor-dim)',
                                  fontSize:
                                    '9px',
                                  lineHeight:
                                    '1.5',
                                }}
                              >
                                Khushi: YO WAKE TF UP!
                              </div>

                              <div
                                style={{
                                  color:
                                    'var(--phosphor-dark)',
                                  fontSize:
                                    '8px',
                                  marginTop:
                                    '4px',
                                }}
                              >
                                REMINDER · SUNDAY
                              </div>
                            </div>
                          </div>

                          {/* ── Notification 2 ─────────────────── */}

                          <div
                            style={{
                              padding:
                                '10px',
                              display:
                                'flex',
                              gap: '9px',
                            }}
                          >
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                marginTop:
                                  '4px',
                                flexShrink: 0,
                                background:
                                  'var(--phosphor-hot)',
                                boxShadow:
                                  '0 0 6px var(--phosphor-hot)',
                              }}
                            />

                            <div>
                              <div
                                style={{
                                  color:
                                    'var(--phosphor)',
                                  fontSize:
                                    '10px',
                                  fontWeight:
                                    'bold',
                                  marginBottom:
                                    '4px',
                                }}
                              >
                                BIOME REPOSITORY
                              </div>

                              <div
                                style={{
                                  color:
                                    'var(--phosphor-dim)',
                                  fontSize:
                                    '9px',
                                  lineHeight:
                                    '1.5',
                                }}
                              >
                                BIOME repository successfully pushed to GitHub.
                              </div>

                              <div
                                style={{
                                  color:
                                    'var(--phosphor-dark)',
                                  fontSize:
                                    '8px',
                                  marginTop:
                                    '4px',
                                }}
                              >
                                GITHUB · PUSH COMPLETE
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── Notification Button ──────────────────── */}

                    <button
                      title="Notifications"
                      onClick={(e) => {
                        e.stopPropagation();

                        sound();

                        setShowNotifications(
                          (prev) => !prev
                        );
                      }}
                      style={{
                        position:
                          'relative',
                        display: 'flex',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        width: '28px',
                        height: '28px',
                        borderRadius:
                          '4px',
                        cursor:
                          'pointer',
                        color:
                          showNotifications
                            ? 'var(--phosphor)'
                            : 'var(--phosphor-dim)',
                        background:
                          showNotifications
                            ? 'rgba(34,197,94,0.08)'
                            : 'transparent',
                        border: 'none',
                        padding: 0,
                      }}
                    >

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />

                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />

                        {/* Zz */}

                        <line
                          x1="19"
                          y1="3"
                          x2="23"
                          y2="3"
                          stroke="var(--phosphor)"
                          strokeWidth="1.5"
                        />

                        <line
                          x1="23"
                          y1="3"
                          x2="19"
                          y2="7"
                          stroke="var(--phosphor)"
                          strokeWidth="1.5"
                        />

                        <line
                          x1="19"
                          y1="7"
                          x2="23"
                          y2="7"
                          stroke="var(--phosphor)"
                          strokeWidth="1.5"
                        />
                      </svg>

                      {/* Unread indicator */}

                      {!showNotifications && (
                        <span
                          style={{
                            position:
                              'absolute',
                            top: '1px',
                            right: '1px',
                            width: '5px',
                            height: '5px',
                            borderRadius:
                              '50%',
                            background:
                              'var(--phosphor)',
                            boxShadow:
                              '0 0 5px var(--phosphor)',
                          }}
                        />
                      )}

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </RetroMonitorFrame>
  );
};

export default App;
