import React, { useState } from 'react';
import { IconSpotify } from './PixelIcons';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SpotifyWidgetProps {
  soundEnabled?: boolean;
}

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="spotify-widget-container"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '310px',
        zIndex: 5,
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.9), 0 0 12px rgba(29,185,84,0.2)',
        border: '1px solid rgba(29,185,84,0.6)',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      {/* Retro Titlebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 8px',
          background: 'linear-gradient(90deg, #16a34a 0%, #0f6b32 100%)',
          color: '#000',
          fontSize: '10px',
          fontWeight: 'bold',
          letterSpacing: '1.5px',
          userSelect: 'none',
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(c => !c)}
        title={isCollapsed ? 'Expand' : 'Collapse'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <IconSpotify size={16} />
          <span>SPOTIFY_PLAYER.EXE</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.25)',
          border: '1px solid rgba(0,0,0,0.35)',
          borderRadius: '2px',
          padding: '1px 4px',
        }}>
          {isCollapsed ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
        </div>
      </div>

      {/* Spotify IFrame Body */}
      {!isCollapsed && (
        <div style={{ padding: '4px', background: '#090c10' }}>
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '10px', border: 'none', display: 'block' }}
            width="100%"
            src="https://open.spotify.com/embed/playlist/6TSWy9pWIG1OKlCrbcVhDI?utm_source=generator&theme=0&si=4d9632aa7f674987"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};
