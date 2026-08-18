import React from 'react';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiReact,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiTailwindcss,
  SiDocker,
  SiRedis,
  SiPostman,
  SiGit,
  SiLinux,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
} from 'react-icons/si';

import {
  Cpu,
  Terminal,
  Database,
  Globe,
  Layers,
  Code2,
  Activity,
  Flame,
  Network,
  Workflow,
} from 'lucide-react';

interface SkillEntry {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  color: string;
  categoryIcon: React.ReactNode;
  skills: SkillEntry[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-llm',
    title: 'CORE AI & LLM ENGINEERING',
    color: 'var(--phosphor, #00ff65)',
    categoryIcon: <Cpu size={16} />,
    skills: [
      {
        name: 'RAG Pipelines (Dense + Sparse Search)',
        level: 95,
        icon: <Workflow size={13} />,
      },
      {
        name: 'BM25 & Reciprocal Rank Fusion (RRF)',
        level: 92,
        icon: <Layers size={13} />,
      },
      {
        name: 'Vector DBs (ChromaDB, FAISS, Qdrant)',
        level: 90,
        icon: <Database size={13} />,
      },
      {
        name: 'Cross-Encoder Reranking & LLM-Judge',
        level: 88,
        icon: <Activity size={13} />,
      },
      {
        name: 'LangChain, LangGraph & LlamaIndex',
        level: 90,
        icon: <Network size={13} />,
      },
      {
        name: 'Fine-Tuning (LoRA), Ollama & OpenAI',
        level: 86,
        icon: <Flame size={13} />,
      },
    ],
  },

  {
    id: 'languages-ml',
    title: 'LANGUAGES & ML FRAMEWORKS',
    color: 'var(--amber, #ffb000)',
    categoryIcon: <Code2 size={16} />,
    skills: [
      {
        name: 'C++ (Primary Language)',
        level: 94,
        icon: <SiCplusplus size={13} />,
      },
      {
        name: 'Python (PyTorch / Data Science)',
        level: 92,
        icon: <SiPython size={13} />,
      },
      {
        name: 'JavaScript (ES6+) & TypeScript',
        level: 90,
        icon: <SiTypescript size={13} />,
      },
      {
        name: 'SQL & Database Optimization',
        level: 88,
        icon: <Database size={13} />,
      },
      {
        name: 'Java & Algorithms',
        level: 82,
        icon: <Code2 size={13} />,
      },
      {
        name: 'Scikit-Learn, Pandas, NumPy',
        level: 88,
        icon: <SiScikitlearn size={13} />,
      },
    ],
  },

  {
    id: 'fullstack-web',
    title: 'FULL-STACK & DISTRIBUTED WEB',
    color: 'var(--phosphor-hot, #39ff14)',
    categoryIcon: <Globe size={16} />,
    skills: [
      {
        name: 'React.js & Redux',
        level: 92,
        icon: <SiReact size={13} />,
      },
      {
        name: 'Node.js & Express.js Microservices',
        level: 90,
        icon: <SiNodedotjs size={13} />,
      },
      {
        name: 'FastAPI REST Services',
        level: 92,
        icon: <SiFastapi size={13} />,
      },
      {
        name: 'Tailwind CSS & Modern UIs',
        level: 90,
        icon: <SiTailwindcss size={13} />,
      },
      {
        name: 'WebSockets & Real-Time Streaming',
        level: 85,
        icon: <Network size={13} />,
      },
      {
        name: 'Docker & Microservices Architecture',
        level: 86,
        icon: <SiDocker size={13} />,
      },
    ],
  },

  {
    id: 'db-tooling',
    title: 'DATABASES & TOOLING',
    color: 'var(--phosphor-mid, #00cc52)',
    categoryIcon: <Terminal size={16} />,
    skills: [
      {
        name: 'MongoDB, PostgreSQL & MySQL',
        level: 88,
        icon: <SiPostgresql size={13} />,
      },
      {
        name: 'Git & Linux (Bash Shell)',
        level: 92,
        icon: <SiLinux size={13} />,
      },
      {
        name: 'Docker Compose & CDN Tuning',
        level: 88,
        icon: <SiDocker size={13} />,
      },
      {
        name: 'Redis Caching & Auth Pipelines',
        level: 85,
        icon: <SiRedis size={13} />,
      },
      {
        name: 'Postman & API Benchmarking',
        level: 90,
        icon: <SiPostman size={13} />,
      },
    ],
  },
];

/* =========================================================
   TERMINAL BAR
========================================================= */

function renderBar(level: number): string {
  const total = 10;
  const filled = Math.round((level / 100) * total);
  const empty = total - filled;

  return '█'.repeat(filled) + '░'.repeat(empty);
}

/* =========================================================
   SKILL BAR
========================================================= */

const SkillBar: React.FC<{
  skill: SkillEntry;
  color: string;
}> = ({ skill, color }) => {
  return (
    <div
      style={{
        marginBottom: '11px',
      }}
    >
      {/* Skill name + percentage */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            minWidth: 0,
          }}
        >
          <span
            style={{
              color,
              display: 'flex',
              alignItems: 'center',
              opacity: 0.9,
              flexShrink: 0,
            }}
          >
            {skill.icon}
          </span>

          <span
            style={{
              fontSize: '11px',
              color: 'var(--phosphor-mid, #a3fba3)',
              fontFamily: 'var(--font-mono, monospace)',
              lineHeight: 1.4,
            }}
          >
            {skill.name}
          </span>
        </div>

        <span
          style={{
            fontSize: '10px',
            color,
            fontFamily: 'var(--font-mono, monospace)',
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Single terminal-style proficiency bar */}
      <div
        style={{
          paddingLeft: '20px',
          fontSize: '10px',
          color,
          textShadow: `0 0 6px ${color}`,
          letterSpacing: '1px',
          fontFamily: 'var(--font-mono, monospace)',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        [{renderBar(skill.level)}]
      </div>
    </div>
  );
};

/* =========================================================
   SKILLS APP
========================================================= */

const SkillsApp: React.FC = () => {
  const allSkills = SKILL_CATEGORIES.flatMap(
    (category) => category.skills
  );

  const totalSkills = allSkills.length;

  const avgLevel = Math.round(
    allSkills.reduce(
      (acc, skill) => acc + skill.level,
      0
    ) / totalSkills
  );

  return (
    <div
      className="h-full retro-scroll"
      style={{
        padding: '14px',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border-mid, #00ff6544)',
          borderLeft: '2px solid var(--phosphor, #00ff65)',
          padding: '11px 14px',
          marginBottom: '16px',
          background:
            'linear-gradient(90deg, rgba(0,255,65,0.045), rgba(0,255,65,0.015))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {/* Header content */}
        <div>
          <div
            className="font-vt323 text-2xl text-p text-glow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--phosphor-hot, #39ff14)',
            }}
          >
            <Terminal size={18} />

            SKILLS.DLL
          </div>

          <div
            style={{
              color: 'var(--phosphor-dim, #00aa44)',
              fontSize: '10px',
              marginTop: '2px',
              letterSpacing: '0.4px',
            }}
          >
            TECHNICAL PROFICIENCY · {totalSkills} SKILLS INDEXED
          </div>
        </div>

        {/* Overall score */}
        <div
          style={{
            textAlign: 'right',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              color: 'var(--phosphor-dim, #00aa44)',
              fontSize: '9px',
              letterSpacing: '0.8px',
            }}
          >
            OVERALL
          </div>

          <div
            className="font-vt323 text-glow"
            style={{
              color: 'var(--phosphor-hot, #39ff14)',
              fontSize: '26px',
              lineHeight: 1,
            }}
          >
            {avgLevel}%
          </div>
        </div>
      </div>

      {/* =====================================================
          CATEGORY GRID
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            style={{
              position: 'relative',
              border: `1px solid var(--border-mid, #00ff6533)`,
              padding: '13px',
              background:
                'linear-gradient(145deg, rgba(0,20,0,0.55), rgba(0,0,0,0.3))',
              boxShadow:
                'inset 0 0 20px rgba(0,255,65,0.015)',
            }}
          >
            {/* ================================================
                CATEGORY HEADER
            ================================================= */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '13px',
                paddingBottom: '9px',
                borderBottom:
                  '1px solid var(--border-dim, #00ff6522)',
              }}
            >
              {/* Icon + title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  minWidth: 0,
                }}
              >
                {/* Actual category icon */}
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${cat.color}`,
                    color: cat.color,
                    background:
                      'rgba(0,255,65,0.035)',
                    boxShadow:
                      `0 0 7px ${cat.color}22`,
                    flexShrink: 0,
                  }}
                >
                  {cat.categoryIcon}
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    color: cat.color,
                    textShadow:
                      `0 0 8px ${cat.color}`,
                    lineHeight: 1.3,
                  }}
                >
                  {cat.title}
                </span>
              </div>

              {/* Skill count */}
              <span
                style={{
                  fontSize: '9px',
                  color:
                    'var(--phosphor-dark, #007a32)',
                  fontFamily:
                    'var(--font-mono, monospace)',
                  flexShrink: 0,
                }}
              >
                {cat.skills.length
                  .toString()
                  .padStart(2, '0')}
              </span>
            </div>

            {/* ================================================
                SKILLS
            ================================================= */}

            <div>
              {cat.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  color={cat.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          FOOTER STATUS
      ===================================================== */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '14px',
          paddingTop: '9px',
          borderTop:
            '1px dashed var(--border-dim, #00ff6522)',
          color:
            'var(--phosphor-dark, #007a32)',
          fontSize: '9px',
        }}
      >
        <span>
          SKILLS INDEX // {totalSkills} ENTRIES
        </span>

        <span>
          STATUS: ACTIVE
        </span>
      </div>
    </div>
  );
};

export default SkillsApp;