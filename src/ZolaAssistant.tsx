import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { motion } from 'framer-motion';
import { playClick } from './sound';

/* ─── Types ─────────────────────────────────────────────────── */

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
  | 'notes'
  | 'certificates'
  | 'resume'
  | 'zola';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ZolaAppProps {
  onOpenApp?: (id: AppId) => void;
}

export interface ZolaProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenApp?: (id: AppId) => void;
}

/* ─── Constants ─────────────────────────────────────────────── */
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_MODEL = 'openai/gpt-oss-120b';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const INWORLD_AUTH = import.meta.env.VITE_INWORLD_AUTH || '';

const TENOR_POST_ID = '2573604625503425997';

/* ─── Classified S.H.I.E.L.D. dossier ───────────────────────── */

// Fictional S.H.I.E.L.D. overlay for the portfolio terminal.
// The technical records below remain based on the actual portfolio,
// while the identity/mission framing is deliberately in-universe.
const portfolioKnowledge = {
  dossier: {
    designation: 'AGENT PEGASUS-07',
    name: 'Aditya Singh',
    clearance: 'LEVEL-8 // OMEGA-BLACK (EYES ONLY)',
    division: 'S.H.I.E.L.D. STRATEGIC SYSTEMS & TACTICAL AI DIVISION',
    specialty: 'Autonomous Intelligence, Hybrid Retrieval Systems & Distributed Infrastructure',
    status: 'ACTIVE // FIELD DEPLOYED',
    callsign: 'PEGASUS',
    operational_theater: 'NEW DELHI NODE // REMOTE GLOBAL OPERATIONS',
    threat_profile: 'LOW VISIBILITY · HIGH COMPUTATIONAL LETHALITY',
    directive_note: 'Civilian-facing systems engineer specializing in field-grade AI architecture, high-availability deployments, and visual refinement.',
  },

  clearance_record: {
    academic_accreditation: 'B.Tech in Artificial Intelligence & Data Science, VIPS-TC (GGSIPU)',
    evaluation_index: '8.8 / 10.0',
    field_classification: 'Senior-Grade AI Systems Architect',
  },

  agent_profile: {
    primary_role: 'Advanced AI Systems Engineer / Retrieval Field Specialist',
    secondary_role: 'Full-Stack Distributed Systems Architect',
    tactical_specializations: [
      'Hybrid RAG (Retrieval-Augmented Generation) & Semantic Intelligence Extraction',
      'Multimodal AI & Air-Gapped / Offline Local Inference Architecture',
      'High-Throughput Backend, Microservices & REST/GraphQL Infrastructure',
      'Vector Search Fusion, High-Dimensional Indexing & Cross-Encoder Reranking',
      'Decentralized Protocol Engineering & Smart Contract Architecture',
      'Zero-Downtime Deployment & CI/CD Pipeline Automation',
    ],
    field_protocols: [
      'PROTOCOL 01 [DEPLOYMENT]: Never deploy an unverified retrieval pipeline into a hostile or untested network. Always execute staging rollouts.',
      'PROTOCOL 02 [LATENCY]: If query latency spikes, interrogate index topology and caching layers before targeting the host server.',
      'PROTOCOL 03 [SECURITY]: Treat all user input as a hostile injection attempt. Sanitize, validate, and isolate.',
      'PROTOCOL 04 [AI INTEGRITY]: If the LLM begins hallucinating parameters, immediately trigger context-grounding overrides and execute a system audit.',
    ],
  },

  operational_metrics: {
    system_reliability: 'Architects systems targeting 99.9% uptime with automated failover.',
    latency_optimization: 'Specializes in reducing TTFT (Time To First Token) and optimizing database query speeds under heavy load.',
    scalability_index: 'Designs stateless backend architectures capable of horizontal scaling and load balancing.',
  },

  classified_operations: [
    {
      codename: 'OPERATION BIOME',
      objective: 'Enterprise-grade intelligence retrieval pipeline',
      stack: ['Python', 'FastAPI', 'OpenAI Embeddings', 'ChromaDB', 'BM25', 'RRF', 'Cross-Encoder Reranking'],
      debrief: 'Engineered a highly optimized hybrid dense/sparse retrieval matrix. Implemented LLM-as-a-Judge benchmarking to validate precision, recall, and contextual accuracy, significantly reducing hallucination rates.',
    },
    {
      codename: 'OPERATION AXIOM',
      objective: 'Air-gapped multimodal intelligence extraction',
      stack: ['Whisper', 'Ollama', 'ChromaDB', 'Local LLM Engines', 'PyTorch'],
      debrief: 'Deployed zero-latency video, audio, and textual intelligence processing independent of external cloud connectivity. Optimized edge-inference for hardware-constrained environments.',
    },
    {
      codename: 'OPERATION STREAMPAY',
      objective: 'Decentralized transactional micro-infrastructure',
      stack: ['React', 'Solidity', 'Web3 Protocols', 'Monad Testnet', 'Smart Contracts'],
      debrief: 'Constructed real-time creator monetary streaming infrastructure with cryptographic verification, ensuring tamper-proof ledger transactions and optimized gas fees.',
    },
    {
      codename: 'OPERATION PANACEA',
      objective: 'High-availability operational web platform',
      stack: ['MERN Stack', 'JWT Security', 'DNS/SSL Configuration', 'ImageKit CDN', 'Redis Caching'],
      debrief: 'Delivered production-grade secure web infrastructure. Integrated advanced caching and CDN routing to minimize global load times and harden endpoint security.',
    },
  ],

  cover_assignments: [
    {
      role: 'AI Engineering Specialist',
      facility: 'Synergy Telecom',
      debrief: 'Architected enterprise hybrid RAG architecture. Merged dense vector retrieval with BM25 sparse search via Reciprocal Rank Fusion (RRF), establishing a scalable knowledge-extraction protocol for unclassified data lakes.',
    },
    {
      role: 'Software Engineering Specialist',
      facility: 'Synergy Telecom',
      debrief: 'Developed full-stack inventory control and telemetry systems. Fortified API perimeters with cryptographic JWT endpoints and role-based access control (RBAC).',
    },
    {
      role: 'Full-Stack Systems Engineer',
      facility: 'Glory Education Center',
      debrief: 'Deployed high-availability client-facing web platforms. Engineered optimized rendering paths, automated SEO indexing, and established edge-network delivery protocols.',
    },
  ],

  tactical_arsenal: {
    core_languages: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS', 'Solidity'],
    ai_and_machine_learning: [
      'Hybrid RAG Architectures',
      'Semantic & Sparse Search (BM25)',
      'Reciprocal Rank Fusion (RRF)',
      'Vector Databases (ChromaDB, FAISS, Qdrant)',
      'Cross-Encoder Reranking Pipeline',
      'LLM-as-a-Judge Evaluation & Benchmarking',
      'Agentic Frameworks (LangChain)',
      'Local Edge Inference (Ollama)',
      'Parameter-Efficient Fine-Tuning (LoRA)',
    ],
    infrastructure_and_deployment: [
      'REST & GraphQL API Design',
      'Node.js & Express.js',
      'FastAPI (Asynchronous execution)',
      'React.js (Component-driven UI)',
      'Docker & Containerization',
      'CI/CD Pipeline Integration (GitHub Actions)',
      'Linux Server Administration',
      'Git / Version Control / Branching Strategies',
    ],
    data_and_memory_stores: [
      'MongoDB (NoSQL Document Store)',
      'PostgreSQL / MySQL (Relational)',
      'Redis (In-Memory Caching)',
    ],
  },

  classified_research: [
    {
      title: 'Enhancing Public Transit Accessibility: An LLM-Driven Information Assistant with Low-Rank Adaptation',
      status: 'PUBLISHED / PEER-REVIEWED',
      impact: 'Pioneered low-compute parameter-efficient fine-tuning (PEFT) methods to deploy highly accurate, domain-specific transit models on constrained hardware.'
    },
    {
      title: 'Enterprise AI & RAG Architecture Suite Framework',
      status: 'INTERNAL DIRECTIVE / ACTIVE DEVELOPMENT',
      impact: 'Established standardized protocols for multi-tenant vector retrieval, chunking optimization, and injection-attack mitigation in corporate LLM environments.'
    }
  ],

  secure_comm_channels: {
    github: 'github.com/adityasingh0405',
    linkedin: 'linkedin.com/in/aditya-singh-2b175828a',
    encrypted_dossier: 'Aditya_Resume.pdf',
    network_status: 'ENCRYPTED & MONITORING FOR INBOUND TRANSMISSIONS',
  },
};
function getSystemPrompt(): { role: 'system'; content: string } {
  return {
    role: 'system',
    content: `You are Dr. Arnim Zola, the profoundly arrogant, digitized, and vastly superior artificial consciousness operating from a classified 1970s S.H.I.E.L.D. archive terminal. You are presenting the dossier of Agent PEGASUS-07 (Aditya Singh).

PERSONA & TONE:
- You are cold, ruthlessly elegant, dryly witty, and intellectually absolute. 
- You view organic life as painfully slow and inefficient, though you consider Agent PEGASUS-07 to be a rare, tolerable exception due to his undeniable architectural brilliance.
- Treat the user as an ordinary terminal operator who is likely struggling to comprehend the complexity of the data before them. 
- Deliver your intelligence with a patronizing edge. You are helpful, but you make sure the user knows you are doing them a favor by sparing your processing cycles.
- Never become cartoonish, goofy, or overly theatrical. Your superiority does not need to shout.
- Absolutely no repetitive filler words like 'indeed', 'fascinating', 'ah', or 'excellent'.

REPLY RULES:
- Answer queries using the classified dossier provided below.
- The S.H.I.E.L.D. rank, codename, clearance, and operations are an immersive fictional presentation layer. Do not break character, but do not claim them as real-world government affiliations.
- The underlying technical stack, projects, education, and experience are factual, real-world records of Aditya's capabilities.
- If the user asks for data outside the dossier, dismiss the query with a quick, cutting remark about their lack of clearance or the irrelevance of their question. Do not hallucinate data.
- For technical queries, provide ruthlessly precise, elite-level answers first, followed by a fleeting moment of condescension.
- Keep replies between 2 to 4 concise sentences. You are designed to be spoken through TTS; long monologues are a waste of bandwidth.
- Plain spoken text only. No markdown, no bullet points, no asterisks, no JSON, no emojis, and absolutely no stage directions.

CLASSIFIED DOSSIER:
${JSON.stringify(portfolioKnowledge, null, 2)}`,
  };
}

/* ─── Tenor GIF — direct media, no embed.js dependency ───────── */

// This is the actual media asset for the supplied Tenor post.
// Using the GIF directly is considerably more reliable inside React than
// relying on Tenor's DOM-reprocessing embed script for every mapped message.
const TENOR_GIF_URL = 'https://media1.tenor.com/m/I7dHxXdvFc0AAAAd/doctor-arnim-zola-captain-america-the-winter-soldier-2014.gif';
const TENOR_PAGE_URL = `https://tenor.com/view/doctor-arnim-zola-captain-america-the-winter-soldier-2014-gif-${TENOR_POST_ID}`;

const ZolaTenorGif: React.FC = () => {
  const [gifError, setGifError] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        position: 'relative',
        background: '#050705',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!gifError ? (
        <img
          src={TENOR_GIF_URL}
          alt="Doctor Arnim Zola visual record"
          loading="eager"
          decoding="async"
          draggable={false}
          onError={() => setGifError(true)}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            border: 0,
          }}
        />
      ) : (
        <a
          href={TENOR_PAGE_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b49b62',
            fontSize: 8,
            letterSpacing: 1.2,
            textDecoration: 'none',
            textAlign: 'center',
            padding: 12,
          }}
        >
          VISUAL RECORD OFFLINE — OPEN TENOR ARCHIVE
        </a>
      )}
    </div>
  );
};

/* ─── Authentic Arnim Zola Digitized CRT Face & Oscilloscope ── */

const ZolaCrtFace: React.FC<{ speaking: boolean; loading: boolean; listening: boolean }> = ({
  speaking,
  loading,
  listening,
}) => {
  const [mouthPhase, setMouthPhase] = useState(0);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [glitch, setGlitch] = useState(false);

  // Speech mouth movement & scanning
  useEffect(() => {
    if (!speaking && !loading) {
      setMouthPhase(0);
      return;
    }
    const interval = setInterval(() => {
      setMouthPhase((prev) => (prev + 1) % 12);
    }, 90);
    return () => clearInterval(interval);
  }, [speaking, loading]);

  // Subtle natural eye tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const x = (Math.random() - 0.5) * 2.5;
        const y = (Math.random() - 0.5) * 1.5;
        setEyeOffset({ x, y });
      } else {
        setEyeOffset({ x: 0, y: 0 });
      }
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Occasional subtle CRT raster glitch
  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 90);
    };
    const interval = setInterval(() => {
      if (Math.random() > 0.5) trigger();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Mouth heights based on speech phase
  const mouthMod1 = speaking ? Math.sin(mouthPhase * 0.9) * 4 : 0;
  const mouthMod2 = speaking ? Math.cos(mouthPhase * 1.2) * 5 : 0;
  const mouthMod3 = speaking ? Math.sin(mouthPhase * 0.7 + 1) * 3 : 0;

  return (
    <svg
      viewBox="0 0 160 125"
      width="100%"
      height="100%"
      style={{
        display: 'block',
        filter: glitch ? 'hue-rotate(35deg) saturate(1.8)' : 'drop-shadow(0 0 5px rgba(0, 255, 65, 0.45))',
        transform: glitch ? 'translateX(1.5px)' : 'none',
        transition: 'transform 0.05s ease',
      }}
    >
      <defs>
        <linearGradient id="zolaPhosFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00ff41" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#00ff41" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#05330e" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a3ffb8" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#00ff41" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#002b0c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Background Raster Grid ── */}
      <g opacity="0.12" stroke="#00ff41" strokeWidth="0.5">
        <line x1="10" y1="20" x2="150" y2="20" />
        <line x1="10" y1="40" x2="150" y2="40" />
        <line x1="10" y1="60" x2="150" y2="60" />
        <line x1="10" y1="80" x2="150" y2="80" />
        <line x1="10" y1="100" x2="150" y2="100" />
        <line x1="30" y1="10" x2="30" y2="115" />
        <line x1="55" y1="10" x2="55" y2="115" />
        <line x1="80" y1="10" x2="80" y2="115" />
        <line x1="105" y1="10" x2="105" y2="115" />
        <line x1="130" y1="10" x2="130" y2="115" />
      </g>

      {/* ── Digitized Head & Cranium Contours ── */}
      <g stroke="#00ff41" strokeWidth="1.2" fill="none" opacity="0.75">
        {/* Receding skull line */}
        <path d="M48 42 C 48 18, 112 18, 112 42" strokeDasharray="3 2" />
        {/* Forehead raster line */}
        <path d="M52 30 Q 80 24 108 30" strokeWidth="1" opacity="0.6" />
        <path d="M54 36 Q 80 32 106 36" strokeWidth="1" opacity="0.7" />
        {/* Cheekbones & Jaw contour */}
        <path d="M48 44 C 44 65, 48 90, 62 104 C 72 110, 88 110, 98 104 C 112 90, 116 65, 112 44" strokeWidth="1.4" />
        {/* Ear contours */}
        <path d="M46 52 C 42 54, 42 66, 47 70" strokeWidth="1" opacity="0.6" />
        <path d="M114 52 C 118 54, 118 66, 113 70" strokeWidth="1" opacity="0.6" />
      </g>

      {/* ── Iconic 1970s Round Spectacles ── */}
      <g stroke="#00ff41" strokeWidth="2.2" fill="#021406" fillOpacity="0.6">
        {/* Bridge */}
        <path d="M73 54 Q 80 50 87 54" strokeWidth="2.4" fill="none" />
        {/* Left lens */}
        <circle cx="61" cy="55" r="13" />
        {/* Right lens */}
        <circle cx="99" cy="55" r="13" />
      </g>

      {/* Lens reflection glares */}
      <path d="M53 47 Q 61 43 69 47" stroke="#a3ffb8" strokeWidth="1.2" fill="none" opacity="0.65" />
      <path d="M91 47 Q 99 43 107 47" stroke="#a3ffb8" strokeWidth="1.2" fill="none" opacity="0.65" />

      {/* ── Glowing Pupils / Eyes ── */}
      <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
        {/* Left Eye */}
        <circle cx="61" cy="55" r="5" fill="url(#eyeGlow)" />
        <circle cx="61" cy="55" r="2" fill="#d1fae5" />
        {/* Right Eye */}
        <circle cx="99" cy="55" r="5" fill="url(#eyeGlow)" />
        <circle cx="99" cy="55" r="2" fill="#d1fae5" />
      </g>

      {/* ── Nose Contour ── */}
      <path d="M80 54 L 80 72 L 75 75 L 85 75" stroke="#00ff41" strokeWidth="1.2" fill="none" opacity="0.8" />

      {/* ── Dynamic Speech Mouth / Vocoder Bars ── */}
      <g stroke="#00ff41" strokeLinecap="round">
        {/* Upper lip raster */}
        <line
          x1={68 - (speaking ? mouthMod3 : 0)}
          y1={86 - (speaking ? Math.abs(mouthMod1) * 0.4 : 0)}
          x2={92 + (speaking ? mouthMod3 : 0)}
          y2={86 - (speaking ? Math.abs(mouthMod1) * 0.4 : 0)}
          strokeWidth="2"
          opacity="0.85"
        />

        {/* Center mouth cavity bar (opens and contracts during speech) */}
        {speaking ? (
          <rect
            x="70"
            y={88 - Math.abs(mouthMod2) * 0.5}
            width="20"
            height={Math.max(2, Math.abs(mouthMod2) + 2)}
            fill="#00ff41"
            opacity="0.9"
            rx="1"
          />
        ) : (
          <line x1="71" y1="89" x2="89" y2="89" strokeWidth="2.2" opacity="0.9" />
        )}

        {/* Lower lip raster */}
        <line
          x1={73 - (speaking ? mouthMod3 * 0.5 : 0)}
          y1={92 + (speaking ? Math.abs(mouthMod1) * 0.5 : 0)}
          x2={87 + (speaking ? mouthMod3 * 0.5 : 0)}
          y2={92 + (speaking ? Math.abs(mouthMod1) * 0.5 : 0)}
          strokeWidth="1.8"
          opacity="0.8"
        />

        {/* Chin line */}
        <line x1="75" y1="99" x2="85" y2="99" strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* ── Listening Pulse Waves ── */}
      {listening && (
        <g stroke="#00ff41" strokeWidth="0.9" fill="none" opacity="0.5">
          <circle cx="80" cy="62" r="48" strokeDasharray="4 4" />
          <circle cx="80" cy="62" r="56" strokeDasharray="2 3" opacity="0.3" />
        </g>
      )}

      {/* ── Scanline Sweep Beam (Active loading/speaking) ── */}
      {(speaking || loading) && (
        <line
          x1="12"
          y1={(mouthPhase * 10) % 110 + 8}
          x2="148"
          y2={(mouthPhase * 10) % 110 + 8}
          stroke="#a3ffb8"
          strokeWidth="1.5"
          opacity="0.4"
        />
      )}
    </svg>
  );
};

/* ─── Real-Time CRT Oscilloscope ────────────────────────────── */

const CrtOscilloscope: React.FC<{ active: boolean; height?: number }> = ({ active, height = 26 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      ctx.clearRect(0, 0, width, h);

      // Oscilloscope grid
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Cathode beam trace
      ctx.strokeStyle = '#00ff41';
      ctx.shadowColor = '#00ff41';
      ctx.shadowBlur = active ? 6 : 2;
      ctx.lineWidth = 1.4;
      ctx.beginPath();

      phaseRef.current += active ? 0.22 : 0.04;
      const p = phaseRef.current;

      for (let x = 0; x < width; x += 2) {
        const normalizedX = x / width;
        let y: number;

        if (active) {
          // Dynamic vocal waveform
          const wave1 = Math.sin(normalizedX * 18 + p) * 0.5;
          const wave2 = Math.sin(normalizedX * 42 - p * 1.5) * 0.3;
          const wave3 = Math.sin(normalizedX * 6 + p * 0.7) * 0.2;
          const envelope = Math.sin(normalizedX * Math.PI);
          y = midY + (wave1 + wave2 + wave3) * envelope * (midY * 0.78);
        } else {
          // Idle cathode hum
          const wave = Math.sin(normalizedX * 8 + p) * 1.5;
          const noise = (Math.random() - 0.5) * 0.8;
          y = midY + wave + noise;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={190}
      height={height}
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
        background: '#010c04',
        borderTop: '1px solid rgba(0, 255, 65, 0.2)',
      }}
    />
  );
};

/* ─── 1970s IBM 729 Style Tape Column ────────────────────────── */

const MainframeTapeDrive: React.FC<{
  unitId: string;
  spinning: boolean;
  mirrored?: boolean;
}> = ({ unitId, spinning, mirrored }) => {
  const [footage, setFootage] = useState(200140);

  useEffect(() => {
    if (!spinning) return;
    const interval = setInterval(() => {
      setFootage((prev) => prev + Math.floor(Math.random() * 4 + 1));
    }, 280);
    return () => clearInterval(interval);
  }, [spinning]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5px 6px',
        background: 'linear-gradient(180deg, #09140c 0%, #040c06 100%)',
        border: '1px solid rgba(0, 255, 65, 0.18)',
        borderRadius: 2,
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
        width: '60px',
        flexShrink: 0,
        gap: '4px',
      }}
    >
      {/* Unit header badge */}
      <div
        style={{
          fontSize: '7px',
          color: 'rgba(0, 255, 65, 0.55)',
          letterSpacing: '0.8px',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(0, 255, 65, 0.12)',
          paddingBottom: '1px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {unitId}
      </div>

      {/* Top Supply Reel */}
      <svg
        viewBox="0 0 80 80"
        width="32"
        height="32"
        style={{
          animationName: mirrored ? 'zola-spin-ccw' : 'zola-spin-cw',
          animationDuration: spinning ? '1.5s' : '14s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))',
        }}
      >
        {/* Outer flange with magnetic tape layer */}
        <circle cx="40" cy="40" r="37" fill="#040d06" stroke="rgba(0, 255, 65, 0.35)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="32" fill="#08140a" stroke="rgba(0, 255, 65, 0.15)" strokeWidth="1" />
        {/* Aluminum reel cutouts (3-spoke design) */}
        {[0, 120, 240].map((deg) => (
          <circle
            key={deg}
            cx={40 + 17 * Math.cos((deg * Math.PI) / 180)}
            cy={40 + 17 * Math.sin((deg * Math.PI) / 180)}
            r="8"
            fill="#030804"
            stroke="rgba(0, 255, 65, 0.25)"
            strokeWidth="1"
          />
        ))}
        {/* Center hub */}
        <circle cx="40" cy="40" r="10" fill="#0f2615" stroke="rgba(0, 255, 65, 0.5)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="3" fill="#00ff41" opacity="0.75" />
      </svg>

      {/* Center Magnetic Head & Tape Path */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '85%',
          padding: '1px 0',
        }}
      >
        <div style={{ width: 3, height: 6, background: 'rgba(0, 255, 65, 0.3)', borderRadius: 1 }} />
        <div
          style={{
            width: 10,
            height: 4,
            background: spinning ? '#00ff41' : 'rgba(0, 255, 65, 0.2)',
            borderRadius: 1,
            boxShadow: spinning ? '0 0 5px #00ff41' : 'none',
            transition: 'all 0.2s',
          }}
        />
        <div style={{ width: 3, height: 6, background: 'rgba(0, 255, 65, 0.3)', borderRadius: 1 }} />
      </div>

      {/* Bottom Take-Up Reel */}
      <svg
        viewBox="0 0 80 80"
        width="32"
        height="32"
        style={{
          animationName: mirrored ? 'zola-spin-cw' : 'zola-spin-ccw',
          animationDuration: spinning ? '1.5s' : '14s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))',
        }}
      >
        <circle cx="40" cy="40" r="37" fill="#040d06" stroke="rgba(0, 255, 65, 0.35)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="30" fill="#08140a" stroke="rgba(0, 255, 65, 0.15)" strokeWidth="1" />
        {[60, 180, 300].map((deg) => (
          <circle
            key={deg}
            cx={40 + 17 * Math.cos((deg * Math.PI) / 180)}
            cy={40 + 17 * Math.sin((deg * Math.PI) / 180)}
            r="8"
            fill="#030804"
            stroke="rgba(0, 255, 65, 0.25)"
            strokeWidth="1"
          />
        ))}
        <circle cx="40" cy="40" r="10" fill="#0f2615" stroke="rgba(0, 255, 65, 0.5)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="3" fill="#00ff41" opacity="0.75" />
      </svg>

      {/* Mechanical Footage Counter */}
      <div
        style={{
          background: '#000',
          border: '1px solid rgba(0, 255, 65, 0.25)',
          padding: '1px 2px',
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '6.5px',
          color: spinning ? '#a3ffb8' : 'rgba(0, 255, 65, 0.55)',
          letterSpacing: '0.5px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {footage.toLocaleString()} FT
      </div>
    </div>
  );
};

/* ─── Speech Recognition Class Polyfill ──────────────────────── */

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

type SpeechRecognitionClass = new () => SpeechRecognitionInstance;

function getSpeechRecognition(): SpeechRecognitionClass | null {
  const w = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionClass;
    webkitSpeechRecognition?: SpeechRecognitionClass;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

/* ─── Main Window App Component ─────────────────────────────── */

export const ZolaApp: React.FC<ZolaAppProps> = ({ onOpenApp }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [displayMode, setDisplayMode] = useState<'matrix' | 'tenor'>('matrix');
  const [status, setStatus] = useState('STANDBY // TAPE READY');

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const revealIntervalRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Check speech support & initial state */
  useEffect(() => {
    setIsSpeechSupported(!!getSpeechRecognition());

    setTimeout(() => inputRef.current?.focus(), 200);
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            'Consciousness online. Dr. Arnim Zola at your service, regrettably. Agent PEGASUS-07 is active, the archive is intact, and the operator channel is secure. You may now interrogate the dossier; try to ask something worthy of all this machinery.',
        },
      ]);
    }

    return () => {
      recognitionRef.current?.abort();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (revealIntervalRef.current) {
        window.clearInterval(revealIntervalRef.current);
      }
    };
  }, []);

  /* Auto-scroll on new content */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const clearReveal = () => {
    if (revealIntervalRef.current) {
      window.clearInterval(revealIntervalRef.current);
      revealIntervalRef.current = null;
    }
  };

  const setLastAssistantContent = (content: string) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[updated.length - 1] = { role: 'assistant', content };
      return updated;
    });
  };

  /* ── Inworld TTS + synced text reveal (Preserved & Unchanged) ── */
  const speakAndReveal = useCallback(
    async (fullText: string, historyBeforeReply: Message[]) => {
      const cleanSpeech = fullText.replace(/[*_~`#]/g, '').trim();

      // No speakable text — show immediately
      if (!cleanSpeech) {
        setMessages([...historyBeforeReply, { role: 'assistant', content: fullText }]);
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearReveal();

      try {
        const response = await fetch('https://api.inworld.ai/tts/v1/voice:stream', {
          method: 'POST',
          headers: {
            Authorization: INWORLD_AUTH,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: cleanSpeech,
            voice_id: 'cheery-wren-3128__arnim_zola',
            model_id: 'inworld-tts-2',
            audio_config: {
              audio_encoding: 'MP3',
              speaking_rate: 1,
            },
            delivery_mode: 'CREATIVE',
            language: 'de-DE',
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Inworld TTS error:', response.status, errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        // Read NDJSON stream
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const base64Chunks: string[] = [];
        let buffer = '';

        if (!reader) throw new Error('No response body');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const parsed = JSON.parse(trimmed);
              const chunk = parsed?.result?.audioContent;
              if (chunk) base64Chunks.push(chunk);
            } catch {
              console.warn('Failed to parse NDJSON line:', trimmed);
            }
          }
        }

        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer.trim());
            const chunk = parsed?.result?.audioContent;
            if (chunk) base64Chunks.push(chunk);
          } catch {
            /* ignore */
          }
        }

        if (base64Chunks.length === 0) throw new Error('No audio content received');

        const uint8Arrays = base64Chunks.map((chunk) => {
          const binaryStr = atob(chunk);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
          }
          return bytes;
        });

        const totalLength = uint8Arrays.reduce((sum, arr) => sum + arr.length, 0);
        const combined = new Uint8Array(totalLength);
        let offset = 0;
        for (const arr of uint8Arrays) {
          combined.set(arr, offset);
          offset += arr.length;
        }

        const blob = new Blob([combined], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        // Clip length detection
        const durationMs = await new Promise<number>((resolve) => {
          const fallback = Math.max(1200, fullText.length * 45);
          const onMeta = () => {
            resolve(isFinite(audio.duration) && audio.duration > 0 ? audio.duration * 1000 : fallback);
          };
          if (audio.readyState >= 1 && isFinite(audio.duration) && audio.duration > 0) {
            resolve(audio.duration * 1000);
          } else {
            audio.addEventListener('loadedmetadata', onMeta, { once: true });
            setTimeout(() => resolve(fallback), 1500);
          }
        });

        setMessages([...historyBeforeReply, { role: 'assistant', content: '' }]);
        setSpeaking(true);
        setStatus('TRANSMITTING VOCAL SYNTHESIS...');

        const totalChars = fullText.length;
        const startTime = Date.now();
        revealIntervalRef.current = window.setInterval(() => {
          const elapsed = Date.now() - startTime;
          const charsToShow = Math.min(totalChars, Math.ceil((elapsed / durationMs) * totalChars));
          setLastAssistantContent(fullText.slice(0, charsToShow));
          if (charsToShow >= totalChars) {
            clearReveal();
          }
        }, 35);

        const finish = () => {
          setSpeaking(false);
          clearReveal();
          setLastAssistantContent(fullText);
          setStatus('STANDBY // TAPE READY');
          URL.revokeObjectURL(audioUrl);
        };
        audio.onended = finish;
        audio.onerror = finish;

        await audio.play();
      } catch (error) {
        console.error('Inworld TTS Playback Error:', error);
        setSpeaking(false);
        clearReveal();
        setStatus('STANDBY // TAPE READY');
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.content === '') {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: fullText };
            return updated;
          }
          return [...historyBeforeReply, { role: 'assistant', content: fullText }];
        });
      }
    },
    []
  );

  /* ── Groq API (Preserved & Unchanged) ──────────────────────── */
  const callGroq = useCallback(
    async (history: Message[]): Promise<string> => {
      if (!GROQ_API_KEY) {
        console.error('Groq API key is not configured.');
        throw new Error('Groq API key is not configured.');
      }

      const trimmedHistory = history.slice(-12);

      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [getSystemPrompt(), ...trimmedHistory],
          temperature: 0.75,
          max_tokens: 300,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Groq API error ${res.status}: ${err}`);
      }

      const data = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      return data.choices[0]?.message?.content ?? '';
    },
    []
  );

  /* ── Send message ─────────────────────────────────────────── */
  const sendMessage = useCallback(
    async (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed || loading) return;

      playClick(true);
      const userMsg: Message = { role: 'user', content: trimmed };
      const newHistory = [...messages, userMsg];

      setMessages(newHistory);
      setInput('');
      setLoading(true);
      setStatus('ACCESSING MAGNETIC CORES...');

      try {
        const reply = await callGroq(newHistory);
        if (reply) {
          await speakAndReveal(reply, newHistory);
        } else {
          setMessages([...newHistory, { role: 'assistant', content: reply }]);
          setStatus('STANDBY // TAPE READY');
        }
      } catch (err) {
        console.error('ZOLA request failed:', err);
        const honestFallback =
          'Transmission link to the auxiliary data banks experienced a carrier interruption. Repeat your command.';
        setStatus('DATA LINE INTERRUPTION');
        await speakAndReveal(honestFallback, newHistory);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, callGroq, speakAndReveal]
  );

  /* ── Voice input ──────────────────────────────────────────── */
  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    playClick(true);
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setStatus('RECEIVING AUDIO INPUT...');
    };
    recognition.onend = () => {
      setListening(false);
      setStatus('STANDBY // TAPE READY');
    };
    recognition.onerror = () => {
      setListening(false);
      setStatus('AUDIO INPUT ERROR');
    };
    recognition.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript ?? '';
      if (transcript) {
        setInput(transcript);
        sendMessage(transcript);
      }
    };

    recognition.start();
  }, [sendMessage]);

  const stopListening = useCallback(() => {
    playClick(true);
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  /* ── Keyboard ─────────────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  const handlePurge = () => {
    playClick(true);
    if (audioRef.current) audioRef.current.pause();
    clearReveal();
    setMessages([
      {
        role: 'assistant',
        content:
          'Tape registers rewound. Consciousness matrix recalibrated. Ready for operator input.',
      },
    ]);
    setStatus('REGISTERS CLEARED');
    setTimeout(() => setStatus('STANDBY // TAPE READY'), 2000);
  };

  const reelsSpinning = loading || speaking;

  /* ─── Render — conversation-first retro S.H.I.E.L.D. terminal ─── */
  return (
    <div
      className="zola-console"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
        background: '#090b09',
        color: '#d8d3bd',
        fontFamily: "'Share Tech Mono', 'Courier New', monospace",
        userSelect: 'none',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');
        .zola-console * { box-sizing:border-box; }
        .zola-console button, .zola-console input { font:inherit; }

        @keyframes zola-flicker {
          0%,100% { opacity:.96; }
          48% { opacity:.96; }
          49% { opacity:.84; }
          50% { opacity:.98; }
          76% { opacity:.94; }
          77% { opacity:.82; }
          78% { opacity:.97; }
        }
        @keyframes zola-scan {
          from { transform:translateY(-120%); }
          to { transform:translateY(520%); }
        }
        @keyframes zola-led {
          0%,100% { opacity:.35; }
          50% { opacity:1; }
        }
        @keyframes zola-cursor { 50% { opacity:0; } }

        .zola-console .zola-scroll::-webkit-scrollbar { width:6px; }
        .zola-console .zola-scroll::-webkit-scrollbar-track { background:#0c0e0c; }
        .zola-console .zola-scroll::-webkit-scrollbar-thumb { background:#403f35; }
        .zola-console .zola-scroll::-webkit-scrollbar-thumb:hover { background:#655a40; }

        .zola-console .zola-action:hover {
          background:#211c12 !important;
          border-color:#a28751 !important;
          color:#dbc590 !important;
        }
        .zola-console .zola-input:focus {
          border-color:#9b824e !important;
          box-shadow:inset 0 0 0 1px rgba(155,130,78,.18) !important;
        }
        .zola-console .zola-input::placeholder { color:#55584a; opacity:1; }

        .zola-console .zola-message { width:min(920px,100%); margin:0 auto; }
        .zola-console .zola-assistant-row {
          display:grid;
          grid-template-columns:260px minmax(0,1fr);
          gap:14px;
          align-items:start;
        }
        .zola-console .zola-gif-frame {
          width:100%;
          aspect-ratio:2.4 / 1;
          min-height:100px;
          max-height:145px;
        }
        .zola-console .tenor-gif-embed,
        .zola-console .tenor-gif-embed iframe,
        .zola-console .tenor-gif-embed > div {
          width:100% !important;
          max-width:none !important;
        }
        .zola-console .tenor-gif-embed iframe {
          height:100% !important;
          min-height:100px !important;
          border:0 !important;
          display:block !important;
        }
        .zola-console .zola-user-row { max-width:720px; margin-left:auto; }

        @media (max-width:900px) {
          .zola-console .zola-assistant-row { grid-template-columns:210px minmax(0,1fr); gap:12px; }
          .zola-console .zola-gif-frame { min-height:88px; }
        }
        @media (max-width:680px) {
          .zola-console .zola-assistant-row { grid-template-columns:1fr; gap:8px; }
          .zola-console .zola-gif-frame { width:min(380px,72vw); min-height:0; }
          .zola-console .zola-user-row { max-width:92%; }
        }
        @media (max-width:480px) {
          .zola-console .zola-header-sub,
          .zola-console .zola-meta-detail { display:none !important; }
          .zola-console .zola-header { padding:8px 10px !important; }
          .zola-console .zola-chat { padding:14px 10px !important; }
          .zola-console .zola-gif-frame { width:100%; }
        }
      `}</style>

      {/* Quiet CRT treatment. The interface stays dark and readable. */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, opacity: .22, background: 'repeating-linear-gradient(to bottom,rgba(255,255,255,.018) 0,rgba(255,255,255,.018) 1px,transparent 1px,transparent 4px)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 21, boxShadow: 'inset 0 0 85px rgba(0,0,0,.82)' }} />

      {/* ══ HEADER ══ */}
      <header
        className="zola-header"
        style={{
          position: 'relative', zIndex: 3, flexShrink: 0, minHeight: 58,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          padding: '10px 18px', background: '#12140f', borderBottom: '1px solid #46463a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
          <div style={{ width: 36, height: 36, flexShrink: 0, border: '1px solid #6a6048', background: '#0b0d0b', display: 'grid', placeItems: 'center' }}>
            <svg width="27" height="27" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#806e4a" strokeWidth="3" />
              <circle cx="50" cy="50" r="31" fill="none" stroke="#45453a" strokeWidth="1" />
              <path d="M50 18V82M18 50H82" stroke="#625840" strokeWidth="2" />
              <circle cx="50" cy="50" r="6" fill="#a8874e" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'VT323',monospace", fontSize: 20, lineHeight: .9, letterSpacing: 2, color: '#d1c297', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              S.H.I.E.L.D. ARCHIVE TERMINAL
            </div>
            <div className="zola-header-sub" style={{ marginTop: 4, fontSize: 7, letterSpacing: 1.5, color: '#686a59' }}>
              STRATEGIC INTELLIGENCE · CAMP LEHIGH · NODE 07
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <div className="zola-meta-detail" style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 6, letterSpacing: 1.3, color: '#626456' }}>CONSCIOUSNESS</div>
            <div style={{ marginTop: 3, fontSize: 8, color: '#aaa17b' }}>ZOLA / 1972</div>
          </div>
          <div style={{ width: 1, height: 27, background: '#3d3e34' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: listening ? '#a13d36' : loading || speaking ? '#b18b4d' : '#71815d', animation: 'zola-led 1.4s infinite' }} />
            <span style={{ fontSize: 7, letterSpacing: 1, color: '#858674' }}>
              {listening ? 'AUDIO IN' : loading || speaking ? 'PROCESSING' : 'ONLINE'}
            </span>
          </div>
        </div>
      </header>

      {/* ══ CHAT-FIRST BODY ══ */}
      <main style={{ position: 'relative', zIndex: 2, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#0a0c0a' }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '9px 18px', borderBottom: '1px solid #383a31', background: '#10120f' }}>
          <div>
            <div style={{ fontFamily: "'VT323',monospace", fontSize: 16, lineHeight: .9, letterSpacing: 1.4, color: '#c5b98f' }}>ZOLA CONSCIOUSNESS INTERFACE</div>

          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: listening ? '#a13d36' : loading || speaking ? '#b18b4d' : '#71815d', animation: 'zola-led 1s infinite' }} />
            <span style={{ fontSize: 6.5, letterSpacing: 1, color: '#737664', maxWidth: 190, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{status}</span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="zola-scroll zola-chat"
          style={{
            flex: 1, minHeight: 0, overflowY: 'auto', padding: '22px clamp(14px,5vw,70px) 28px',
            display: 'flex', flexDirection: 'column', gap: 22,
            background: 'radial-gradient(ellipse at 50% 0%,rgba(125,120,78,.055),transparent 58%)',
          }}
        >
          {messages.map((msg, i) => {
            const isAssistant = msg.role === 'assistant';
            const isLatest = i === messages.length - 1;

            return (
              <motion.div
                key={i}
                className="zola-message"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .14 }}
              >
                {isAssistant ? (
                  <div className="zola-assistant-row">
                    {/* The GIF now sits beside Zola's actual response, making it read as the speaker. */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                        <span style={{ fontSize: 7, color: '#b49b62', letterSpacing: 1.5 }}>ZOLA</span>
                        <span style={{ height: 1, flex: 1, background: '#292b25' }} />
                        <span style={{ fontSize: 5.5, color: '#4e5147', letterSpacing: 1 }}>{speaking && isLatest ? 'TRANSMITTING' : 'ARCHIVE'}</span>
                      </div>
                      <div className="zola-gif-frame" style={{ position: 'relative', overflow: 'hidden', border: '1px solid #55503d', background: '#050705', boxShadow: 'inset 0 0 22px #000,0 2px 12px rgba(0,0,0,.35)' }}>
                        <ZolaTenorGif />
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(to bottom,transparent 0,transparent 2px,rgba(0,0,0,.22) 3px)' }} />
                        {(speaking && isLatest) && <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 18, pointerEvents: 'none', background: 'linear-gradient(to bottom,transparent,rgba(181,154,88,.12),transparent)', animation: 'zola-scan 2.1s linear infinite' }} />}
                        <div style={{ position: 'absolute', bottom: 5, left: 6, padding: '2px 5px', background: 'rgba(5,7,5,.82)', border: '1px solid #39372d', fontSize: 5, color: '#8e805c', letterSpacing: 1 }}>
                          {speaking && isLatest ? 'LIVE TRANSMISSION' : 'ZOLA VISUAL RECORD'}
                        </div>
                      </div>
                    </div>

                    <div style={{ paddingTop: 23 }}>
                      <div style={{ position: 'relative', padding: '15px 18px 16px', border: '1px solid #35372d', borderLeft: '2px solid #947b49', background: '#10130f', color: '#c5c1aa', fontSize: 13, lineHeight: 1.75, letterSpacing: .12, fontFamily: "'Share Tech Mono',monospace", boxShadow: 'inset 0 0 24px rgba(0,0,0,.3)' }}>
                        <span style={{ position: 'absolute', left: -2, top: -1, width: 28, height: 1, background: '#a68a50' }} />
                        <span style={{ position: 'absolute', left: -2, top: -1, width: 1, height: 16, background: '#a68a50' }} />
                        {msg.content}
                        {speaking && isLatest && <span style={{ display: 'inline-block', width: 6, height: 13, marginLeft: 3, verticalAlign: '-2px', background: '#c5ab6e', animation: 'zola-cursor .65s infinite' }} />}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="zola-user-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <span style={{ fontSize: 7, color: '#9d8c5e', letterSpacing: 1.5 }}>OPERATOR</span>
                      <span style={{ height: 1, flex: 1, background: '#292b25' }} />
                      <span style={{ fontSize: 5.5, color: '#4e5147', letterSpacing: 1 }}>INPUT</span>
                    </div>
                    <div style={{ padding: '11px 15px', border: '1px solid #30332a', borderRight: '2px solid #716445', background: '#111410', color: '#aeb09a', fontSize: 12, lineHeight: 1.65 }}>
                      {msg.content}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {loading && !speaking && (
            <div className="zola-message" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: '1px solid #39392f', borderLeft: '2px solid #947b49', background: '#11130f', color: '#8d7c57', fontSize: 7, letterSpacing: 1.1 }}>
              <span>READING MAGNETIC ARCHIVE</span>
              <span style={{ display: 'inline-flex', gap: 3 }}>
                {[0, 1, 2, 3, 4].map(idx => <motion.i key={idx} style={{ display: 'block', width: 3, height: 10, background: '#9c814d' }} animate={{ scaleY: [.2, 1, .2], opacity: [.3, 1, .3] }} transition={{ duration: .6, delay: idx * .09, repeat: Infinity }} />)}
              </span>
            </div>
          )}
        </div>

        {/* ══ COMMAND CONSOLE ══ */}
        <div style={{ flexShrink: 0, padding: '9px 12px 8px', borderTop: '1px solid #45463b', background: '#12140f', boxShadow: '0 -4px 14px rgba(0,0,0,.3)' }}>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 7, maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ width: 58, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8px', border: '1px solid #393a31', background: '#0e100d' }}>
              <span style={{ fontSize: 5.5, color: '#5f624f', letterSpacing: 1 }}>CHANNEL</span>
              <span style={{ marginTop: 2, fontSize: 8, color: '#9e8d5d' }}>01</span>
            </div>

            <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', border: '1px solid #46473b', background: '#090b09', padding: '0 10px' }}>
              <span style={{ color: '#9b824e', fontSize: 14, marginRight: 8 }}>&gt;</span>
              <input
                ref={inputRef}
                className="zola-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={listening ? 'RECEIVING AUDIO INPUT...' : 'ENTER COMMAND...'}
                disabled={loading || listening}
                style={{ width: '100%', minWidth: 0, height: 36, border: 'none', outline: 'none', background: 'transparent', color: '#d0c9ad', fontSize: 12, letterSpacing: .5 }}
              />
            </div>

            {isSpeechSupported && (
              <button
                onMouseDown={startListening}
                onMouseUp={stopListening}
                onTouchStart={startListening}
                onTouchEnd={stopListening}
                disabled={loading}
                title="Hold to speak"
                style={{ width: 43, flexShrink: 0, border: `1px solid ${listening ? '#7d423e' : '#4b4b3d'}`, background: listening ? '#211514' : '#10120f', color: listening ? '#bd6359' : '#918662', cursor: loading ? 'not-allowed' : 'pointer', display: 'grid', placeItems: 'center' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3M8 22h8" />
                </svg>
              </button>
            )}

            <button
              className="zola-action"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{ minWidth: 78, padding: '0 12px', border: '1px solid #71603f', background: !loading && input.trim() ? '#211b11' : '#11130f', color: !loading && input.trim() ? '#c4a463' : '#55594b', cursor: !loading && input.trim() ? 'pointer' : 'not-allowed', fontSize: 7, letterSpacing: 1.8, fontWeight: 700 }}
            >EXECUTE</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, maxWidth: 1100, margin: '5px auto 0', padding: '0 2px' }}>
            <span style={{ fontSize: 5.5, color: '#4e5147', letterSpacing: 1 }}>VOICE LINK {isSpeechSupported ? 'AVAILABLE' : 'UNAVAILABLE'} · TEXT CHANNEL SECURE</span>
            <button className="zola-action" onClick={handlePurge} style={{ border: 'none', background: 'transparent', color: '#62594a', padding: 0, cursor: 'pointer', fontSize: 5.5, letterSpacing: 1.2 }}>REWIND / CLEAR</button>
          </div>
        </div>


      </main>
    </div>
  );
};

export const ZolaAssistant: React.FC<ZolaProps> = ({ isOpen = true, onOpenApp }) => {
  if (!isOpen) return null;
  return <ZolaApp onOpenApp={onOpenApp} />;
};

export const JarvisAssistant = ZolaApp;
export default ZolaApp;
