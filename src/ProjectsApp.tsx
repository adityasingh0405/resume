import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  IconProjectBiome,
  IconProjectAxiom,
  IconProjectStream,
  IconProjectWeb,
} from './PixelIcons';

export interface ProjectDetail {
  id: string;
  file: string;
  title: string;
  subtitle: string;
  icon: React.ReactElement;
  tech: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: string;
  year: string;
  demoUrl?: string;
  githubUrl?: string;
  color: string;
  imageUrl?: string;
}

export const RESUME_PROJECTS: ProjectDetail[] = [
  {
    id: 'biome-ai',
    file: 'BIOME_AI.PY',
    title: 'BIOME AI — Enterprise Knowledge Intelligence System',
    subtitle: 'Production Hybrid RAG Engine (OpenAI + BM25 + Reciprocal Rank Fusion)',
    icon: <IconProjectBiome size={36} />,
    tech: 'Python, FastAPI, ChromaDB, BM25, LangChain, Docker',
    description: 'Architected an end-to-end production RAG engine featuring hybrid retrieval (OpenAI embeddings + BM25) fused via Reciprocal Rank Fusion.',
    highlights: [
      'Architected end-to-end production RAG engine with dense-sparse hybrid search',
      'Integrated cross-encoder reranking and source citation validation',
      'Automated LLM-as-a-Judge benchmarking across 50+ test suites',
      'Containerized multi-container microservice infrastructure with Docker Compose and sub-second Streamlit query delivery',
    ],
    tags: ['PYTHON', 'FASTAPI', 'CHROMADB', 'BM25', 'LANGCHAIN', 'DOCKER'],
    status: 'DEPLOYED',
    year: '2024',
    githubUrl: 'https://github.com/adityasingh0405',
    color: 'var(--phosphor)',
    imageUrl: 'https://ik.imagekit.io/hzvbqwpg8/image3.png',
  },
  {
    id: 'axiom',
    file: 'AXIOM.PY',
    title: 'Axiom — Local Multimodal Knowledge Engine',
    subtitle: 'Offline-First Vector Engine over Video Frames & Audio Transcripts',
    icon: <IconProjectAxiom size={36} />,
    tech: 'Python, Whisper, ChromaDB, Ollama, PyTorch',
    description: 'Developed an offline-first multimodal RAG system indexing video frames, audio transcripts, and technical papers into vector space.',
    highlights: [
      'Developed offline-first multimodal RAG indexing video, audio & text',
      'Implemented local LLM inference via Ollama, completely eliminating cloud API latency',
      'Guaranteed strict zero-data-leak privacy for sensitive documents',
      'Integrated Whisper speech-to-text and PyTorch visual embedding pipelines',
    ],
    tags: ['PYTHON', 'WHISPER', 'CHROMADB', 'OLLAMA', 'PYTORCH', 'VECTOR DB'],
    status: 'OFFLINE-FIRST',
    year: '2024',
    githubUrl: 'https://github.com/adityasingh0405/axiom_proto1.2',
    color: 'var(--amber)',
    imageUrl: 'https://ik.imagekit.io/hzvbqwpg8/image.png?updatedAt=1775674547852',
  },
  {
    id: 'streampay',
    file: 'STREAMPAY.SOL',
    title: 'StreamPay — Web3 Real-Time Content Monetisation Platform',
    subtitle: 'Continuous Microtransaction Architecture on Monad Testnet',
    icon: <IconProjectStream size={36} />,
    tech: 'React.js, Solidity, Monad Testnet, Web3.js',
    description: 'Deployed a Web3 content streaming architecture on Monad testnet enabling continuous, real-time creator microtransactions.',
    highlights: [
      'Deployed Web3 content streaming architecture on Monad testnet',
      'Enabled continuous, real-time creator microtransactions',
      'Designed a creator investment bonding pool algorithm allowing audience staking',
      'Automated continuous revenue distribution via smart contracts',
    ],
    tags: ['REACT.JS', 'SOLIDITY', 'MONAD TESTNET', 'WEB3', 'SMART CONTRACTS'],
    status: 'LIVE TESTNET',
    year: '2024',
    demoUrl: 'https://streampay-tau.vercel.app/',
    githubUrl: 'https://github.com/adityasingh0405/streampay',
    color: 'var(--phosphor-hot)',
    imageUrl: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202026-03-28%20162606.png?updatedAt=1775674543006',
  },
  {
    id: 'enterprise-ops-panaceatic',
    file: 'ENTERPRISE_OPS.JS',
    title: 'Enterprise Operations & Web Platforms — Panaceatic',
    subtitle: 'Client Solutions for Panaceatic Synergy',
    icon: <IconProjectWeb size={36} />,
    tech: 'MERN Stack, ImageKit CDN, JWT, Tailwind CSS',
    description: 'Architected and launched production web solutions for clients managing DNS, SSL, and authentication pipelines.',
    highlights: [
      'Architected & launched production web solutions for Panaceatic Synergy',
      'Managed DNS, SSL, and role-based authentication pipelines',
      'Engineered automated asset tuning via ImageKit CDN and webp transformation',
      'Cut site payload by 80%+ and boosted client engagement by 30%+',
    ],
    tags: ['MERN STACK', 'IMAGEKIT CDN', 'JWT', 'TAILWIND CSS', 'EXPRESS'],
    status: 'PRODUCTION',
    year: '2024',
    demoUrl: 'https://panaceaticsynergy.com/',
    githubUrl: 'https://github.com/adityasingh0405/RFC',
    color: 'var(--phosphor-mid)',
    imageUrl: 'https://ik.imagekit.io/hzvbqwpg8/image1.png',
  },
  {
    id: 'enterprise-ops-glory',
    file: 'ENTERPRISE_OPS.JS',
    title: 'Enterprise Operations & Web Platforms — Glory Education',
    subtitle: 'Client Solutions for Glory Education',
    icon: <IconProjectWeb size={36} />,
    tech: 'MERN Stack, ImageKit CDN, JWT, Tailwind CSS',
    description: 'Architected and launched production web solutions for clients managing DNS, SSL, and authentication pipelines.',
    highlights: [
      'Architected & launched production web solutions for Glory Education',
      'Managed DNS, SSL, and role-based authentication pipelines',
      'Engineered automated asset tuning via ImageKit CDN and webp transformation',
      'Cut site payload by 80%+ and boosted client engagement by 30%+',
    ],
    tags: ['MERN STACK', 'IMAGEKIT CDN', 'JWT', 'TAILWIND CSS', 'EXPRESS'],
    status: 'PRODUCTION',
    year: '2024',
    demoUrl: 'https://gloryeducationcenter.com/',
    githubUrl: 'https://github.com/adityasingh0405/GEC',
    color: 'var(--phosphor-mid)',
    imageUrl: 'https://ik.imagekit.io/hzvbqwpg8/image2.png',
  },
];

/**
 * ProjectCardImage — used in the grid view.
 * Small tiles read better as uniform, cropped thumbnails, so we use
 * a fixed aspect-ratio box + object-fit: cover. A soft bottom gradient
 * keeps it visually tied to the retro-terminal theme instead of a
 * raw screenshot floating on black.
 */
const ProjectCardImage: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => (
  <div style={{
    width: '100%',
    aspectRatio: '16 / 9',
    border: '1px solid var(--border-dim)',
    overflow: 'hidden',
    position: 'relative',
  }}>
    <img
      src={imageUrl}
      alt={title}
      loading="lazy"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        opacity: 0.92,
      }}
    />
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
      pointerEvents: 'none',
    }} />
  </div>
);

/**
 * ProjectDetailImage — used in the detail/expanded view.
 * Renders a clean cropped hero (object-fit: cover, top-aligned so
 * headers/toolbars in screenshots aren't the part that gets cut)
 * inside a fixed aspect-ratio frame — no letterboxing, no blur hack.
 * Since cropping can hide real content, the whole thing is clickable
 * and opens a fullscreen lightbox showing the entire, uncropped image.
 */
const ProjectDetailImage: React.FC<{ imageUrl: string; title: string; accentColor: string; onExpand: () => void }> = ({
  imageUrl,
  title,
  accentColor,
  onExpand,
}) => (
  <div
    onClick={onExpand}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onExpand(); }}
    aria-label={`Expand image for ${title}`}
    style={{
      width: '100%',
      height: '100%',
      border: `1px solid ${accentColor}`,
      overflow: 'hidden',
      position: 'absolute',
      inset: 0,
      cursor: 'zoom-in',
    }}
  >
    <img
      src={imageUrl}
      alt={title}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top center',
        display: 'block',
      }}
    />
    {/* Bottom gradient to blend into the panel below */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.55) 100%)',
      pointerEvents: 'none',
    }} />
    {/* Expand affordance */}
    <div style={{
      position: 'absolute',
      bottom: '8px',
      right: '10px',
      fontSize: '9px',
      letterSpacing: '1px',
      color: accentColor,
      background: 'rgba(0,0,0,0.65)',
      border: `1px solid ${accentColor}`,
      padding: '3px 7px',
    }}>
      ⤢ VIEW FULL IMAGE
    </div>
  </div>
);

/**
 * ImageLightbox — fullscreen overlay showing the complete, uncropped
 * image (object-fit: contain) so nothing the hero crop hid is lost.
 * Closes on backdrop click, close button, or Escape.
 */
const ImageLightbox: React.FC<{ imageUrl: string; title: string; accentColor: string; onClose: () => void }> = ({
  imageUrl,
  title,
  accentColor,
  onClose,
}) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const overlay = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,4,1,0.92)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        boxSizing: 'border-box',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="retro-btn"
        style={{
          position: 'absolute',
          top: '18px',
          right: '18px',
          fontSize: '11px',
          padding: '4px 10px',
        }}
      >
        [ ✕ CLOSE ]
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          border: `1px solid ${accentColor}`,
          boxShadow: `0 0 24px ${accentColor}`,
          background: '#050a05',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            display: 'block',
            maxWidth: '90vw',
            maxHeight: '85vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );

  // Portal straight to document.body so no ancestor (e.g. a CRT/retro
  // wrapper with its own transform or overflow) can break position:fixed
  // or clip/overlap the overlay.
  return createPortal(overlay, document.body);
};

const ProjectsApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectedProj = RESUME_PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <>
      <style>{`
      @media (max-width: 640px) {
        .project-detail-top {
          flex-direction: column !important;
        }
      }
    `}</style>
      <div className="h-full retro-scroll" style={{ padding: '14px', fontFamily: 'var(--font-mono)' }}>
        {/* Header / Breadcrumb */}
        <div style={{
          borderBottom: '1px solid var(--border-mid)',
          paddingBottom: '10px',
          marginBottom: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div>
            <div className="font-vt323 text-2xl text-p text-glow">PROJECTS/ DIRECTORY</div>
            <div style={{ color: 'var(--phosphor-dim)', fontSize: '11px' }}>
              DIR: C:\PEGASUS\PROJECTS\  │  {RESUME_PROJECTS.length} PROJECT OBJECTS FOUND
            </div>
          </div>
          {selectedProjectId && (
            <button
              className="retro-btn"
              onClick={() => { setSelectedProjectId(null); setLightboxOpen(false); }}
              style={{ fontSize: '10px', padding: '3px 8px' }}
            >
              [ ↵ BACK TO DIRECTORY ]
            </button>
          )}
        </div>

        {!selectedProj ? (
          /* Folder Grid View */
          <div>
            <div style={{
              fontSize: '11px',
              color: 'var(--phosphor-dark)',
              marginBottom: '10px',
              letterSpacing: '1px',
            }}>
              SELECT A PROJECT OBJECT TO INSPECT FULL SPECIFICATIONS & CODE:
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '12px',
            }}>
              {RESUME_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="project-card"
                  onClick={() => setSelectedProjectId(proj.id)}
                  style={{
                    border: `1px solid var(--border-mid)`,
                    background: 'var(--window-bg)',
                    padding: '14px',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {/* Accent top line */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '2px',
                    background: proj.color,
                  }} />

                  {proj.imageUrl && (
                    <ProjectCardImage imageUrl={proj.imageUrl} title={proj.title} />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flexShrink: 0 }}>
                      {proj.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', color: 'var(--phosphor-dark)' }}>{proj.file}</div>
                      <div style={{
                        fontSize: '14px',
                        fontFamily: 'var(--font-vt323)',
                        color: proj.color,
                        textShadow: `0 0 6px ${proj.color}`,
                      }}>
                        {proj.id.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '10px', color: 'var(--phosphor-mid)', lineHeight: '1.4' }}>
                    {proj.subtitle}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '9px',
                    borderTop: '1px dashed var(--border-dim)',
                    paddingTop: '6px',
                    marginTop: 'auto',
                  }}>
                    <span style={{ color: proj.color }}>● {proj.status}</span>
                    <span style={{ color: 'var(--phosphor-dark)' }}>DETAILS ↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Detailed Selected Project View */
          <div style={{
            border: `1px solid ${selectedProj.color}`,
            background: 'var(--window-bg)',
            padding: '16px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '3px',
              background: selectedProj.color,
              boxShadow: `0 0 10px ${selectedProj.color}`,
            }} />

            {/* Top Row: Info (left) + Image (right) */}
            <div
              className="project-detail-top"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '18px',
                alignItems: 'stretch',
                marginBottom: '14px',
              }}
            >
              {/* Left: Title, badge, tech stack */}
              <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', color: 'var(--phosphor-dark)' }}>C:\PEGASUS\PROJECTS\{selectedProj.file}</div>
                <div style={{
                  fontSize: '22px',
                  fontFamily: 'var(--font-vt323)',
                  color: selectedProj.color,
                  textShadow: `0 0 10px ${selectedProj.color}`,
                  lineHeight: '1.15',
                  marginTop: '2px',
                }}>
                  {selectedProj.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--phosphor-dim)', marginTop: '4px' }}>
                  {selectedProj.subtitle}
                </div>

                <span style={{
                  alignSelf: 'flex-start',
                  fontSize: '10px',
                  padding: '2px 8px',
                  border: `1px solid ${selectedProj.color}`,
                  color: selectedProj.color,
                  background: 'rgba(0,0,0,0.6)',
                  letterSpacing: '1px',
                  marginTop: '10px',
                }}>
                  ● {selectedProj.status} ({selectedProj.year})
                </span>

                <div style={{ borderTop: '1px solid var(--border-dim)', margin: '14px 0 10px' }} />

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--phosphor)', marginBottom: '4px', letterSpacing: '1px' }}>
                    TECH STACK:
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--amber)', fontWeight: 'bold', lineHeight: '1.4' }}>
                    {selectedProj.tech}
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              {selectedProj.imageUrl && (
                <div style={{ flex: '1 1 280px', minWidth: 0, height: '260px', position: 'relative', alignSelf: 'flex-start' }}>
                  <ProjectDetailImage
                    imageUrl={selectedProj.imageUrl}
                    title={selectedProj.title}
                    accentColor={selectedProj.color}
                    onExpand={() => setLightboxOpen(true)}
                  />
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border-dim)', margin: '4px 0 14px' }} />

            {/* Key Architectural Highlights */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '10px', color: 'var(--phosphor)', marginBottom: '6px', letterSpacing: '1px' }}>
                KEY ARCHITECTURAL HIGHLIGHTS:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedProj.highlights.map((hl, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--phosphor-mid)', lineHeight: '1.4' }}>
                    <span style={{ color: selectedProj.color, flexShrink: 0 }}>▸</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
              {selectedProj.tags.map(t => (
                <span key={t} style={{
                  fontSize: '9px',
                  padding: '2px 6px',
                  border: '1px solid var(--border-dim)',
                  color: 'var(--phosphor-dim)',
                  background: 'rgba(0,10,2,0.8)',
                }}>
                  [{t}]
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {selectedProj.demoUrl && (
                <a
                  href={selectedProj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px' }}
                >
                  [ LIVE DEMO / SITE ↗ ]
                </a>
              )}
              {selectedProj.githubUrl && (
                <a
                  href={selectedProj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn retro-btn-amber"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px' }}
                >
                  [ GITHUB REPOSITORY ↗ ]
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && selectedProj?.imageUrl && (
        <ImageLightbox
          imageUrl={selectedProj.imageUrl}
          title={selectedProj.title}
          accentColor={selectedProj.color}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectsApp;