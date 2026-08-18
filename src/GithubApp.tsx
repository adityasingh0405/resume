import React, { useEffect, useMemo, useState } from 'react';
import { FaGithub as GithubIcon } from 'react-icons/fa';
import {
  GitFork,
  Star,
  GitCommit,
  ExternalLink,
  Code2,
  Users,
  BookOpen,
  Activity,
  RefreshCw,
  Circle,
  Eye,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  visibility?: string;
  default_branch?: string;
}

interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface ContributionDay {
  date: string;
  count: number;
}

/* =========================================================
   CONSTANTS
========================================================= */

const GITHUB_USERNAME = 'adityasingh0405';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Solidity: '#AA6746',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
};

/* =========================================================
   HELPERS
========================================================= */

function formatDate(date: string) {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return 'JUST NOW';
  if (minutes < 60) return `${minutes}M AGO`;
  if (hours < 24) return `${hours}H AGO`;
  if (days < 7) return `${days}D AGO`;
  if (weeks < 5) return `${weeks}W AGO`;
  if (months < 12) return `${months}MO AGO`;

  return `${years}Y AGO`;
}

function formatNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
}

function getLanguageColor(language: string | null) {
  if (!language) return 'var(--phosphor-dark)';

  return (
    LANGUAGE_COLORS[language] ||
    'var(--phosphor)'
  );
}

/* =========================================================
   HUD CORNERS
========================================================= */

const HudCorners: React.FC<{
  color?: string;
}> = ({
  color = 'var(--phosphor)',
}) => {
  const size = 7;

  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 2,
  };

  return (
    <>
      <span
        style={{
          ...base,
          top: -1,
          left: -1,
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
        }}
      />

      <span
        style={{
          ...base,
          top: -1,
          right: -1,
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />

      <span
        style={{
          ...base,
          bottom: -1,
          left: -1,
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
        }}
      />

      <span
        style={{
          ...base,
          bottom: -1,
          right: -1,
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />
    </>
  );
};

/* =========================================================
   STAT BLOCK
========================================================= */

const StatBlock: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: string;
}> = ({
  icon,
  label,
  value,
  accent = 'var(--phosphor)',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
      }}
    >
      <div
        style={{
          width: '27px',
          height: '27px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${accent}`,
          color: accent,
          background: 'rgba(0,255,65,0.035)',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: '10px',
            color: 'var(--phosphor-dark)',
            letterSpacing: '0.8px',
          }}
        >
          {label}
        </div>

        <div
          className="font-vt323"
          style={{
            fontSize: '19px',
            lineHeight: 1.1,
            color: accent,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   CONTRIBUTION HEATMAP
========================================================= */

const ContributionHeatmap: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );

        if (!response.ok) {
          throw new Error('Contribution request failed');
        }

        const data = await response.json();
        const days: ContributionDay[] = data.contributions || [];
        setContributions(days);
      } catch (error) {
        console.error('Contribution graph error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const weeks = useMemo(() => {
    if (!contributions.length) return [];

    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    contributions.forEach((day) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        result.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(day);
    });

    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }

    return result.slice(-53);
  }, [contributions]);

  const totalContributions = useMemo(() => {
    return contributions.reduce((sum, day) => sum + day.count, 0);
  }, [contributions]);

  const getIntensity = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const colors = [
    'rgba(0,255,65,0.035)',
    'rgba(0,255,65,0.20)',
    'rgba(0,255,65,0.40)',
    'rgba(0,255,65,0.65)',
    'rgba(0,255,65,0.95)',
  ];

  if (loading) {
    return (
      <div
        style={{
          border: '1px solid var(--border-dim)',
          padding: '12px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: 'var(--phosphor-dim)',
          }}
        >
          LOADING CONTRIBUTION MATRIX...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid var(--border-mid)',
        background: 'rgba(0,15,0,0.35)',
        padding: '12px',
        marginBottom: '14px',
        overflow: 'hidden',
      }}
    >
      <HudCorners color="var(--phosphor-dim)" />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
        >
          <GitCommit
            size={13}
            style={{
              color: 'var(--phosphor)',
            }}
          />
          <span
            style={{
              color: 'var(--phosphor-hot)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.7px',
            }}
          >
            CONTRIBUTION ACTIVITY
          </span>
        </div>

        <span
          style={{
            color: 'var(--phosphor-dim)',
            fontSize: '10px',
          }}
        >
          {totalContributions} CONTRIBUTIONS
        </span>
      </div>

      {/* Heatmap */}
      <div
        style={{
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '3px',
            minWidth: '720px',
          }}
        >
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              {week.map((day) => {
                const intensity = getIntensity(day.count);

                return (
                  <div
                    key={day.date}
                    title={`${day.count} contributions · ${day.date}`}
                    style={{
                      width: '10px',
                      height: '10px',
                      background: colors[intensity],
                      border: '1px solid rgba(0,255,65,0.08)',
                      boxShadow:
                        intensity >= 3
                          ? '0 0 4px rgba(0,255,65,0.25)'
                          : 'none',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '4px',
          marginTop: '8px',
          color: 'var(--phosphor-dark)',
          fontSize: '10px',
        }}
      >
        LESS
        {colors.map((color, index) => (
          <span
            key={index}
            style={{
              width: '9px',
              height: '9px',
              background: color,
              border: '1px solid rgba(0,255,65,0.08)',
            }}
          />
        ))}
        MORE
      </div>
    </div>
  );
};

/* =========================================================
   REPOSITORY LIST ITEM
========================================================= */

const RepoListItem: React.FC<{
  repo: GithubRepo;
}> = ({ repo }) => {
  const languageColor = getLanguageColor(repo.language);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        className="project-card"
        style={{
          borderBottom: '1px solid var(--border-dim)',
          padding: '12px 10px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '15px',
          transition: 'background 120ms ease',
        }}
      >
        {/* LEFT */}
        <div
          style={{
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              marginBottom: '5px',
            }}
          >
            <BookOpen
              size={13}
              style={{
                color: 'var(--phosphor)',
                flexShrink: 0,
              }}
            />

            <span
              style={{
                color: 'var(--phosphor-hot)',
                fontSize: '12px',
                fontWeight: 700,
                wordBreak: 'break-word',
              }}
            >
              {repo.name}
            </span>

            {repo.archived && (
              <span
                style={{
                  fontSize: '7px',
                  color: 'var(--amber)',
                  border: '1px solid var(--amber)',
                  padding: '2px 4px',
                }}
              >
                ARCHIVED
              </span>
            )}
          </div>

          <div
            style={{
              color: 'var(--phosphor-mid)',
              fontSize: '11px',
              lineHeight: 1.5,
              maxWidth: '720px',
              marginBottom: '8px',
            }}
          >
            {repo.description || 'No description provided.'}
          </div>

          {/* Metadata */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '13px',
              flexWrap: 'wrap',
              fontSize: '10px',
              color: 'var(--phosphor-dim)',
            }}
          >
            {repo.language && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Circle
                  size={7}
                  fill={languageColor}
                  color={languageColor}
                />
                {repo.language}
              </span>
            )}

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Star size={9} />
              {repo.stargazers_count}
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <GitFork size={9} />
              {repo.forks_count}
            </span>

            <span>UPDATED {formatDate(repo.updated_at)}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '8px',
            minWidth: '80px',
          }}
        >
          <ExternalLink
            size={12}
            style={{
              color: 'var(--phosphor-dark)',
            }}
          />

          <span
            style={{
              fontSize: '10px',
              color: 'var(--phosphor-dark)',
              whiteSpace: 'nowrap',
            }}
          >
            {repo.visibility?.toUpperCase() || 'PUBLIC'}
          </span>
        </div>
      </div>
    </a>
  );
};

/* =========================================================
   REPOSITORY CARD (FEATURED)
========================================================= */

const RepoCard: React.FC<{
  repo: GithubRepo;
  featured?: boolean;
}> = ({ repo, featured = false }) => {
  const languageColor = getLanguageColor(repo.language);

  return (
    <div
      className="project-card"
      style={{
        position: 'relative',
        border: `1px solid ${
          featured ? 'var(--border-mid)' : 'var(--border-dim)'
        }`,
        background:
          'linear-gradient(145deg, rgba(0,20,0,0.55), rgba(0,0,0,0.3))',
        padding: '13px',
        minHeight: '190px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HudCorners color={featured ? 'var(--phosphor)' : 'var(--border-dim)'} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '10px',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '7px',
            minWidth: 0,
          }}
        >
          <GithubIcon
            size={15}
            style={{
              color: 'var(--phosphor)',
              marginTop: '2px',
              flexShrink: 0,
            }}
          />

          <div style={{ minWidth: 0 }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: featured
                  ? 'var(--phosphor-hot)'
                  : 'var(--phosphor)',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                wordBreak: 'break-word',
                lineHeight: 1.3,
              }}
            >
              {repo.name}
            </a>

            <div
              style={{
                color: 'var(--phosphor-dark)',
                fontSize: '10px',
                marginTop: '3px',
              }}
            >
              {repo.visibility?.toUpperCase() || 'PUBLIC'}
            </div>
          </div>
        </div>

        {repo.archived && (
          <span
            style={{
              fontSize: '10px',
              color: 'var(--amber)',
              border: '1px solid var(--amber)',
              padding: '2px 5px',
              flexShrink: 0,
            }}
          >
            ARCHIVED
          </span>
        )}
      </div>

      <div
        style={{
          color: 'var(--phosphor-mid)',
          fontSize: '10px',
          lineHeight: 1.55,
          flexGrow: 1,
          marginBottom: '12px',
        }}
      >
        {repo.description || 'No repository description provided.'}
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border-dim)',
          paddingTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: 'var(--phosphor-dim)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: languageColor,
              boxShadow: `0 0 4px ${languageColor}`,
            }}
          />
          {repo.language || 'UNKNOWN'}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            fontSize: '11px',
            color: 'var(--phosphor-dim)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Star size={10} />
            {formatNumber(repo.stargazers_count)}
          </span>

          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <GitFork size={10} />
            {formatNumber(repo.forks_count)}
          </span>

          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Eye size={10} />
            {formatNumber(repo.watchers_count)}
          </span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN APP
========================================================= */

const GithubApp: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<'updated' | 'stars'>('updated');
  const [showAll, setShowAll] = useState(false);

  /* =======================================================
     FETCH GITHUB DATA
  ======================================================= */

  const fetchGithubData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        ),
      ]);

      if (!userResponse.ok) {
        throw new Error('Unable to load profile.');
      }

      if (!reposResponse.ok) {
        throw new Error('Unable to load repositories.');
      }

      const userData = await userResponse.json();
      const repoData = await reposResponse.json();

      setUser(userData);
      setRepos(repoData.filter((repo: GithubRepo) => !repo.fork));
    } catch (err) {
      console.error(err);
      setError('GITHUB API UNAVAILABLE');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  /* =======================================================
     SORT REPOSITORIES
  ======================================================= */

  const sortedRepos = useMemo(() => {
    const result = [...repos];

    if (sortMode === 'stars') {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else {
      result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }

    return result;
  }, [repos, sortMode]);

  const visibleRepos = showAll ? sortedRepos : sortedRepos.slice(0, 8);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="h-full retro-scroll"
        style={{
          padding: '14px',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        <div
          style={{
            border: '1px solid var(--border-mid)',
            padding: '20px',
            background: 'rgba(0,255,65,0.025)',
            color: 'var(--phosphor)',
          }}
        >
          <div
            className="font-vt323 text-glow"
            style={{
              fontSize: '22px',
              marginBottom: '7px',
            }}
          >
            GITHUB.EXE
          </div>

          <div
            style={{
              fontSize: '11px',
              color: 'var(--phosphor-dim)',
            }}
          >
            CONNECTING TO GITHUB...
          </div>

          <div
            style={{
              marginTop: '10px',
              fontSize: '10px',
              color: 'var(--phosphor)',
              letterSpacing: '2px',
            }}
          >
            [████████░░] SYNCING
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !user) {
    return (
      <div
        className="h-full retro-scroll"
        style={{
          padding: '14px',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        <div
          style={{
            border: '1px solid var(--amber)',
            padding: '20px',
            color: 'var(--amber)',
            background: 'rgba(255,176,0,0.025)',
          }}
        >
          <div
            className="font-vt323"
            style={{
              fontSize: '23px',
            }}
          >
            CONNECTION ERROR
          </div>

          <div
            style={{
              fontSize: '11px',
              marginTop: '6px',
            }}
          >
            {error}
          </div>

          <button
            onClick={fetchGithubData}
            className="retro-btn retro-btn-amber"
            style={{
              marginTop: '12px',
              padding: '5px 9px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            <RefreshCw
              size={9}
              style={{
                display: 'inline',
                marginRight: '5px',
              }}
            />
            RETRY
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div
      className="h-full retro-scroll"
      style={{
        padding: '14px',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border-mid)',
          borderLeft: '2px solid var(--phosphor)',
          padding: '11px 14px',
          marginBottom: '14px',
          background:
            'linear-gradient(90deg, rgba(0,255,65,0.045), rgba(0,255,65,0.01))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <HudCorners />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
          }}
        >
          <GithubIcon
            size={21}
            style={{
              color: 'var(--phosphor)',
            }}
          />

          <div>
            <div
              className="font-vt323 text-2xl text-glow"
              style={{
                color: 'var(--phosphor-hot)',
                lineHeight: 1,
              }}
            >
              GITHUB.EXE
            </div>

            <div
              style={{
                color: 'var(--phosphor-dim)',
                fontSize: '11px',
                marginTop: '3px',
              }}
            >
              REPOSITORY & CONTRIBUTION INDEX
            </div>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn"
          style={{
            fontSize: '10px',
            padding: '5px 8px',
            textDecoration: 'none',
          }}
        >
          PROFILE ↗
        </a>
      </div>

      {/* PROFILE STATS */}
      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border-mid)',
          background: 'var(--window-bg)',
          padding: '12px',
          marginBottom: '14px',
        }}
      >
        <HudCorners color="var(--phosphor-dim)" />

        <div
          className="grid grid-cols-1 sm:grid-cols-[minmax(190px,1.5fr)_repeat(3,1fr)] gap-3 sm:gap-4 items-center"
        >
          {/* PROFILE */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{
                width: '46px',
                height: '46px',
                border: '1px solid var(--phosphor)',
                padding: '2px',
              }}
            />

            <div>
              <div
                style={{
                  color: 'var(--phosphor-hot)',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {user.name || user.login}
              </div>

              <div
                style={{
                  color: 'var(--phosphor-dark)',
                  fontSize: '10px',
                  marginTop: '2px',
                }}
              >
                @{user.login}
              </div>

              {user.bio && (
                <div
                  style={{
                    color: 'var(--phosphor-mid)',
                    fontSize: '10px',
                    marginTop: '4px',
                    maxWidth: '260px',
                  }}
                >
                  {user.bio}
                </div>
              )}
            </div>
          </div>

          {/* STATS (Hidden on mobile mode) */}
          <div className="hidden sm:contents">
            <StatBlock
              icon={<BookOpen size={13} />}
              label="PUBLIC REPOS"
              value={user.public_repos}
            />

            <StatBlock
              icon={<Users size={13} />}
              label="FOLLOWERS"
              value={user.followers}
              accent="var(--phosphor-hot)"
            />

            <StatBlock
              icon={<Activity size={13} />}
              label="FOLLOWING"
              value={user.following}
              accent="var(--amber)"
            />
          </div>
        </div>
      </div>

      {/* CONTRIBUTION ACTIVITY */}
      <ContributionHeatmap />

      {/* REPOSITORIES TOOLBAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <div>
          <div
            style={{
              color: 'var(--phosphor-hot)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.7px',
            }}
          >
            REPOSITORIES
          </div>

          <div
            style={{
              color: 'var(--phosphor-dark)',
              fontSize: '10px',
              marginTop: '2px',
            }}
          >
            {repos.length} PUBLIC PROJECTS
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '5px',
          }}
        >
          <button
            onClick={() => setSortMode('updated')}
            className={
              sortMode === 'updated'
                ? 'retro-btn'
                : 'retro-btn retro-btn-muted'
            }
            style={{
              fontSize: '10px',
              padding: '4px 7px',
              cursor: 'pointer',
            }}
          >
            RECENT
          </button>

          <button
            onClick={() => setSortMode('stars')}
            className={
              sortMode === 'stars'
                ? 'retro-btn retro-btn-amber'
                : 'retro-btn retro-btn-muted'
            }
            style={{
              fontSize: '10px',
              padding: '4px 7px',
              cursor: 'pointer',
            }}
          >
            ★ STARS
          </button>

          <button
            onClick={fetchGithubData}
            className="retro-btn"
            style={{
              fontSize: '10px',
              padding: '4px 7px',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={9} />
          </button>
        </div>
      </div>

      {/* REPOSITORY LIST */}
      <div
        style={{
          border: '1px solid var(--border-mid)',
          background: 'rgba(0,10,0,0.25)',
        }}
      >
        {visibleRepos.map((repo) => (
          <RepoListItem key={repo.id} repo={repo} />
        ))}
      </div>

      {/* SHOW ALL */}
      {repos.length > 8 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '12px',
          }}
        >
          <button
            onClick={() => setShowAll((current) => !current)}
            className="retro-btn"
            style={{
              fontSize: '10px',
              padding: '6px 14px',
              cursor: 'pointer',
            }}
          >
            {showAll
              ? '[ COLLAPSE ]'
              : `[ SHOW ALL ${repos.length} REPOSITORIES ]`}
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '12px',
          paddingTop: '8px',
          borderTop: '1px dashed var(--border-dim)',
          color: 'var(--phosphor-dark)',
          fontSize: '10px',
        }}
      >
        <span>SOURCE: GITHUB API</span>
        <span>LIVE REPOSITORY DATA</span>
      </div>
    </div>
  );
};

export default GithubApp;