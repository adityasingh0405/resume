import React, { useEffect, useRef, useState } from 'react';
import { IconSpotify } from './PixelIcons';

interface SpotifyWidgetProps {
  soundEnabled?: boolean;
  onTrackChange?: (trackUri: string) => void;
}

interface SpotifyEvent {
  data: {
    playingURI?: string;
    isPaused?: boolean;
    isBuffering?: boolean;
    duration?: number;
    position?: number;
  };
}

interface SpotifyEmbedController {
  addListener: (
    event: 'ready' | 'playback_started' | 'playback_update',
    callback: (event: SpotifyEvent) => void
  ) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  destroy: () => void;
}

interface SpotifyIframeAPI {
  createController: (
    element: HTMLElement,
    options: {
      width?: string | number;
      height?: string | number;
      uri?: string;
      url?: string;
    },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
}

declare global {
  interface Window {
    SpotifyIframeApi?: SpotifyIframeAPI;
    onSpotifyIframeApiReady?: (api: SpotifyIframeAPI) => void;
  }
}

/* =========================================================
   TRACKS
========================================================= */

interface TrackVideoInfo {
  trackIds: string[];
  videoUrl: string;
  title: string;
}

const TRACK_VIDEOS: TrackVideoInfo[] = [
  {
    trackIds: ['6AFck7IceEDRYCoaPE1eiD', '7D42jUGCSe0BhIco9Pb7TB'],
    videoUrl:
      'https://ik.imagekit.io/hzvbqwpg8/Spider-Man%20Opening%20Swinging%20Scene%20-%20The%20Amazing%20Spider-Man%202%20(2014)%20Movie%20CLIP%20HD%20-%20Trim.mp4',
    title: "I'M SPIDER-MAN",
  },
  {
    trackIds: ['2eWLNSTA7RvUBmnTYVvR8s'],
    videoUrl:
      'https://ik.imagekit.io/j0tnsyzqm/Deadpool%202016%20%20Walking%20Scene%20X%20Gon%20Give%20It%20To%20Ya%20-%20taha%20chadli%20(360p,%20h264)%20-%20Trim.mp4',
    title: "X GON' GIVE IT TO YA",
  },
  {
    trackIds: ['7g8U2TPh6JPFJK5LgqsNeE'],
    videoUrl:
      'https://ik.imagekit.io/j0tnsyzqm/Ending%20scene%20of%20Transformers%201%20-%20Bargo%20(720p,%20h264)%20(online-video-cutter.com).mp4',
    title: 'TRANSFORMERS',
  },
  {
    trackIds: ['5U3i59kbTLrxo46TU1FRnF'],
    videoUrl:
      'https://ik.imagekit.io/hzvbqwpg8/Spider-Man%203%20(2007)%20-%20Cool%20Peter%20Parker%20Scene%20(5_10)%20Movieclips%20-%20Movieclips%20(1080p,%20h264)%20-%20Trim%20(online-video-cutter.com)%20(1).mp4',
    title: 'COOL PETER PARKER',
  },
  {
    trackIds: ['2s1jrAF1uMKOmQxx2LfX0S'],
    videoUrl:
      'https://ik.imagekit.io/j0tnsyzqm/videoplayback%20-%20Trim.mp4',
    title: 'NOW PLAYING VIDEO',
  },
];

const SPOTIFY_PLAYLIST_ID = '6TSWy9pWIG1OKlCrbcVhDI';

const SPOTIFY_PLAYLIST_URI =
  `spotify:playlist:${SPOTIFY_PLAYLIST_ID}`;

/* =========================================================
   OFFICIAL SONY WALKMAN LOGO SVG (Liquid W + Dot + Wordmark)
========================================================= */

const WalkmanOfficialLogoSVG: React.FC<{ width?: number; height?: number; color?: string }> = ({
  width = 72,
  height = 26,
  color = '#1c160c',
}) => (
  <svg viewBox="0 0 290 120" width={width} height={height} fill={color} style={{ display: 'block' }}>
    {/* Upper W-Wave Liquid Logo Mark */}
    <path d="M 28 58 C 16 58 8 68 8 80 C 8 94 18 104 32 104 C 44 104 52 90 58 72 C 64 52 76 38 90 38 C 104 38 114 52 118 70 C 122 88 134 104 150 104 C 166 104 178 88 184 58 C 192 22 214 8 234 8 C 254 8 268 24 268 44 C 268 60 254 74 236 74 C 220 74 210 62 202 42 C 194 24 184 22 176 38 C 168 54 156 82 142 82 C 128 82 120 68 114 50 C 108 32 96 22 84 22 C 70 22 60 36 54 54 C 50 66 42 80 32 80 C 24 80 20 74 20 68 C 20 60 24 58 28 58 Z" />
    <circle cx="254" cy="80" r="25" />

    {/* Custom WALKMAN® Wordmark */}
    <g transform="translate(6, 96)">
      <path d="M 0,20 L 6,0 L 14,0 L 19,14 L 24,0 L 32,0 L 38,20 L 31,20 L 28,8 L 22,20 L 16,20 L 10,8 L 7,20 Z" />
      <path d="M 42,20 L 51,0 L 59,0 L 68,20 L 61,20 L 59,15 L 51,15 L 49,20 Z M 53,10 L 57,10 L 55,4 Z" />
      <path d="M 72,0 L 79,0 L 79,14 L 92,14 L 92,20 L 72,20 Z" />
      <path d="M 96,0 L 103,0 L 103,8 L 112,0 L 121,0 L 111,9 L 122,20 L 113,20 L 103,11 L 103,20 L 96,20 Z" />
      <path d="M 125,0 L 132,0 L 140,13 L 148,0 L 155,0 L 155,20 L 149,20 L 149,7 L 142,18 L 138,18 L 131,7 L 131,20 L 125,20 Z" />
      <path d="M 159,20 L 168,0 L 176,0 L 185,20 L 178,20 L 176,15 L 168,15 L 166,20 Z M 170,10 L 174,10 L 172,4 Z" />
      <path d="M 189,0 L 196,0 L 208,13 L 208,0 L 214,0 L 214,20 L 207,20 L 195,7 L 195,20 L 189,20 Z" />
      {/* ® Symbol */}
      <circle cx="225" cy="5" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <text x="222.5" y="7.5" fontSize="6" fontWeight="bold" fontFamily="sans-serif">R</text>
    </g>
  </svg>
);

/* =========================================================
   LAYOUT
========================================================= */

const SPOTIFY_PLAYER_HEIGHT = 205;

const PLAYLIST_TOP = 278;

const SPOTIFY_PLAYLIST_OFFSET =
  PLAYLIST_TOP - SPOTIFY_PLAYER_HEIGHT;

/* =========================================================
   COMPONENT
========================================================= */

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({
  onTrackChange,
}) => {
  const [currentTrack, setCurrentTrack] =
    useState<string | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [position, setPosition] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [activeVideo, setActiveVideo] =
    useState<TrackVideoInfo | null>(null);

  const [cassetteCollapsed, setCassetteCollapsed] =
    useState(false);

  const [isWidgetMinimized, setIsWidgetMinimized] =
    useState(false);

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setActiveVideo(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spotifyContainerRef =
    useRef<HTMLDivElement>(null);

  const controllerRef =
    useRef<SpotifyEmbedController | null>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const currentTrackRef =
    useRef<string | null>(null);

  const initializedRef =
    useRef(false);

  // Always holds the latest handleTrackChange so Spotify listeners
  // never call a stale closure.
  const handleTrackChangeRef =
    useRef<(uri: string) => void>(() => { });

  /* =======================================================
     TRACK HELPERS
  ======================================================= */

  const getTrackVideo = (
    uri: string
  ): TrackVideoInfo | null => {
    if (!uri) return null;
    const lowerUri = uri.toLowerCase();
    return (
      TRACK_VIDEOS.find((item) =>
        item.trackIds.some((id) => lowerUri.includes(id.toLowerCase()))
      ) || null
    );
  };

  const getTrackLabel = (): string => {
    if (activeVideo) {
      return activeVideo.title;
    }

    if (!currentTrack) {
      return 'NO TRACK DETECTED';
    }

    return currentTrack
      .replace('spotify:track:', '')
      .split('?')[0]
      .slice(0, 24)
      .toUpperCase();
  };

  const handleTrackChange = (
    trackUri: string
  ): void => {
    currentTrackRef.current = trackUri;

    setCurrentTrack(trackUri);

    onTrackChange?.(trackUri);

    const trackVideo = getTrackVideo(trackUri);

    if (trackVideo) {
      try {
        controllerRef.current?.pause();
      } catch {
        // Ignore controller errors.
      }

      setIsPlaying(false);
      setActiveVideo(trackVideo);

      return;
    }

    setActiveVideo(null);
  };

  // Keep the ref in sync with the latest function on every render.
  handleTrackChangeRef.current = handleTrackChange;

  /* =======================================================
     TRACK VIDEO PLAYBACK
  ======================================================= */

  useEffect(() => {
    if (!activeVideo) return;

    const timer = setTimeout(() => {
      const video = videoRef.current;

      if (!video) return;

      try {
        controllerRef.current?.pause();
      } catch {
        // Ignore controller errors.
      }

      video.muted = false;
      video.volume = 1;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay with sound blocked, retrying muted:', err);
          video.muted = true;
          video.play().catch(() => { });
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeVideo]);

  const closeVideo = (): void => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    setActiveVideo(null);
    setIsPlaying(false);

    try {
      controllerRef.current?.pause();
    } catch {
      // Ignore controller errors.
    }
  };

  /* =======================================================
     SPOTIFY INITIALIZATION
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const createSpotifyController = (
      api: SpotifyIframeAPI
    ): void => {
      if (cancelled || initializedRef.current) {
        return;
      }

      const container =
        spotifyContainerRef.current;

      if (!container) return;

      initializedRef.current = true;

      api.createController(
        container,
        {
          width: '100%',
          height: 420,
          uri: SPOTIFY_PLAYLIST_URI,
        },
        (controller) => {
          if (cancelled) return;

          controllerRef.current = controller;

          controller.addListener(
            'ready',
            () => {
              console.log('Spotify Embed READY');
            }
          );

          /* =============================================
             PLAYBACK STARTED
          ============================================= */

          controller.addListener(
            'playback_started',
            (event) => {
              const uri =
                event?.data?.playingURI;

              if (!uri) return;

              /*
               * Spotify has confirmed playback.
               * This is the source of truth for the
               * cassette reel animation.
               */
              setIsPlaying(true);

              // Use the ref so we always call the latest version
              // of handleTrackChange, avoiding stale closures.
              handleTrackChangeRef.current(uri);
            }
          );

          /* =============================================
             PLAYBACK UPDATE
          ============================================= */

          controller.addListener(
            'playback_update',
            (event) => {
              const uri =
                event?.data?.playingURI;

              if (
                uri &&
                uri !== currentTrackRef.current
              ) {
                // Use the ref so we always call the latest version
                // of handleTrackChange, avoiding stale closures.
                handleTrackChangeRef.current(uri);
              }

              /*
               * IMPORTANT:
               * Always use Spotify's actual playback
               * state instead of manually toggling it.
               */

              if (
                typeof event?.data?.isPaused ===
                'boolean'
              ) {
                setIsPlaying(
                  !event.data.isPaused
                );
              }

              if (
                typeof event?.data?.position ===
                'number'
              ) {
                setPosition(
                  event.data.position
                );
              }

              if (
                typeof event?.data?.duration ===
                'number'
              ) {
                setDuration(
                  event.data.duration
                );
              }
            }
          );
        }
      );
    };

    if (window.SpotifyIframeApi) {
      createSpotifyController(
        window.SpotifyIframeApi
      );

      return () => {
        cancelled = true;
      };
    }

    window.onSpotifyIframeApiReady = (
      api
    ) => {
      window.SpotifyIframeApi = api;

      createSpotifyController(api);
    };

    const existingScript =
      document.querySelector(
        'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
      );

    if (existingScript) {
      return () => {
        cancelled = true;
      };
    }

    const script =
      document.createElement('script');

    script.src =
      'https://open.spotify.com/embed/iframe-api/v1';

    script.async = true;

    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     PLAYBACK
  ======================================================= */

  const togglePlayback = (): void => {
    const controller =
      controllerRef.current;

    if (!controller) return;

    try {
      /*
       * DO NOT manually update isPlaying here.
       *
       * Spotify's playback_update event will tell us
       * whether playback actually started or paused.
       */
      controller.togglePlay();
    } catch (error) {
      console.error(
        'Spotify playback error:',
        error
      );
    }
  };

  const handleRewind = (): void => {
    const targetPosMs = Math.max(0, position - 10000);
    setPosition(targetPosMs);
    const controller = controllerRef.current as any;
    if (controller && typeof controller.seek === 'function') {
      try {
        controller.seek(Math.floor(targetPosMs / 1000));
      } catch (err) { }
    }
  };

  const handleFastForward = (): void => {
    const targetPosMs = duration > 0 ? Math.min(duration, position + 10000) : position + 10000;
    setPosition(targetPosMs);
    const controller = controllerRef.current as any;
    if (controller && typeof controller.seek === 'function') {
      try {
        controller.seek(Math.floor(targetPosMs / 1000));
      } catch (err) { }
    }
  };

  const handleStop = (): void => {
    const controller = controllerRef.current;
    if (controller) {
      try {
        controller.pause();
      } catch (err) { }
    }
    setIsPlaying(false);
    setPosition(0);
  };

  /* =======================================================
     TIME
  ======================================================= */

  const formatTime = (
    milliseconds: number
  ): string => {
    if (!milliseconds) return '0:00';

    const seconds =
      Math.floor(milliseconds / 1000);

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const progress =
    duration > 0
      ? Math.min(
        100,
        (position / duration) * 100
      )
      : 0;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <style>{`

        /* =============================================
           CASSETTE REEL
        ============================================= */

        @keyframes reelSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /*
         * Faster, smoother cassette reel animation.
         */
        .cassette-reel-spinning {
          animation:
            reelSpin 1.8s linear infinite;

          transform-origin:
            center center;

          will-change:
            transform;
        }

        /* =============================================
           LED
        ============================================= */

        @keyframes ledPulse {
          0%,
          100% {
            opacity: 1;
            box-shadow:
              0 0 7px rgba(79,174,99,.9);
          }

          50% {
            opacity: .45;
            box-shadow:
              0 0 2px rgba(79,174,99,.25);
          }
        }

        .cassette-led {
          animation:
            ledPulse 1.6s ease-in-out infinite;
        }

        /* =============================================
           PLAY BUTTON
        ============================================= */

        @keyframes playGlow {
          0%,
          100% {
            box-shadow:
              0 3px 5px rgba(0,0,0,.35),
              inset 0 1px rgba(255,255,255,.7);
          }

          50% {
            box-shadow:
              0 3px 12px rgba(79,174,99,.25),
              inset 0 1px rgba(255,255,255,.8);
          }
        }

        .cassette-btn {
          transition:
            transform 120ms ease,
            filter 120ms ease,
            box-shadow 120ms ease;
        }

        .cassette-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        .cassette-btn:active {
          transform:
            translateY(1px) scale(.96);
          filter: brightness(.92);
        }

        .cassette-play-active {
          animation:
            playGlow 1.8s ease-in-out infinite;
        }

        /* =============================================
           WAVEFORM EQUALIZER
        ============================================= */

        @keyframes eqBar1 {
          0%, 100% { height: 4px; }
          25% { height: 14px; }
          50% { height: 8px; }
          75% { height: 12px; }
        }
        @keyframes eqBar2 {
          0%, 100% { height: 10px; }
          30% { height: 4px; }
          60% { height: 14px; }
          80% { height: 6px; }
        }
        @keyframes eqBar3 {
          0%, 100% { height: 7px; }
          20% { height: 14px; }
          55% { height: 4px; }
          75% { height: 11px; }
        }
        @keyframes eqBar4 {
          0%, 100% { height: 12px; }
          35% { height: 5px; }
          65% { height: 13px; }
          85% { height: 7px; }
        }
        @keyframes eqBar5 {
          0%, 100% { height: 5px; }
          40% { height: 13px; }
          70% { height: 7px; }
          90% { height: 14px; }
        }

        .eq-bar-1 { animation: eqBar1 0.9s ease-in-out infinite; }
        .eq-bar-2 { animation: eqBar2 0.75s ease-in-out infinite; }
        .eq-bar-3 { animation: eqBar3 1.1s ease-in-out infinite; }
        .eq-bar-4 { animation: eqBar4 0.85s ease-in-out infinite; }
        .eq-bar-5 { animation: eqBar5 1.0s ease-in-out infinite; }

        /* =============================================
           MARQUEE SCROLL
        ============================================= */

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          15% { transform: translateX(0); }
          85% { transform: translateX(-100%); }
          100% { transform: translateX(-100%); }
        }

        .track-marquee-inner {
          display: inline-block;
          animation: marqueeScroll 8s linear infinite;
          white-space: nowrap;
          padding-right: 32px;
        }

        .track-marquee-inner.paused {
          animation-play-state: paused;
        }

      `}</style>

      {/* =================================================
          TRACK VIDEO OVERLAY
      ================================================= */}

      {activeVideo && (
        <div
          className="spotify-video-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: '#000',
            zIndex: 999999,
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src={activeVideo.videoUrl}
            autoPlay
            playsInline
            onEnded={closeVideo}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          <button
            onClick={closeVideo}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 30,
              height: 30,
              borderRadius: '50%',
              border:
                '1px solid rgba(255,255,255,.4)',
              background:
                'rgba(0,0,0,.7)',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* =================================================
          MAIN PLAYER
      ================================================= */}

      <div
        className="spotify-widget-container"
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 270,
          height: isWidgetMinimized ? 38 : 420,
          zIndex: 50,
          fontFamily: 'var(--font-mono, "Courier New", monospace)',
          filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.75))',
          opacity: activeVideo ? 0 : 1,
          pointerEvents: activeVideo ? 'none' : 'auto',
          transition: 'height 220ms cubic-bezier(0.16, 1, 0.3, 1)',
          ...(isWidgetMinimized
            ? {
              background: 'linear-gradient(180deg, #142217 0%, #09120b 100%)',
              border: '1px solid var(--bevel-light, #3e8a46)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
            }
            : {}),
        }}
      >
        {isWidgetMinimized ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px',
              color: 'var(--phosphor)',
            }}
          >
            {/* Keep spotifyContainerRef mounted invisibly so audio player controller persists */}
            <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1, overflow: 'hidden' }}>
              <div ref={spotifyContainerRef} />
            </div>

            {/* LED & Track snippet */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <IconSpotify size={14} />
                <span
                  className={isPlaying ? 'cassette-led' : ''}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isPlaying ? '#1db954' : '#576559',
                    flexShrink: 0,
                    boxShadow: isPlaying ? '0 0 6px #1db954' : 'none',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#d4dfad',
                  letterSpacing: '0.5px',
                }}
              >
                {getTrackLabel()}
              </span>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <button
                type="button"
                className="cassette-btn"
                onClick={togglePlayback}
                title={isPlaying ? 'Pause' : 'Play'}
                style={{
                  width: 26,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  border: '1px solid #3e8a46',
                  background: isPlaying
                    ? 'linear-gradient(180deg,#22c55e,#15803d)'
                    : 'linear-gradient(180deg,#1c3822,#0d2012)',
                  color: '#ffffff',
                  fontSize: 10,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                {isPlaying ? 'Ⅱ' : '▶'}
              </button>

              <button
                type="button"
                className="cassette-btn"
                onClick={() => setIsWidgetMinimized(false)}
                title="Expand Spotify Player"
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  border: '1px solid #4a584a',
                  background: 'linear-gradient(180deg,#243828,#122016)',
                  color: '#a3c4a7',
                  fontSize: 9,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ▲
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                SPOTIFY LAYER
            ================================================= */}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: 420,
                overflow: 'hidden',
                background: '#07100b',
                borderRadius: 8,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top:
                    cassetteCollapsed
                      ? 0
                      : SPOTIFY_PLAYLIST_OFFSET,
                  left: 0,
                  width: '100%',
                  height: 420,
                  transition:
                    'top 220ms ease',
                }}
              >
                <div
                  ref={spotifyContainerRef}
                  style={{
                    width: '100%',
                    height: 420,
                    filter:
                      'grayscale(1) contrast(1.1) brightness(1.05)',
                  }}
                />
              </div>
            </div>

            {/* =================================================
                CASSETTE OVERLAY
            ================================================= */}

            {!cassetteCollapsed && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: PLAYLIST_TOP,
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                {/* CASSETTE BODY */}

                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 130,
                    borderRadius: '8px 8px 0 0',
                    background:
                      'linear-gradient(145deg,#f3e8c8 0%,#decda5 42%,#b6a474 100%)',
                    border:
                      '2px solid #625b44',
                    borderBottom: 'none',
                    boxShadow:
                      'inset 0 2px 1px rgba(255,255,255,.85), inset 0 -8px 16px rgba(0,0,0,.24)',
                    overflow: 'hidden',
                  }}
                >
                  {/* SCREW DETAILS */}

                  {[
                    { top: 5, left: 6 },
                    { top: 5, right: 6 },
                    { bottom: 5, left: 6 },
                    { bottom: 5, right: 6 },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        ...pos,
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle at 35% 35%,#a69b78,#4d4736)',
                        boxShadow:
                          'inset 0 0 1px rgba(0,0,0,.7)',
                      }}
                    />
                  ))}

                  {/* INNER CASSETTE */}

                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 11,
                      right: 11,
                      bottom: 10,
                      borderRadius: 5,
                      background:
                        'linear-gradient(180deg,#28412f,#0b1710)',
                      border:
                        '1px solid #557157',
                      boxShadow:
                        'inset 0 0 20px rgba(0,0,0,.9)',
                      overflow: 'hidden',
                    }}
                  >
                    {/* REALISTIC STUCK PAPER MASKING TAPE */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 2,
                        left: '50%',
                        transform: 'translateX(-50%) rotate(-1.5deg)',
                        width: '150px',
                        height: '22px',
                        zIndex: 10,
                        filter: 'drop-shadow(1px 3px 3px rgba(0,0,0,0.35))',
                      }}
                    >
                      {/* Tape body — soft irregular edges via clip-path, translucent + fibrous */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: '#f2e9d3',
                          opacity: 0.88,
                          mixBlendMode: 'multiply',
                          clipPath:
                            'polygon(0% 8%, 8% 3%, 18% 9%, 30% 2%, 44% 8%, 58% 3%, 72% 9%, 86% 2%, 100% 7%, 100% 93%, 88% 97%, 74% 92%, 60% 98%, 46% 92%, 32% 98%, 20% 91%, 10% 97%, 0% 92%)',
                          backgroundImage: `
        linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.55) 40%, rgba(0,0,0,0.04) 100%),
        repeating-linear-gradient(90deg, rgba(160,140,80,0.05) 0px, rgba(160,140,80,0.05) 1.5px, transparent 1.5px, transparent 3.5px),
        repeating-linear-gradient(3deg, rgba(0,0,0,0.015) 0px, transparent 1px, transparent 3px)
      `,
                          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.12)',
                        }}
                      />

                      {/* Peeling corner highlight — bottom-right lifts slightly like real tape */}
                      <div
                        style={{
                          position: 'absolute',
                          right: '-1px',
                          bottom: '-1px',
                          width: '14px',
                          height: '10px',
                          background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.6) 55%, rgba(0,0,0,0.08) 100%)',
                          clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Handwritten text, per-word jitter for an organic, non-uniform look */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          fontFamily: '"Caveat", "Kalam", "Patrick Hand", "Segoe Print", cursive',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#212a3a',
                        }}
                      >
                        <span style={{ transform: 'rotate(-3deg) translateY(0.5px)', textShadow: '0.3px 0.3px 0 rgba(30,40,60,0.25)' }}>
                          Awesome
                        </span>
                        <span style={{ transform: 'rotate(1.5deg) translateY(-0.5px)', textShadow: '0.3px 0.3px 0 rgba(30,40,60,0.25)' }}>
                          Mix
                        </span>
                        <span style={{ transform: 'rotate(-1deg)', textShadow: '0.3px 0.3px 0 rgba(30,40,60,0.25)' }}>
                          VOL.1
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 22,
                        left: 20,
                        right: 20,
                        height: 1,
                        background:
                          'rgba(190,210,155,.28)',
                      }}
                    />

                    {/* REEL AREA */}

                    <div
                      style={{
                        position: 'absolute',
                        top: 30,
                        left: 13,
                        right: 13,
                        bottom: 9,
                        borderRadius: 5,
                        background:
                          'linear-gradient(180deg,#171c18,#070a08)',
                        border:
                          '1px solid #536050',
                        boxShadow:
                          'inset 0 2px 10px rgba(0,0,0,.9)',
                        overflow: 'hidden',
                      }}
                    >
                      {/* LEFT REEL */}
                      {/* LEFT REEL */}
                      <div
                        className={isPlaying && !activeVideo ? 'cassette-reel-spinning' : ''}
                        style={{
                          position: 'absolute',
                          left: 7,
                          top: 7,
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background:
                            'radial-gradient(circle,#ded2a8 0 9%,#44473c 10% 21%,#a89c78 22% 29%,#292c27 30% 48%,#111410 49% 100%)',
                          border: '2px solid #777158',
                          boxShadow:
                            'inset 0 0 5px rgba(0,0,0,0.65), inset 2px 2px 3px rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.4)',
                        }}
                      >
                        {/* Toothed cog ring — the asymmetric detail that actually makes rotation visible */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: '27%',
                            borderRadius: '50%',
                            background:
                              'repeating-conic-gradient(rgba(15,17,13,0.95) 0deg 7deg, rgba(168,156,120,0.5) 7deg 14deg, rgba(15,17,13,0.95) 14deg 21deg, rgba(60,58,44,0.3) 21deg 28deg)',
                            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
                          }}
                        />

                        {/* Sprocket holes arranged around the hub */}
                        {[0, 60, 120, 180, 240, 300].map((angle) => (
                          <div
                            key={angle}
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              width: 3,
                              height: 3,
                              borderRadius: '50%',
                              background: '#0a0c08',
                              boxShadow: 'inset 0 0 1px rgba(255,255,255,0.15)',
                              transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(-11px)`,
                            }}
                          />
                        ))}

                        {/* Gloss highlight sweep for a slight 3D sheen */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background:
                              'conic-gradient(from -40deg, rgba(255,255,255,0.14) 0deg 18deg, transparent 40deg 320deg, rgba(255,255,255,0.08) 342deg 360deg)',
                            pointerEvents: 'none',
                          }}
                        />

                        {/* Center hub cap */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: '#d4c69c',
                            border: '2px solid #34362e',
                          }}
                        />
                      </div>

                      {/* RIGHT REEL */}
                      <div
                        className={isPlaying && !activeVideo ? 'cassette-reel-spinning' : ''}
                        style={{
                          position: 'absolute',
                          right: 7,
                          top: 7,
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background:
                            'radial-gradient(circle,#ded2a8 0 9%,#44473c 10% 21%,#a89c78 22% 29%,#292c27 30% 48%,#111410 49% 100%)',
                          border: '2px solid #777158',
                          boxShadow:
                            'inset 0 0 5px rgba(0,0,0,0.65), inset 2px 2px 3px rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.4)',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: '27%',
                            borderRadius: '50%',
                            background:
                              'repeating-conic-gradient(rgba(15,17,13,0.95) 0deg 7deg, rgba(168,156,120,0.5) 7deg 14deg, rgba(15,17,13,0.95) 14deg 21deg, rgba(60,58,44,0.3) 21deg 28deg)',
                            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
                          }}
                        />

                        {[0, 60, 120, 180, 240, 300].map((angle) => (
                          <div
                            key={angle}
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              width: 3,
                              height: 3,
                              borderRadius: '50%',
                              background: '#0a0c08',
                              boxShadow: 'inset 0 0 1px rgba(255,255,255,0.15)',
                              transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(-11px)`,
                            }}
                          />
                        ))}

                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background:
                              'conic-gradient(from -40deg, rgba(255,255,255,0.14) 0deg 18deg, transparent 40deg 320deg, rgba(255,255,255,0.08) 342deg 360deg)',
                            pointerEvents: 'none',
                          }}
                        />

                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: '#d4c69c',
                            border: '2px solid #34362e',
                          }}
                        />
                      </div>

                      {/* TAPE */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 50,
                          right: 50,
                          top: 27,
                          height: 3,
                          borderRadius: 2,
                          background: 'linear-gradient(90deg,#080a08,#303830,#080a08)',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
                        }}
                      />

                      {/* CENTER LABEL — SONY EMBOSSED METALLIC BADGE */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%,-50%)',
                          width: 60,
                          height: 26,
                          borderRadius: 3,
                          background:
                            'linear-gradient(180deg,#e8dfc3 0%,#b8ac84 50%,#8c825b 100%)',
                          border: '1px solid #524b38',
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src="/sony.png"
                          alt="SONY"
                          style={{
                            width: '112px',
                            height: '48px',
                            objectFit: 'contain',
                            display: 'block',
                            userSelect: 'none',
                            pointerEvents: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* BOTTOM LABEL */}

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 3,
                        left: 7,
                        right: 7,
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        color: '#89a88c',
                        fontSize: 6,
                        fontWeight: 700,
                      }}
                    >
                      <span>★</span>
                      <span>60</span>
                    </div>
                  </div>
                </div>

                {/* CONTROLS — REAL WALKMAN HARDWARE DECK */}

                <div
                  className="cassette-controls-section"
                  style={{
                    position: 'absolute',
                    top: 129,
                    left: 0,
                    right: 0,
                    height: 54,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '0 12px',
                    background:
                      'linear-gradient(180deg,#ebdfbd 0%,#d4c194 55%,#bda97a 100%)',
                    borderLeft:
                      '2px solid #625b44',
                    borderRight:
                      '2px solid #625b44',
                    borderBottom:
                      '1px solid #756c52',
                    boxShadow:
                      'inset 0 2px rgba(255,255,255,.5), inset 0 -3px rgba(0,0,0,.08)',
                    zIndex: 2,
                  }}
                >
                  {/* PLAY / PAUSE button (left-aligned tactile 3D key) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                    <button
                      type="button"
                      className={`cassette-btn ${isPlaying ? 'cassette-play-active' : ''}`}
                      onClick={togglePlayback}
                      style={{
                        width: 44,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        border: '1px solid #4a5438',
                        background: isPlaying
                          ? 'linear-gradient(180deg,#cce2a4,#8eb364)'
                          : 'linear-gradient(180deg,#f3e5be,#c2aa72)',
                        color: '#1d2c20',
                        fontSize: 13,
                        fontWeight: 900,
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        boxShadow: isPlaying
                          ? '0 0 8px rgba(79,174,99,0.5), inset 0 1px 0 rgba(255,255,255,0.8)'
                          : '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.7)',
                      }}
                      title={isPlaying ? 'Pause (Ⅱ)' : 'Play (▶)'}
                    >
                      {isPlaying ? 'Ⅱ' : '▶'}
                    </button>
                    <span style={{ fontSize: 5.5, fontWeight: 900, color: isPlaying ? '#294f26' : '#574e35', letterSpacing: 0.5 }}>
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </span>
                  </div>

                  {/* SPOTIFY ACCOUNT / PLAYLIST BUTTON (aligned perfectly in between, no text underneath) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <a
                      href={`https://open.spotify.com/playlist/${SPOTIFY_PLAYLIST_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cassette-btn"
                      style={{
                        width: '100%',
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        padding: '0 8px',
                        borderRadius: 5,
                        border: '1px solid #148037',
                        background: 'linear-gradient(180deg, #1db954 0%, #15803d 100%)',
                        color: '#ffffff',
                        fontSize: 9.5,
                        fontWeight: 900,
                        letterSpacing: '0.6px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
                        boxSizing: 'border-box',
                      }}
                      title="Open Spotify Account / Playlist"
                    >
                      <IconSpotify size={15} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>SPOTIFY</span>
                    </a>
                    {/* Spacer to match Play/Pause column height for exact alignment */}
                    <div style={{ height: 9 }} />
                  </div>

                  {/* Official Walkman metallic logo badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 6px',
                      background: 'linear-gradient(180deg,#e8dfc3 0%,#baaf86 50%,#90845c 100%)',
                      border: '1px solid #574c35',
                      borderRadius: 4,
                      boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.7), 
                        inset 0 -1px 1px rgba(0,0,0,0.3), 
                        0 1px 3px rgba(0,0,0,0.35)
                      `,
                      userSelect: 'none',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                    title="Sony WALKMAN"
                  >
                    <img
                      src="/walkman.png"
                      alt="Sony WALKMAN"
                      style={{
                        width: 66,
                        height: 28,
                        objectFit: 'contain',
                        display: 'block',
                        mixBlendMode: 'multiply',
                      }}
                    />
                  </div>
                </div>

                {/* NOW PLAYING */}

                <div
                  className="cassette-now-playing-container"
                  style={{
                    position: 'absolute',
                    top: 182,
                    left: 0,
                    right: 0,
                    height: 75,
                    padding: '7px 9px',
                    background:
                      'linear-gradient(180deg,#e8dcb9 0%,#d4c49b 100%)',
                    borderLeft:
                      '2px solid #625b44',
                    borderRight:
                      '2px solid #625b44',
                    borderBottom:
                      '1px solid #756c52',
                    boxShadow:
                      'inset 0 1px rgba(255,255,255,.65), inset 0 -3px rgba(0,0,0,.06)',
                    color: '#243426',
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'center',
                      fontSize: 6,
                      fontWeight: 900,
                      letterSpacing: 1.2,
                      color: '#536c56',
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      {/* Waveform equalizer bars */}
                      <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 1.5, height: 14, marginRight: 2 }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={isPlaying && !activeVideo ? `eq-bar-${n}` : ''}
                            style={{
                              display: 'inline-block',
                              width: 2,
                              height: isPlaying && !activeVideo ? undefined : 4,
                              background: isPlaying ? '#4fae63' : '#91876b',
                              borderRadius: 1,
                              transition: 'background 0.3s ease',
                              flexShrink: 0,
                            }}
                          />
                        ))}
                      </span>

                      {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
                    </span>

                    <span style={{ opacity: 0.7 }}>AUDIO // A</span>
                  </div>

                  {/* TRACK */}

                  <div
                    style={{
                      height: 19,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 6px',
                      background: '#121a14',
                      border:
                        '1px solid #4b5949',
                      color: '#d4dfad',
                      fontFamily:
                        '"Courier New",monospace',
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: 0.7,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      boxShadow:
                        'inset 0 0 8px rgba(0,0,0,.75)',
                    }}
                  >
                    <span
                      style={{
                        marginRight: 5,
                        opacity: 0.55,
                        fontSize: 7,
                        flexShrink: 0,
                      }}
                    >
                      ►
                    </span>

                    {/* Marquee scrolling track name */}
                    <span
                      style={{
                        flex: 1,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <span
                        className={`track-marquee-inner${!isPlaying ? ' paused' : ''}`}
                      >
                        {getTrackLabel()}
                      </span>
                    </span>
                  </div>

                  {/* PROGRESS */}

                  <div
                    className="cassette-timeline-section"
                    style={{
                      position: 'relative',
                      marginTop: 6,
                      height: 5,
                      background: '#9e9679',
                      borderRadius: 4,
                      overflow: 'visible',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: `${progress}%`,
                        height: '100%',
                        minWidth:
                          progress > 0 ? 3 : 0,
                        background:
                          'linear-gradient(90deg,#405f45,#6f9b68)',
                        borderRadius: 4,
                        transition:
                          'width .15s linear',
                      }}
                    >
                      {progress > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            right: -2,
                            top: '50%',
                            transform:
                              'translateY(-50%)',
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background:
                              '#dce4b9',
                            border:
                              '1px solid #506b50',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className="cassette-timeline-section"
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      marginTop: 4,
                      fontSize: 6,
                      fontWeight: 700,
                      color: '#68705f',
                    }}
                  >
                    <span>
                      {formatTime(position)}
                    </span>

                    <span>
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* PLAYLIST HEADER */}

                <div
                  style={{
                    position: 'absolute',
                    top: 256,
                    left: 0,
                    right: 0,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'space-between',
                    padding: '0 8px',
                    background:
                      'linear-gradient(180deg,#171b16,#0c0f0d)',
                    color: '#9cac9d',
                    fontSize: 6.5,
                    fontWeight: 700,
                    letterSpacing: 1,
                    border:
                      '1px solid #3c443c',
                    zIndex: 4,
                  }}
                >
                  <span>
                    MIX_TAPE.PLS
                  </span>

                  <span
                    style={{
                      opacity: 0.6,
                      fontSize: 6,
                    }}
                  >
                    ↑ ↓ SCROLL
                  </span>
                </div>
              </div>
            )}

            {/* COLLAPSE BUTTON */}

            <button
              type="button"
              className="cassette-btn"
              onClick={() =>
                setCassetteCollapsed(
                  (previous) => !previous
                )
              }
              aria-label={
                cassetteCollapsed
                  ? 'Expand cassette player'
                  : 'Collapse cassette player'
              }
              title={
                cassetteCollapsed
                  ? 'Show cassette'
                  : 'Hide cassette'
              }
              style={{
                position: 'absolute',
                top: 5,
                left: 5,
                width: 21,
                height: 21,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                border:
                  '1px solid #726844',
                background:
                  'linear-gradient(180deg,#f0dfb2,#bfa978)',
                color: '#263a2b',
                fontSize: 9,
                fontWeight: 900,
                cursor: 'pointer',
                zIndex: 1000,
                boxShadow:
                  '0 2px 3px rgba(0,0,0,.45)',
              }}
            >
              {cassetteCollapsed
                ? '▲'
                : '▼'}
            </button>

            {/* MINIMIZE BUTTON */}

            <button
              type="button"
              className="cassette-btn"
              onClick={() => setIsWidgetMinimized(true)}
              aria-label="Minimize widget"
              title="Minimize widget"
              style={{
                position: 'absolute',
                top: 5,
                left: 30,
                width: 21,
                height: 21,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                border:
                  '1px solid #726844',
                background:
                  'linear-gradient(180deg,#f0dfb2,#bfa978)',
                color: '#263a2b',
                fontSize: 9,
                fontWeight: 900,
                cursor: 'pointer',
                zIndex: 1000,
                boxShadow:
                  '0 2px 3px rgba(0,0,0,.45)',
              }}
            >
              🗕
            </button>
          </>
        )}
      </div>
    </>
  );
};