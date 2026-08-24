import React from 'react';

const SPECIALIZATIONS = [
  {
    code: 'RAG',
    title: 'Production LLM & Hybrid RAG',
    color: 'var(--phosphor)',
    desc: 'Hybrid retrieval using dense embeddings + BM25, fused with RRF and reranking.',
    level: 92,
  },
  {
    code: 'API',
    title: 'Backend & Microservices',
    color: 'var(--amber)',
    desc: 'REST APIs, authentication, database indexing, and scalable backend services.',
    level: 85,
  },
  {
    code: 'MMI',
    title: 'Multimodal AI',
    color: 'var(--phosphor-hot)',
    desc: 'Video, Whisper transcripts, technical documents, vector search, and local inference.',
    level: 88,
  },
  {
    code: 'WEB',
    title: 'Full-Stack Development',
    color: 'var(--phosphor)',
    desc: 'React applications backed by Node.js, Express, MongoDB, and MySQL.',
    level: 82,
  },
];

const STATS = [
  {
    label: 'ROLE',
    value: 'Software Engineering & AI Intern @ Synergy Telecom',
  },
  {
    label: 'EDUCATION',
    value: 'B.Tech AI & DS @ VIPS-TC, GGSIPU — CGPA 8.8',
  },
  {
    label: 'ACHIEVEMENT',
    value: '1st Place @ Cluster Build-a-thon',
    accent: true,
  },
  {
    label: 'DSA',
    value: '300+ Problems Solved',
  },
];

const LINKS = [
  {
    href: '/Aditya_Resume.pdf',
    label: 'RÉSUMÉ (PDF)',
    variant: 'retro-btn-amber',
    download: 'Aditya_Resume.pdf',
  },
  {
    href: 'https://github.com/adityasingh0405',
    label: 'GITHUB',
    variant: '',
  },
  {
    href: 'https://linkedin.com/in/aditya-singh-2b175828a',
    label: 'LINKEDIN',
    variant: '',
  },

];

/* -------------------------------------------------------
   HUD CORNERS
------------------------------------------------------- */

const HudCorners: React.FC<{
  color?: string;
  size?: number;
}> = ({
  color = 'var(--phosphor)',
  size = 9,
}) => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: size,
      height: size,
      pointerEvents: 'none',
      zIndex: 3,
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

/* -------------------------------------------------------
   SKILL METER
------------------------------------------------------- */

const Meter: React.FC<{
  level: number;
  color: string;
}> = ({ level, color }) => {
  const totalBlocks = 12;
  const filled = Math.round((level / 100) * totalBlocks);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2px',
        }}
      >
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <span
            key={i}
            style={{
              width: '8px',
              height: '10px',
              background:
                i < filled ? color : 'var(--border-dim)',
              opacity: i < filled ? 1 : 0.35,
              boxShadow:
                i < filled ? `0 0 4px ${color}` : 'none',
            }}
          />
        ))}
      </div>

      <span
        style={{
          fontSize: '10px',
          color,
          fontWeight: 700,
        }}
      >
        {level}%
      </span>
    </div>
  );
};

/* -------------------------------------------------------
   CODE TAG
------------------------------------------------------- */

const CodeTag: React.FC<{
  code: string;
  color: string;
}> = ({ code, color }) => (
  <span
    style={{
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: '9px',
      fontWeight: 700,
      color,
      border: `1px solid ${color}`,
      padding: '2px 5px',
      marginRight: '8px',
      letterSpacing: '0.7px',
      verticalAlign: 'middle',
      boxShadow: `0 0 5px ${color}`,
    }}
  >
    {code}
  </span>
);

/* -------------------------------------------------------
   MAIN
------------------------------------------------------- */

const AboutApp: React.FC = () => {
  return (
    <div
      className="h-full retro-scroll"
      style={{
        padding: '18px',
        fontFamily: 'var(--font-mono)',
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border-mid)',
          borderLeft: '3px solid var(--phosphor)',
          padding: '13px 16px',
          marginBottom: '16px',
          background:
            'linear-gradient(90deg, rgba(0,255,65,0.07), rgba(0,255,65,0.015))',
          boxShadow: '0 0 18px rgba(0,255,65,0.05)',
        }}
        className="flex flex-col sm:flex-row justify-between sm:items-center gap-3"
      >
        <HudCorners />

        <div>
          <div
            className="font-vt323 text-glow"
            style={{
              fontSize: '25px',
              color: 'var(--phosphor-hot)',
              letterSpacing: '1px',
            }}
          >
            ABOUT.EXE
          </div>

          <div
            style={{
              color: 'var(--phosphor-dim)',
              fontSize: '11px',
              marginTop: '2px',
              letterSpacing: '0.5px',
            }}
          >

          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '10px',
            color: 'var(--phosphor-hot)',
            border: '1px solid var(--phosphor-hot)',
            padding: '5px 9px',
            background: 'rgba(0,0,0,0.45)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: 'var(--phosphor-hot)',
              boxShadow: '0 0 7px var(--phosphor-hot)',
              borderRadius: '50%',
              animation: 'pulse 1.5s infinite',
            }}
          />

          AVAILABLE
        </div>
      </div>


      {/* =================================================
          PROFILE AREA
      ================================================= */}

      <div
        className="grid grid-cols-1 sm:grid-cols-[205px_1fr]"
        style={{
          gap: '16px',
          marginBottom: '16px',
        }}
      >

        {/* ---------------- PHOTO ---------------- */}

        <div
          style={{
            position: 'relative',
            border: '1px solid var(--border-mid)',
            background:
              'linear-gradient(145deg, rgba(0,255,65,0.035), rgba(0,0,0,0.25))',
            padding: '13px',
          }}
        >
          <HudCorners color="var(--phosphor-hot)" />

          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              border: '2px solid var(--phosphor)',
              padding: '4px',
              background: '#020d04',
              boxShadow:
                '0 0 14px rgba(0,255,65,0.18), inset 0 0 18px rgba(0,255,65,0.06)',
              overflow: 'hidden',
            }}
          >
            <img
              src="/aditya_portrait.png"
              alt="Portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                imageRendering: 'pixelated',
                filter:
                  'contrast(1.12) brightness(0.96) saturate(0.8)',
              }}
            />

            {/* Scanlines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.28) 4px)',
                pointerEvents: 'none',
              }}
            />

            {/* Green tint */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(0,255,65,0.08), transparent 50%, rgba(255,180,0,0.05))',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div
            style={{
              marginTop: '11px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'var(--phosphor)',
                fontWeight: 700,
              }}
            >
              PROFILE
            </span>

            <span
              style={{
                fontSize: '9px',
                color: 'var(--phosphor-dim)',
              }}
            >
              01
            </span>
          </div>

          <div
            style={{
              marginTop: '8px',
              paddingTop: '9px',
              borderTop: '1px dashed var(--border-dim)',
              fontSize: '11px',
              color: 'var(--phosphor-dim)',
              lineHeight: 1.6,
            }}
          >
            DELHI, INDIA
            <br />
            AI / DATA / SOFTWARE
          </div>
        </div>


        {/* ---------------- BIO ---------------- */}

        <div
          style={{
            position: 'relative',
            border: '1px solid var(--border-mid)',
            background: 'var(--window-bg)',
            padding: '18px',
            overflow: 'hidden',
          }}
        >
          <HudCorners />

          {/* Decorative grid */}
          <div
            style={{
              position: 'absolute',
              right: '-30px',
              top: '-40px',
              width: '180px',
              height: '180px',
              opacity: 0.08,
              backgroundImage:
                'linear-gradient(var(--phosphor) 1px, transparent 1px), linear-gradient(90deg, var(--phosphor) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              transform: 'rotate(15deg)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div
                className="font-vt323 text-glow"
                style={{
                  fontSize: '31px',
                  color: 'var(--phosphor-hot)',
                  lineHeight: 1,
                }}
              >
                Aditya Singh
              </div>

              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--phosphor-dim)',
                  letterSpacing: '1px',
                }}
              >
              </span>
            </div>

            <div
              style={{
                marginTop: '7px',
                fontSize: '12px',
                color: 'var(--phosphor)',
                lineHeight: 1.5,
              }}
            >
              LLM Engineering · RAG · Full-Stack Systems
            </div>

            <div
              style={{
                marginTop: '15px',
                borderTop: '1px dashed var(--border-dim)',
                paddingTop: '14px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--phosphor-dim)',
                  letterSpacing: '1px',
                  marginBottom: '7px',
                }}
              >

              </div>

              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--phosphor-mid)',
                  lineHeight: 1.75,
                  maxWidth: '780px',
                }}
              >
                AI & Data Science undergraduate focused on building useful
                software around LLMs, retrieval systems, data, and the web.
                Interested in taking ideas from prototypes to reliable,
                production-ready applications.
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '13px',
                borderTop: '1px dashed var(--border-dim)',
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
              }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '95px 1fr',
                    gap: '10px',
                    fontSize: '12px',
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--phosphor-dark)',
                      fontWeight: 900,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {stat.label}
                  </span>

                  <span
                    style={{
                      color: stat.accent
                        ? 'var(--amber)'
                        : 'var(--phosphor-mid)',
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* =================================================
          SPECIALIZATIONS
      ================================================= */}

      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border-mid)',
          background: 'var(--window-bg)',
          padding: '17px',
          marginBottom: '16px',
        }}
      >
        <HudCorners color="var(--phosphor)" />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '13px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'var(--phosphor-hot)',
              fontWeight: 700,
              letterSpacing: '0.7px',
            }}
          >
            CORE SPECIALIZATIONS
          </div>

          <div
            style={{
              fontSize: '9px',
              color: 'var(--phosphor-dim)',
            }}
          >
            04 MODULES
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{
            gap: '10px',
          }}
        >
          {SPECIALIZATIONS.map((spec) => (
            <div
              key={spec.title}
              style={{
                position: 'relative',
                border: '1px solid var(--border-dim)',
                padding: '13px',
                background:
                  'linear-gradient(135deg, rgba(0,255,65,0.025), rgba(0,0,0,0.35))',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: spec.color,
                  fontWeight: 700,
                  marginBottom: '8px',
                  lineHeight: 1.4,
                }}
              >
                <CodeTag
                  code={spec.code}
                  color={spec.color}
                />

                {spec.title}
              </div>

              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--phosphor-mid)',
                  lineHeight: 1.65,
                }}
              >
                {spec.desc}
              </div>

              <Meter
                level={spec.level}
                color={spec.color}
              />
            </div>
          ))}
        </div>
      </div>


      {/* =================================================
          TECH STRIP
      ================================================= */}

      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border-mid)',
          background: 'rgba(0, 12, 3, 0.45)',
          padding: '14px 16px',
          marginBottom: '16px',
          boxShadow: 'inset 0 0 20px rgba(0,255,65,0.025)',
        }}
      >
        <HudCorners color="var(--phosphor-dim)" size={7} />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            paddingBottom: '9px',
            borderBottom: '1px dashed var(--border-dim)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                background: 'var(--phosphor)',
                boxShadow: '0 0 7px var(--phosphor)',
              }}
            />

            <span
              style={{
                fontSize: '11px',
                color: 'var(--phosphor-hot)',
                fontWeight: 700,
                letterSpacing: '1px',
              }}
            >
              TECH STACK
            </span>
          </div>

          <span
            style={{
              fontSize: '9px',
              color: 'var(--phosphor-dark)',
              letterSpacing: '0.5px',
            }}
          >
            11 TOOLS
          </span>
        </div>

        {/* Technologies */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '7px',
          }}
        >
          {[
            'Python',
            'C++',
            'React',
            'Node.js',
            'Express',
            'FastAPI',
            'MongoDB',
            'MySQL',
            'OpenAI',
            'ChromaDB',
            'Git',
          ].map((tech) => (
            <span
              key={tech}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 8px',
                border: '1px solid var(--border-dim)',
                background: 'rgba(0,255,65,0.025)',
                color: 'var(--phosphor-mid)',
                fontSize: '10px',
                lineHeight: 1,
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  background: 'var(--phosphor)',
                  boxShadow: '0 0 4px var(--phosphor)',
                  flexShrink: 0,
                }}
              />

              {tech}
            </span>
          ))}
        </div>
      </div>


      {/* =================================================
          LINKS
      ================================================= */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: 'var(--phosphor-dim)',
            letterSpacing: '1px',
          }}
        >
          CONNECTIONS
        </div>

        <div
          style={{
            fontSize: '9px',
            color: 'var(--phosphor-dark)',
          }}
        >
          EXTERNAL
        </div>
      </div>

      <div
        className="flex flex-wrap"
        style={{
          gap: '8px',
        }}
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            download={link.download}
            className={`retro-btn ${link.variant}`}
            style={{
              flex: 1,
              minWidth: '130px',
              textAlign: 'center',
              fontSize: '10px',
              padding: '9px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            {link.label} {link.download ? '↓' : '↗'}
          </a>
        ))}
      </div>


      {/* =================================================
          ANIMATION
      ================================================= */}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 7px var(--phosphor-hot);
          }

          50% {
            opacity: 0.35;
            box-shadow: 0 0 2px var(--phosphor-hot);
          }
        }

        .retro-scroll > div {
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .retro-scroll > div:hover {
          border-color: var(--border-mid);
        }
      `}</style>
    </div>
  );
};

export default AboutApp;