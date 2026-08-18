import React, { useState, useRef, useEffect } from 'react';

type LineType = 'system' | 'normal' | 'label' | 'key-val' | 'skill' | 'category' | 'cmd' | 'error' | 'input';
interface Line {
  type: LineType;
  text?: string;
  key?: string;
  val?: string;
}

const INITIAL_OUTPUT: Line[] = [
  { type: 'system', text: 'PEGASUS-1001 — Interactive Command Prompt (CMD.EXE / TERMINAL)' },
  { type: 'system', text: 'Type "help" for available commands or "whoami" for profile info.' },
  { type: 'system', text: '────────────────────────────────────────────────────────────' },
  { type: 'normal', text: 'C:\\PEGASUS> System initialized. Ready.' },
  { type: 'normal', text: '' },
];

const WHOAMI_TEXT: Line[] = [
  { type: 'label', text: '╔══════════════════════════════════════════════════════╗' },
  { type: 'label', text: '║           SYSTEM IDENTITY & PROFILE                  ║' },
  { type: 'label', text: '╚══════════════════════════════════════════════════════╝' },
  { type: 'normal', text: '' },
  { type: 'key-val', key: 'NAME', val: 'Aditya Singh' },
  { type: 'key-val', key: 'TITLE', val: 'Applied AI · LLM Engineering · RAG Architectures' },
  { type: 'key-val', key: 'DEGREE', val: 'B.Tech — AI & Data Science (VIPS-TC, GGSIPU)' },
  { type: 'key-val', key: 'CGPA', val: '8.8 / 10.0 (Expected June 2027)' },
  { type: 'key-val', key: 'CURRENT ROLE', val: 'Software Engineering & AI Intern @ Synergy Telecom' },
  { type: 'key-val', key: 'EMAIL', val: 'aditabhi9@gmail.com' },
  { type: 'key-val', key: 'PHONE', val: '+91 88604 10003' },
  { type: 'key-val', key: 'GITHUB', val: 'github.com/adityasingh0405' },
  { type: 'key-val', key: 'LINKEDIN', val: 'linkedin.com/in/aditya-singh-2b175828a' },
  { type: 'key-val', key: 'SITE', val: 'dev-adi.netlify.app' },
  { type: 'normal', text: '' },
  { type: 'normal', text: 'Specializing in production LLM architectures, hybrid dense-sparse' },
  { type: 'normal', text: 'retrieval systems (BM25 + OpenAI + RRF), and multimodal RAG pipelines.' },
];

const SKILLS_TEXT: Line[] = [
  { type: 'label', text: 'CORE TECHNICAL SKILLS MANIFEST' },
  { type: 'normal', text: '' },
  { type: 'category', text: 'CORE AI & LLM ENGINEERING:' },
  { type: 'skill', text: '  RAG Pipelines, Dense + Sparse Search, BM25, Cross-Encoder Reranking' },
  { type: 'skill', text: '  Vector DBs (ChromaDB, FAISS, Qdrant), Fine-Tuning (LoRA), LangChain' },
  { type: 'skill', text: '  LangGraph, LlamaIndex, Transformers, Ollama, OpenAI API' },
  { type: 'normal', text: '' },
  { type: 'category', text: 'LANGUAGES & ML FRAMEWORKS:' },
  { type: 'skill', text: '  C++ (Primary), Python, JavaScript (ES6+), SQL, Java' },
  { type: 'skill', text: '  PyTorch, Scikit-Learn, Pandas, NumPy' },
  { type: 'normal', text: '' },
  { type: 'category', text: 'FULL-STACK & DISTRIBUTED WEB:' },
  { type: 'skill', text: '  React.js, Node.js, Express.js, FastAPI, Redux, Tailwind CSS' },
  { type: 'skill', text: '  REST APIs, WebSockets, Docker, Redis' },
];

const HELP_TEXT: Line[] = [
  { type: 'label', text: 'AVAILABLE COMMANDS:' },
  { type: 'normal', text: '' },
  { type: 'cmd', text: '  whoami    — Display complete identity & profile file' },
  { type: 'cmd', text: '  skills    — List technical skills & frameworks' },
  { type: 'cmd', text: '  projects  — List projects directory summary' },
  { type: 'cmd', text: '  status    — System status & CP achievements report' },
  { type: 'cmd', text: '  clear     — Clear terminal screen' },
  { type: 'cmd', text: '  help      — Show this help menu' },
];

const STATUS_TEXT: Line[] = [
  { type: 'label', text: 'ADITYA SINGH — SYSTEM STATUS & CP ACHIEVEMENTS' },
  { type: 'normal', text: '' },
  { type: 'key-val', key: 'STATUS', val: 'ACTIVE — Software Engineering & AI Intern' },
  { type: 'key-val', key: 'HACKATHON', val: '1ST PLACE WINNER — Cluster Build-a-thon' },
  { type: 'key-val', key: 'LEETCODE', val: '300+ DSA Problems Solved (C++ Primary)' },
  { type: 'key-val', key: 'EDUCATION', val: 'B.Tech AI & DS @ VIPS-TC (CGPA 8.8)' },
  { type: 'key-val', key: 'PORTFOLIO', val: 'dev-adi.netlify.app — DEPLOYED' },
];

const PROJECTS_SUMMARY_TEXT: Line[] = [
  { type: 'label', text: 'C:\\PEGASUS\\PROJECTS\\ DIRECTORY SUMMARY:' },
  { type: 'normal', text: '' },
  { type: 'key-val', key: 'BIOME_AI.PY', val: 'Enterprise RAG Engine (FastAPI, BM25, RRF, ChromaDB)' },
  { type: 'key-val', key: 'AXIOM.PY', val: 'Offline Multimodal Knowledge Engine (Whisper, Ollama)' },
  { type: 'key-val', key: 'STREAMPAY.SOL', val: 'Web3 Monetisation on Monad Testnet (Solidity, React)' },
  { type: 'key-val', key: 'ENTERPRISE_OPS.JS', val: 'Web Solutions (Panaceatic Synergy, Glory Education)' },
];

const LineRenderer: React.FC<{ line: Line }> = ({ line }) => {
  const base = "font-mono text-xs leading-relaxed";
  switch (line.type) {
    case 'system':
      return <div className={`${base}`} style={{ color: 'var(--phosphor-dim)' }}>{line.text}</div>;
    case 'label':
      return <div className={`${base} text-p text-glow`}>{line.text}</div>;
    case 'category':
      return <div className={`${base} text-amber`} style={{ textShadow: '0 0 6px var(--amber)' }}>{line.text}</div>;
    case 'skill':
      return <div className={`${base}`} style={{ color: 'var(--phosphor-hot)' }}>{line.text}</div>;
    case 'cmd':
      return <div className={`${base}`} style={{ color: 'var(--phosphor)' }}>{line.text}</div>;
    case 'key-val':
      return (
        <div className={`${base} flex gap-2`}>
          <span style={{ color: 'var(--phosphor)', minWidth: '130px', textShadow: 'var(--glow-soft)' }}>{line.key}:</span>
          <span style={{ color: 'var(--phosphor-mid)' }}>{line.val}</span>
        </div>
      );
    case 'error':
      return <div className={`${base}`} style={{ color: 'var(--red-alert)', textShadow: '0 0 6px var(--red-alert)' }}>{line.text}</div>;
    case 'input':
      return <div className={`${base}`} style={{ color: 'var(--phosphor-hot)' }}>{line.text}</div>;
    default:
      return <div className={`${base}`} style={{ color: 'var(--phosphor-mid)' }}>{line.text}</div>;
  }
};

const TerminalApp: React.FC = () => {
  const [output, setOutput] = useState<Line[]>(INITIAL_OUTPUT);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const echoLine: Line = { type: 'input', text: `C:\\PEGASUS> ${cmd}` };

    let result: Line[] = [];

    switch (trimmed) {
      case 'whoami':
        result = WHOAMI_TEXT;
        break;
      case 'skills':
        result = SKILLS_TEXT;
        break;
      case 'projects':
        result = PROJECTS_SUMMARY_TEXT;
        break;
      case 'help':
        result = HELP_TEXT;
        break;
      case 'clear':
        setOutput(INITIAL_OUTPUT);
        setInputVal('');
        return;
      case 'status':
        result = STATUS_TEXT;
        break;
      case '':
        setOutput(prev => [...prev, echoLine]);
        setInputVal('');
        return;
      default:
        result = [{ type: 'error', text: `'${cmd}' is not recognized. Type "help" for commands.` }];
    }

    setOutput(prev => [...prev, echoLine, ...result, { type: 'normal', text: '' }]);
    setInputVal('');
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ padding: '12px', fontFamily: "var(--font-mono)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header banner */}
      <div style={{
        border: '1px solid var(--border-mid)',
        padding: '8px 12px',
        marginBottom: '12px',
        background: 'rgba(0,255,65,0.03)',
        flexShrink: 0,
      }}>
        <div className="font-vt323 text-2xl text-p text-glow">TERMINAL.EXE — COMMAND PROMPT v2.1</div>
        <div style={{ color: 'var(--phosphor-dim)', fontSize: '11px' }}>
          Monochrome Phosphor Interactive Shell — Type "help" or "whoami"
        </div>
      </div>

      {/* Output */}
      <div className="retro-scroll flex-1 overflow-y-auto" style={{ marginBottom: '8px' }}>
        {output.map((line, i) => (
          <LineRenderer key={i} line={line} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        borderTop: '1px solid var(--border-dim)',
        paddingTop: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
      }}>
        <span style={{ color: 'var(--phosphor)', fontSize: '12px', flexShrink: 0 }}>C:\PEGASUS&gt;</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') runCommand(inputVal);
          }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command..."
          style={{ fontSize: '13px' }}
        />
        <span className="blink" style={{ color: 'var(--phosphor)', fontSize: '13px' }}>█</span>
      </div>
    </div>
  );
};

export default TerminalApp;
