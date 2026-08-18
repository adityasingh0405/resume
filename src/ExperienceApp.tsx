import React from 'react';
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Code2,
  BrainCircuit,
  ArrowUpRight,
} from 'lucide-react';

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  color: string;
  icon: React.ElementType;
  highlights: string[];
  stack: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    id: '01',
    role: 'Software Engineering Intern',
    company: 'Synergy Telecom',
    period: 'May 2024 — Present',
    type: 'MERN',
    color: 'var(--phosphor)',
    icon: Code2,

    highlights: [
      'Built production MERN applications for inventory, sales and internal business workflows.',
      'Developed REST APIs with JWT authentication, role-based access and optimized database queries.',
      'Created responsive interfaces connecting product, stock and sales operations.',
    ],

    stack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'REST APIs',
      'JWT',
    ],
  },

  {
    id: '02',
    role: 'AI Engineering Intern',
    company: 'Synergy Telecom',
    period: 'May 2024 — Present',
    type: 'Hybrid RAG',
    color: 'var(--amber)',
    icon: BrainCircuit,

    highlights: [
      'Architected a hybrid RAG system for querying internal company documents and knowledge bases.',
      'Built ingestion pipelines for PDFs, Markdown and HTML with recursive chunking and embeddings.',
      'Combined ChromaDB vector retrieval with BM25 keyword search using Reciprocal Rank Fusion.',
    ],

    stack: [
      'Python',
      'FastAPI',
      'ChromaDB',
      'BM25',
      'Embeddings',
      'RRF',
    ],
  },

  {
    id: '03',
    role: 'Full-Stack MERN Intern',
    company: 'Glory Education Center',
    period: 'Jul 2026 — Present',
    type: 'MERN',
    color: 'var(--phosphor)',
    icon: Briefcase,

    highlights: [
      'Developed and deployed the institution website with a responsive multi-page React architecture.',
      'Built reusable components, course pages, contact workflows and SEO-ready page structures.',
      'Handled production deployment, domain configuration, analytics and automated testing.',
    ],

    stack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'SEO',
      'Netlify',
    ],
  },
];

const ExperienceApp: React.FC = () => {
  return (
    <div
      className="h-full retro-scroll"
      style={{
        padding: '18px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        style={{
          marginBottom: '22px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-mid)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '20px',
        }}
      >
        <div>
          <div
            className="font-vt323 text-3xl text-p text-glow"
            style={{
              letterSpacing: '2px',
            }}
          >
            XPERIENCE.LOG
          </div>

          <div
            style={{
              marginTop: '4px',
              color: 'var(--phosphor-dim)',
              fontSize: '10px',
            }}
          >
            Selected work, engineering and things built along the way.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            color: 'var(--phosphor)',
            fontSize: '9px',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            className="blink"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--phosphor)',
              boxShadow: '0 0 8px var(--phosphor)',
            }}
          />

          CURRENTLY ACTIVE
        </div>
      </header>

      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <div
        style={{
          position: 'relative',
        }}
      >
        {/* Timeline */}
        <div
          style={{
            position: 'absolute',
            left: '15px',
            top: '18px',
            bottom: '18px',
            width: '1px',
            background:
              'linear-gradient(to bottom, var(--phosphor), var(--amber), var(--phosphor))',
            opacity: 0.35,
          }}
        />

        {EXPERIENCE.map((exp, index) => {
          const Icon = exp.icon;

          return (
            <div
              key={exp.id}
              style={{
                position: 'relative',
                paddingLeft: '42px',
                marginBottom:
                  index === EXPERIENCE.length - 1
                    ? '0'
                    : '22px',
              }}
            >
              {/* Timeline marker */}

              <div
                style={{
                  position: 'absolute',
                  left: '7px',
                  top: '19px',
                  width: '17px',
                  height: '17px',
                  border: `1px solid ${exp.color}`,
                  background: 'var(--void)',
                  transform: 'rotate(45deg)',
                  boxShadow: `0 0 10px ${exp.color}`,
                  zIndex: 2,
                }}
              />

              <Icon
                size={8}
                color={exp.color}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '24px',
                  zIndex: 3,
                }}
              />

              {/* =================================================
                  CARD
              ================================================== */}

              <div
                style={{
                  position: 'relative',
                  border: '1px solid var(--border-mid)',
                  background: 'var(--window-bg)',
                  overflow: 'hidden',
                  transition:
                    'transform .2s ease, border-color .2s ease, box-shadow .2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform =
                    'translateX(4px)';

                  e.currentTarget.style.borderColor =
                    exp.color;

                  e.currentTarget.style.boxShadow =
                    `0 0 18px rgba(0,255,65,.06)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform =
                    'translateX(0)';

                  e.currentTarget.style.borderColor =
                    'var(--border-mid)';

                  e.currentTarget.style.boxShadow =
                    'none';
                }}
              >
                {/* Accent rail */}

                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: exp.color,
                    boxShadow: `0 0 10px ${exp.color}`,
                  }}
                />

                <div
                  style={{
                    padding: '16px 18px 15px 20px',
                  }}
                >
                  {/* =================================================
                      CARD HEADER
                  ================================================== */}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      {/* Type badge */}

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 7px',
                          marginBottom: '7px',
                          border: `1px solid ${exp.color}`,
                          color: exp.color,
                          fontSize: '8px',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }}
                      >
                        <span
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: exp.color,
                            boxShadow:
                              `0 0 5px ${exp.color}`,
                          }}
                        />

                        {exp.type}
                      </div>

                      {/* Role */}

                      <div
                        className="font-vt323"
                        style={{
                          fontSize: '24px',
                          lineHeight: '1',
                          color: exp.color,
                          textShadow:
                            `0 0 8px ${exp.color}`,
                          letterSpacing: '1px',
                        }}
                      >
                        {exp.role}
                      </div>

                      {/* Company */}

                      <div
                        style={{
                          marginTop: '5px',
                          fontSize: '12px',
                          color: 'var(--phosphor-mid)',
                        }}
                      >
                        {exp.company}
                      </div>
                    </div>

                    {/* Date */}

                    <div
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        paddingTop: '5px',
                        color: 'var(--phosphor-dim)',
                        fontSize: '9px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Calendar size={11} />

                      {exp.period}
                    </div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div
                    style={{
                      marginTop: '14px',
                      paddingTop: '12px',
                      borderTop:
                        '1px solid var(--border-dim)',
                      display: 'grid',
                      gridTemplateColumns:
                        'minmax(0, 1fr) 150px',
                      gap: '18px',
                    }}
                  >
                    {/* Highlights */}

                    <div>
                      <div
                        style={{
                          marginBottom: '7px',
                          color:
                            'var(--phosphor-dark)',
                          fontSize: '8px',
                          letterSpacing: '1px',
                        }}
                      >
                        KEY WORK
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gap: '7px',
                        }}
                      >
                        {exp.highlights.map(
                          (highlight, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems:
                                  'flex-start',
                              }}
                            >
                              <ChevronRight
                                size={11}
                                color={exp.color}
                                style={{
                                  flexShrink: 0,
                                  marginTop: '2px',
                                }}
                              />

                              <span
                                style={{
                                  color:
                                    'var(--phosphor-mid)',
                                  fontSize: '10px',
                                  lineHeight: '1.5',
                                }}
                              >
                                {highlight}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Stack panel */}

                    <div
                      style={{
                        borderLeft:
                          '1px solid var(--border-dim)',
                        paddingLeft: '14px',
                      }}
                    >
                      <div
                        style={{
                          marginBottom: '8px',
                          color:
                            'var(--phosphor-dark)',
                          fontSize: '8px',
                          letterSpacing: '1px',
                        }}
                      >
                        STACK
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '5px',
                        }}
                      >
                        {exp.stack.map(tech => (
                          <span
                            key={tech}
                            style={{
                              padding:
                                '3px 6px',
                              border:
                                '1px solid var(--border-dim)',
                              background:
                                'rgba(0,10,2,.8)',
                              color:
                                'var(--phosphor-dim)',
                              fontSize: '8px',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM LINE
                  ================================================== */}

                  <div
                    style={{
                      marginTop: '13px',
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'center',
                      color:
                        'var(--phosphor-dark)',
                      fontSize: '7px',
                    }}
                  >
                    <span>
                      0{exp.id} / {exp.company.toUpperCase()}
                    </span>

                    <ArrowUpRight
                      size={11}
                      color={exp.color}
                    />
                  </div>
                </div>

                {/* Corner detail */}

                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '18px',
                    height: '18px',
                    borderLeft:
                      '1px solid var(--border-dim)',
                    borderTop:
                      '1px solid var(--border-dim)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        style={{
          marginTop: '20px',
          paddingTop: '10px',
          borderTop:
            '1px solid var(--border-dim)',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'var(--phosphor-dark)',
          fontSize: '8px',
        }}
      >
        <span>
          EXPERIENCE // {EXPERIENCE.length} ENTRIES
        </span>

        <span>
          END OF LOG
        </span>
      </div>
    </div>
  );
};

export default ExperienceApp;