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

              handleTrackChange(uri);
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
                handleTrackChange(uri);
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
          top: 12,
          right: 12,
          width: 270,
          height: 420,
          zIndex: 50,
          fontFamily:
            'var(--font-mono, "Courier New", monospace)',
          filter:
            'drop-shadow(0 12px 22px rgba(0,0,0,.5))',
          opacity:
            activeVideo ? 0 : 1,
          pointerEvents:
            activeVideo
              ? 'none'
              : 'auto',
        }}
      >

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

            {/* =================================================
                CASSETTE BODY
            ================================================= */}

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

                {/* AWESOME MIX */}

                <div
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily:
                      '"Comic Sans MS","Bradley Hand",cursive',
                    color: '#f0e4b8',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textShadow: '0 1px 1px #000',
                    transform: 'rotate(-1deg)',
                  }}
                >
                  AWESOME MIX
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

                  {/* =================================================
                      LEFT REEL
                  ================================================= */}

                  <div
                    className={
                      isPlaying && !activeVideo
                        ? 'cassette-reel-spinning'
                        : ''
                    }
                    style={{
                      position: 'absolute',
                      left: 7,
                      top: 7,
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle,#ded2a8 0 9%,#44473c 10% 21%,#a89c78 22% 29%,#292c27 30% 48%,#111410 49% 100%)',
                      border:
                        '2px solid #777158',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform:
                          'translate(-50%,-50%)',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: '#d4c69c',
                        border:
                          '2px solid #34362e',
                      }}
                    />
                  </div>

                  {/* =================================================
                      RIGHT REEL
                  ================================================= */}

                  <div
                    className={
                      isPlaying && !activeVideo
                        ? 'cassette-reel-spinning'
                        : ''
                    }
                    style={{
                      position: 'absolute',
                      right: 7,
                      top: 7,
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle,#ded2a8 0 9%,#44473c 10% 21%,#a89c78 22% 29%,#292c27 30% 48%,#111410 49% 100%)',
                      border:
                        '2px solid #777158',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform:
                          'translate(-50%,-50%)',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: '#d4c69c',
                        border:
                          '2px solid #34362e',
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
                      background:
                        'linear-gradient(90deg,#080a08,#303830,#080a08)',
                    }}
                  />

                  {/* CENTER LABEL */}

                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform:
                        'translate(-50%,-50%)',
                      width: 38,
                      height: 17,
                      borderRadius: 2,
                      background:
                        'linear-gradient(180deg,#c2b68b,#8d8464)',
                      border:
                        '1px solid #68624c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 6,
                      fontWeight: 900,
                      letterSpacing: 0.5,
                      color: '#20261f',
                    }}
                  >
                    VOL. 01
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

            {/* =================================================
                CONTROLS
            ================================================= */}

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
                justifyContent: 'center',
                gap: 8,
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

              <div
                className="cassette-btn"
                style={{
                  width: 28,
                  height: 27,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  border:
                    '1px solid #776c4b',
                  background:
                    'linear-gradient(180deg,#dfcea1,#b7a16d)',
                  color: '#344536',
                  fontSize: 8,
                }}
              >
                ◀◀
              </div>

              <button
                className={`cassette-btn ${isPlaying
                  ? 'cassette-play-active'
                  : ''
                  }`}
                onClick={togglePlayback}
                style={{
                  width: 42,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  border:
                    '1px solid #57523e',
                  background:
                    isPlaying
                      ? 'linear-gradient(180deg,#dce7b5,#aebc7a)'
                      : 'linear-gradient(180deg,#f5e8c3,#c7ad77)',
                  color: '#1d2c20',
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                {isPlaying ? 'Ⅱ' : '▶'}
              </button>

              <div
                style={{
                  minWidth: 88,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  color: '#405842',
                  fontSize: 6,
                  fontWeight: 900,
                  letterSpacing: 1.1,
                }}
              >
                <span>
                  AWESOME MIX
                </span>

                <span
                  style={{
                    fontSize: 5,
                    opacity: 0.65,
                  }}
                >
                  CASSETTE PLAYER
                </span>
              </div>

              <div
                style={{
                  width: 25,
                  height: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}
              >
                <IconSpotify size={13} />
              </div>
            </div>

            {/* =================================================
                NOW PLAYING
            ================================================= */}

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
                  <span
                    className={
                      isPlaying
                        ? 'cassette-led'
                        : ''
                    }
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background:
                        isPlaying
                          ? '#4fae63'
                          : '#91876b',
                      display:
                        'inline-block',
                    }}
                  />

                  {isPlaying
                    ? 'NOW PLAYING'
                    : 'PAUSED'}
                </span>

                <span
                  style={{
                    opacity: 0.7,
                  }}
                >
                  AUDIO // A
                </span>
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
                  }}
                >
                  ►
                </span>

                {getTrackLabel()}
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

            {/* =================================================
                PLAYLIST HEADER
            ================================================= */}

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

        {/* =================================================
            COLLAPSE BUTTON
        ================================================= */}

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
      </div>
    </>
  );
};