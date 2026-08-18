import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Code2,
  ExternalLink,
  Flame,
  RefreshCw,
  Terminal,
  Trophy,
} from 'lucide-react';

const USERNAME = 'aditabhi9';

const API = 'https://leetcode-api-pied.vercel.app';

const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;

/* =========================================================
   TYPES
========================================================= */

interface Profile {
  username?: string;
  ranking?: number;
  contributionPoint?: number;
  reputation?: number;
  acceptanceRate?: number;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  totalSubmission?: number;
  contestRating?: number;
}

interface Submission {
  id?: string;
  title?: string;
  titleSlug?: string;
  timestamp?: string;
  statusDisplay?: string;
  lang?: string;
}

interface CalendarData {
  submissionCalendar?: string | Record<string, number>;
  totalActiveDays?: number;
  streak?: number;
}

interface Skill {
  tagName?: string;
  problemsSolved?: number;
}

interface SkillsData {
  advanced?: Skill[];
  intermediate?: Skill[];
  fundamental?: Skill[];
}

interface ApiState {
  profile: Profile | null;
  submissions: Submission[];
  calendar: Record<string, number>;
  skills: SkillsData | null;
}

/* =========================================================
   HELPERS
========================================================= */

const formatNumber = (value?: number | null) => {
  if (value === undefined || value === null) return '--';

  return new Intl.NumberFormat('en-IN').format(value);
};

const formatRank = (value?: number | null) => {
  if (!value) return '--';

  return `#${formatNumber(value)}`;
};

const formatDate = (timestamp?: string) => {
  if (!timestamp) return '--';

  return new Date(Number(timestamp) * 1000).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
    }
  );
};

const getCalendarObject = (
  value?: string | Record<string, number>
) => {
  if (!value) return {};

  if (typeof value === 'object') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

/* =========================================================
   HUD CORNERS
========================================================= */

const HudCorners = () => (
  <>
    <span
      style={{
        position: 'absolute',
        top: -1,
        left: -1,
        width: 7,
        height: 7,
        borderTop: '2px solid var(--phosphor)',
        borderLeft: '2px solid var(--phosphor)',
      }}
    />

    <span
      style={{
        position: 'absolute',
        top: -1,
        right: -1,
        width: 7,
        height: 7,
        borderTop: '2px solid var(--phosphor)',
        borderRight: '2px solid var(--phosphor)',
      }}
    />

    <span
      style={{
        position: 'absolute',
        bottom: -1,
        left: -1,
        width: 7,
        height: 7,
        borderBottom: '2px solid var(--phosphor)',
        borderLeft: '2px solid var(--phosphor)',
      }}
    />

    <span
      style={{
        position: 'absolute',
        bottom: -1,
        right: -1,
        width: 7,
        height: 7,
        borderBottom: '2px solid var(--phosphor)',
        borderRight: '2px solid var(--phosphor)',
      }}
    />
  </>
);

/* =========================================================
   STAT
========================================================= */

const Stat = ({
  label,
  value,
  accent = 'var(--phosphor)',
}: {
  label: string;
  value: string;
  accent?: string;
}) => (
  <div>
    <div
      style={{
        color: 'var(--phosphor-dark)',
        fontSize: 8,
        letterSpacing: '1px',
        marginBottom: 4,
      }}
    >
      {label}
    </div>

    <div
      className="font-vt323"
      style={{
        fontSize: 25,
        lineHeight: 1,
        color: accent,
      }}
    >
      {value}
    </div>
  </div>
);

/* =========================================================
   DIFFICULTY CARD
========================================================= */

const DifficultyCard = ({
  label,
  solved,
  total,
  color,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
}) => {
  const percentage =
    total > 0
      ? Math.min(100, Math.round((solved / total) * 100))
      : 0;

  return (
    <div
      style={{
        minWidth: 125,
        paddingRight: 22,
        borderRight:
          '1px solid var(--border-dim)',
      }}
    >
      <div
        style={{
          color,
          fontSize: 8,
          letterSpacing: '1px',
          marginBottom: 4,
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 5,
        }}
      >
        <span
          className="font-vt323"
          style={{
            fontSize: 27,
            color,
          }}
        >
          {formatNumber(solved)}
        </span>

        <span
          style={{
            fontSize: 9,
            color: 'var(--phosphor-dark)',
          }}
        >
          / {formatNumber(total)}
        </span>
      </div>

      <div
        style={{
          width: 105,
          height: 3,
          marginTop: 7,
          background:
            'rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   CONTRIBUTION HEATMAP
========================================================= */

const ContributionGraph = ({
  calendar,
}: {
  calendar: Record<string, number>;
}) => {
  const cells = useMemo(() => {
    const now = new Date();

    const result = [];

    /*
      53 weeks × 7 days.
      This intentionally creates a GitHub/LeetCode-like
      contribution wall rather than a simple list.
    */

    for (let week = 52; week >= 0; week--) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(now);

        date.setDate(
          date.getDate() -
          week * 7 -
          (now.getDay() - day)
        );

        date.setHours(0, 0, 0, 0);

        const timestamp =
          Math.floor(
            date.getTime() / 1000
          );

        const key = String(timestamp);

        /*
          LeetCode timestamps can differ depending
          on timezone alignment, so find the nearest
          calendar entry for the same date.
        */

        let count = calendar[key] || 0;

        if (!count) {
          const dateString =
            date.toISOString().slice(0, 10);

          const matchingEntry =
            Object.entries(calendar).find(
              ([timestamp]) => {
                const entryDate =
                  new Date(
                    Number(timestamp) * 1000
                  )
                    .toISOString()
                    .slice(0, 10);

                return entryDate === dateString;
              }
            );

          count = matchingEntry
            ? matchingEntry[1]
            : 0;
        }

        result.push({
          date,
          count,
        });
      }
    }

    return result;
  }, [calendar]);

  const max =
    Math.max(
      ...cells.map((cell) => cell.count),
      1
    );

  const getOpacity = (
    count: number
  ) => {
    if (count === 0) return 0.025;

    const ratio = count / max;

    if (ratio <= 0.2) return 0.2;
    if (ratio <= 0.4) return 0.4;
    if (ratio <= 0.7) return 0.65;

    return 1;
  };

  return (
    <div
      style={{
        position: 'relative',
        border:
          '1px solid var(--border-mid)',
        background:
          'var(--window-bg)',
        padding: 13,
        marginBottom: 14,
      }}
    >
      <HudCorners />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            'space-between',
          marginBottom: 11,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            color:
              'var(--phosphor)',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          <CalendarDays size={13} />
          CONTRIBUTION ACTIVITY
        </div>

        <span
          style={{
            fontSize: 8,
            color:
              'var(--phosphor-dark)',
          }}
        >
          LAST 365 DAYS
        </span>
      </div>

      <div
        style={{
          overflowX: 'auto',
          paddingBottom: 3,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(53, 1fr)',
            gridTemplateRows:
              'repeat(7, 10px)',
            gridAutoFlow: 'column',
            gap: 3,
            minWidth: 590,
          }}
        >
          {cells.map((cell, index) => (
            <div
              key={index}
              title={`${cell.count} submissions`}
              style={{
                width: 10,
                height: 10,
                background: `rgba(0,255,65,${getOpacity(
                  cell.count
                )})`,
                border:
                  '1px solid rgba(0,255,65,0.08)',
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent:
            'flex-end',
          alignItems: 'center',
          gap: 4,
          marginTop: 9,
          fontSize: 8,
          color:
            'var(--phosphor-dark)',
        }}
      >
        LESS

        {[0.025, 0.2, 0.4, 0.65, 1].map(
          (opacity) => (
            <span
              key={opacity}
              style={{
                width: 9,
                height: 9,
                background: `rgba(0,255,65,${opacity})`,
              }}
            />
          )
        )}

        MORE
      </div>
    </div>
  );
};

/* =========================================================
   SKILLS
========================================================= */

const SkillsPanel = ({
  skills,
}: {
  skills: SkillsData | null;
}) => {
  const groups = [
    {
      name: 'ADVANCED',
      color: 'var(--phosphor-hot)',
      items: skills?.advanced || [],
    },
    {
      name: 'INTERMEDIATE',
      color: 'var(--amber)',
      items: skills?.intermediate || [],
    },
    {
      name: 'FUNDAMENTAL',
      color: 'var(--phosphor)',
      items: skills?.fundamental || [],
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        border:
          '1px solid var(--border-mid)',
        background:
          'var(--window-bg)',
        padding: 12,
      }}
    >
      <HudCorners />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          color:
            'var(--phosphor)',
          fontSize: 11,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        <Code2 size={13} />
        PROBLEM SKILLS
      </div>

      {groups.map((group) => (
        <div
          key={group.name}
          style={{
            marginBottom: 11,
          }}
        >
          <div
            style={{
              color: group.color,
              fontSize: 8,
              letterSpacing: '1px',
              marginBottom: 6,
            }}
          >
            {group.name}
          </div>

          {group.items.length === 0 ? (
            <span
              style={{
                fontSize: 8,
                color:
                  'var(--phosphor-dark)',
              }}
            >
              NO DATA
            </span>
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 5,
              }}
            >
              {group.items
                .slice(0, 8)
                .map((skill) => (
                  <div
                    key={skill.tagName}
                    style={{
                      border:
                        '1px solid var(--border-dim)',
                      padding:
                        '4px 7px',
                      fontSize: 8,
                      color:
                        'var(--phosphor-mid)',
                      background:
                        'rgba(255,255,255,0.015)',
                    }}
                  >
                    {skill.tagName}

                    <span
                      style={{
                        marginLeft: 5,
                        color:
                          group.color,
                      }}
                    >
                      ×
                      {
                        skill.problemsSolved
                      }
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   RECENT SUBMISSIONS
========================================================= */

const RecentSubmissions = ({
  submissions,
}: {
  submissions: Submission[];
}) => {
  return (
    <div
      style={{
        position: 'relative',
        border:
          '1px solid var(--border-mid)',
        background:
          'var(--window-bg)',
        padding: 12,
      }}
    >
      <HudCorners />

      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            color:
              'var(--phosphor-hot)',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          <Flame size={13} />
          RECENT SUBMISSIONS
        </div>

        <span
          style={{
            color:
              'var(--phosphor-dark)',
            fontSize: 8,
          }}
        >
          LIVE
        </span>
      </div>

      {submissions.length === 0 ? (
        <div
          style={{
            padding:
              '18px 0',
            color:
              'var(--phosphor-dark)',
            fontSize: 9,
          }}
        >
          NO RECENT SUBMISSIONS
        </div>
      ) : (
        submissions
          .slice(0, 8)
          .map((submission, index) => (
            <a
              key={
                submission.id ||
                index
              }
              href={
                submission.titleSlug
                  ? `https://leetcode.com/problems/${submission.titleSlug}/`
                  : PROFILE_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'grid',
                gridTemplateColumns:
                  '18px minmax(0,1fr) auto',
                gap: 8,
                alignItems:
                  'center',
                padding:
                  '8px 3px',
                borderBottom:
                  '1px solid var(--border-dim)',
                textDecoration:
                  'none',
              }}
            >
              <CheckCircle2
                size={11}
                style={{
                  color:
                    'var(--phosphor)',
                }}
              />

              <div
                style={{
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
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
                  {
                    submission.title
                  }
                </div>

                <div
                  style={{
                    marginTop: 2,
                    fontSize: 7,
                    color:
                      'var(--phosphor-dark)',
                  }}
                >
                  {(
                    submission.lang ||
                    'CODE'
                  ).toUpperCase()}{' '}
                  ·{' '}
                  {formatDate(
                    submission.timestamp
                  )}
                </div>
              </div>

              <span
                style={{
                  fontSize: 7,
                  color:
                    'var(--phosphor-hot)',
                }}
              >
                {(
                  submission.statusDisplay ||
                  'ACCEPTED'
                ).toUpperCase()}
              </span>
            </a>
          ))
      )}
    </div>
  );
};

/* =========================================================
   MAIN APP
========================================================= */

const LeetcodeApp: React.FC = () => {
  const [data, setData] =
    useState<ApiState>({
      profile: null,
      submissions: [],
      calendar: {},
      skills: null,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);

      /*
        IMPORTANT:
        Don't depend on ONE giant response.

        Fetch each public endpoint separately.
      */

      const [
        profileRes,
        submissionRes,
        calendarRes,
        skillsRes,
      ] = await Promise.all([
        fetch(
          `${API}/user/${USERNAME}`
        ),

        fetch(
          `${API}/user/${USERNAME}/submissions`
        ),

        fetch(
          `${API}/user/${USERNAME}/calendar`
        ),

        fetch(
          `${API}/user/${USERNAME}/skills`
        ),
      ]);

      if (
        !profileRes.ok ||
        !submissionRes.ok ||
        !calendarRes.ok ||
        !skillsRes.ok
      ) {
        throw new Error(
          'LeetCode API request failed'
        );
      }

      const profile =
        await profileRes.json();

      const submissions =
        await submissionRes.json();

      const calendar =
        await calendarRes.json();

      const skills =
        await skillsRes.json();

      console.log(
        'LEETCODE PROFILE:',
        profile
      );

      console.log(
        'LEETCODE SUBMISSIONS:',
        submissions
      );

      console.log(
        'LEETCODE CALENDAR:',
        calendar
      );

      console.log(
        'LEETCODE SKILLS:',
        skills
      );

      /*
        Normalize the API response.

        The leetcode-api-pied endpoint returns:
        {
          username, profile: { ranking, ... },
          submitStats: {
            acSubmissionNum: [
              { difficulty: 'All', count: 273 },
              { difficulty: 'Easy', count: 112 },
              { difficulty: 'Medium', count: 144 },
              { difficulty: 'Hard', count: 17 },
            ],
            totalSubmissionNum: [
              { difficulty: 'All', count: 274, submissions: 870 },
              ...
            ]
          }
        }
      */

      const ac = profile?.submitStats?.acSubmissionNum || [];
      const total = profile?.submitStats?.totalSubmissionNum || [];

      const getAcCount = (diff: string) =>
        ac.find((x: { difficulty: string }) => x.difficulty === diff)?.count ?? 0;

      const getAcSubs = (diff: string) =>
        ac.find((x: { difficulty: string }) => x.difficulty === diff)?.submissions ?? 0;

      const getTotalSubs = (diff: string) =>
        total.find((x: { difficulty: string }) => x.difficulty === diff)?.submissions ?? 0;

      const allAcSubs = getAcSubs('All');
      const allTotalSubs = getTotalSubs('All');

      const profileData: Profile = {
        username: profile?.username,
        ranking: profile?.profile?.ranking,
        contributionPoint: profile?.profile?.reputation,
        reputation: profile?.profile?.reputation,
        // Acceptance = accepted submissions / total submissions × 100
        acceptanceRate:
          allTotalSubs > 0
            ? Math.round((allAcSubs / allTotalSubs) * 100 * 10) / 10
            : undefined,
        totalSolved: getAcCount('All'),
        easySolved: getAcCount('Easy'),
        mediumSolved: getAcCount('Medium'),
        hardSolved: getAcCount('Hard'),
        totalSubmission: allTotalSubs,
      };

      const submissionData = submissions;

      const calendarData =
        calendar?.data ||
        calendar?.userCalendar ||
        calendar;

      const skillsData =
        skills?.data ||
        skills;

      const calendarObject =
        getCalendarObject(
          calendarData?.submissionCalendar ||
          calendarData?.calendar ||
          calendarData
        );

      setData({
        profile: profileData,
        submissions:
          Array.isArray(submissionData)
            ? submissionData
            : submissionData?.submissions ||
            submissionData?.recentSubmissions ||
            [],
        calendar:
          calendarObject,
        skills:
          skillsData,
      });
    } catch (err) {
      console.error(
        'LEETCODE LOAD ERROR:',
        err
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="h-full retro-scroll"
        style={{
          padding: 14,
          fontFamily:
            'var(--font-mono)',
        }}
      >
        <div
          style={{
            position: 'relative',
            border:
              '1px solid var(--border-mid)',
            padding: 20,
            background:
              'var(--window-bg)',
          }}
        >
          <HudCorners />

          <div
            className="font-vt323"
            style={{
              fontSize: 28,
              color:
                'var(--phosphor-hot)',
            }}
          >
            LEETCODE.EXE
          </div>

          <div
            style={{
              marginTop: 5,
              color:
                'var(--phosphor-dark)',
              fontSize: 9,
            }}
          >
            FETCHING PROFILE DATA...
          </div>

          <div
            style={{
              marginTop: 12,
              color:
                'var(--phosphor)',
              fontSize: 10,
            }}
          >
            ▰▰▰▰▰▰▰▰▱▱
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div
        className="h-full retro-scroll"
        style={{
          padding: 14,
          fontFamily:
            'var(--font-mono)',
        }}
      >
        <div
          style={{
            position: 'relative',
            border:
              '1px solid var(--amber)',
            padding: 20,
            background:
              'var(--window-bg)',
          }}
        >
          <HudCorners />

          <div
            className="font-vt323"
            style={{
              fontSize: 28,
              color:
                'var(--amber)',
            }}
          >
            DATA LINK FAILURE
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 9,
              color:
                'var(--phosphor-dark)',
            }}
          >
            Could not retrieve live
            LeetCode data.
          </div>

          <button
            onClick={loadData}
            className="retro-btn retro-btn-amber"
            style={{
              marginTop: 13,
              cursor: 'pointer',
              padding:
                '5px 9px',
              fontSize: 8,
            }}
          >
            <RefreshCw
              size={9}
              style={{
                marginRight: 5,
              }}
            />
            RETRY
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     PROFILE DATA
  ======================================================= */

  const profile =
    data.profile || {};

  const easy =
    Number(
      profile.easySolved || 0
    );

  const medium =
    Number(
      profile.mediumSolved || 0
    );

  const hard =
    Number(
      profile.hardSolved || 0
    );

  const totalSolved =
    Number(
      profile.totalSolved ||
      easy +
      medium +
      hard
    );

  const acceptance =
    profile.acceptanceRate;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="h-full retro-scroll"
      style={{
        padding: 14,
        fontFamily:
          'var(--font-mono)',
      }}
    >
      {/* HEADER */}

      <div
        style={{
          position: 'relative',
          border:
            '1px solid var(--border-mid)',
          borderLeft:
            '2px solid var(--phosphor)',
          padding:
            '10px 13px',
          marginBottom: 14,
          background:
            'rgba(0,255,65,0.025)',
          display: 'flex',
          alignItems:
            'center',
          justifyContent:
            'space-between',
          gap: 12,
        }}
      >
        <HudCorners />

        <div
          style={{
            display: 'flex',
            alignItems:
              'center',
            gap: 9,
          }}
        >
          <Terminal
            size={18}
            style={{
              color:
                'var(--phosphor)',
            }}
          />

          <div>
            <div
              className="font-vt323"
              style={{
                fontSize: 26,
                color:
                  'var(--phosphor-hot)',
                textShadow:
                  '0 0 8px rgba(57,255,20,.35)',
              }}
            >
              LEETCODE.EXE
            </div>

            <div
              style={{
                fontSize: 8,
                color:
                  'var(--phosphor-dark)',
                marginTop: 2,
              }}
            >
              ALGORITHM PROFILE
            </div>
          </div>
        </div>

        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn"
          style={{
            display: 'flex',
            alignItems:
              'center',
            gap: 5,
            padding:
              '5px 9px',
            fontSize: 8,
            textDecoration:
              'none',
          }}
        >
          OPEN PROFILE
          <ExternalLink size={9} />
        </a>
      </div>

      {/* PROFILE */}

      <div
        style={{
          position: 'relative',
          border:
            '1px solid var(--border-mid)',
          background:
            'var(--window-bg)',
          padding: 13,
          marginBottom: 14,
        }}
      >
        <HudCorners />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1.5fr repeat(3,1fr)',
            gap: 20,
            alignItems:
              'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 8,
                color:
                  'var(--phosphor-dark)',
              }}
            >
              USERNAME
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                color:
                  'var(--phosphor-hot)',
                fontWeight: 700,
              }}
            >
              {profile.username ||
                USERNAME}
            </div>

            <div
              style={{
                marginTop: 5,
                fontSize: 8,
                color:
                  'var(--phosphor-mid)',
              }}
            >
              DATA STRUCTURES ·
              ALGORITHMS
            </div>
          </div>

          <Stat
            label="SOLVED"
            value={formatNumber(
              totalSolved
            )}
            accent="var(--phosphor-hot)"
          />

          <Stat
            label="RANK"
            value={formatRank(
              profile.ranking
            )}
            accent="var(--amber)"
          />

          <Stat
            label="ACCEPTANCE"
            value={
              acceptance
                ? `${acceptance}%`
                : '--'
            }
          />
        </div>
      </div>

      {/* PROBLEM SOLVING */}

      <div
        style={{
          position: 'relative',
          border:
            '1px solid var(--border-mid)',
          background:
            'var(--window-bg)',
          padding: 13,
          marginBottom: 14,
        }}
      >
        <HudCorners />

        <div
          style={{
            display: 'flex',
            alignItems:
              'center',
            gap: 7,
            color:
              'var(--phosphor)',
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 13,
          }}
        >
          <Trophy size={13} />

          PROBLEM SOLVING
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 18,
          }}
        >
          <DifficultyCard
            label="EASY"
            solved={easy}
            total={852}
            color="#00b8a3"
          />

          <DifficultyCard
            label="MEDIUM"
            solved={medium}
            total={1785}
            color="#ffc01e"
          />

          <DifficultyCard
            label="HARD"
            solved={hard}
            total={765}
            color="#ef4743"
          />

          <Stat
            label="CONTRIBUTION"
            value={formatNumber(
              profile.contributionPoint
            )}
          />
        </div>
      </div>

      {/* HEATMAP */}

      <ContributionGraph
        calendar={data.calendar}
      />

      {/* BOTTOM */}

      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-3.5">
        <RecentSubmissions
          submissions={
            data.submissions
          }
        />

        <div className="hidden md:block">
          <SkillsPanel
            skills={data.skills}
          />
        </div>
      </div>

      {/* FOOTER */}

      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems:
            'center',
          marginTop: 10,
          paddingTop: 8,
          borderTop:
            '1px dashed var(--border-dim)',
          fontSize: 8,
          color:
            'var(--phosphor-dark)',
        }}
      >
        <span>
          SOURCE: LEETCODE
        </span>

        <button
          onClick={loadData}
          style={{
            border: 'none',
            background:
              'transparent',
            color:
              'var(--phosphor-dark)',
            fontFamily:
              'var(--font-mono)',
            fontSize: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems:
              'center',
            gap: 4,
          }}
        >
          <RefreshCw size={9} />
          REFRESH DATA
        </button>
      </div>
    </div>
  );
};

export default LeetcodeApp;