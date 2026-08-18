import React, { useState } from 'react';

const PAPERS = [
  {
    id: 'p4',
    title: 'Enhancing Public Transit Accessibility: An LLM-Driven Information Assistant with Low-Rank Adaptation',
    authors: 'Aditya Singh',
    venue: 'Research Paper',
    abstract: 'A research paper focused on improving public transit accessibility through the use of an LLM-driven information assistant, utilizing Low-Rank Adaptation (LoRA) for efficient model fine-tuning.',
    tags: ['LLM', 'LoRA', 'PUBLIC TRANSIT', 'ACCESSIBILITY'],
    status: 'PUBLISHED',
    color: 'var(--amber)',
    pdf: '/Enhancing Public Transit Accessibility An LLM-Driven Information Assistant with Low-Rank Adaptation.pdf',
  },
  {
    id: 'p1',
    title: 'Enterprise AI & RAG Architecture Suite',
    authors: 'Aditya Singh',
    venue: 'Applied AI Tech Reports & Benchmarks (2024)',
    abstract: 'A comprehensive suite of research on enterprise AI systems. Includes a hybrid dense-sparse retrieval pipeline with Reciprocal Rank Fusion, "Axiom" (a zero-cloud-dependency multimodal knowledge engine with local Ollama inference), and an automated LLM-as-a-Judge benchmarking harness for evaluating context grounding and citation accuracy.',
    tags: ['RAG', 'LLM-AS-A-JUDGE', 'OLLAMA', 'CROSS-ENCODER', 'HYBRID RETRIEVAL'],
    status: 'RESEARCH & BENCHMARKS',
    color: 'var(--phosphor)',
  }
];

const ResearchApp: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  if (selectedPdf) {
    return (
      <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--window-bg)', fontFamily: 'var(--font-mono)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          borderBottom: '1px solid var(--border-mid)',
          background: 'rgba(0,255,65,0.03)',
        }}>
          <div className="font-vt323 text-xl text-glow" style={{ color: 'var(--phosphor)' }}>
            PDF VIEWER
          </div>
          <button
            onClick={() => setSelectedPdf(null)}
            className="retro-btn"
            style={{ fontSize: '10px', padding: '4px 8px', cursor: 'pointer' }}
          >
            ← BACK
          </button>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <iframe
            src={selectedPdf}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            title="Research PDF Viewer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full retro-scroll" style={{ padding: '14px', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{
        border: '1px solid var(--border-mid)',
        padding: '10px 14px',
        marginBottom: '16px',
        background: 'rgba(0,255,65,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div className="font-vt323 text-2xl text-p text-glow">RESEARCH.PDF — PAPERS & BENCHMARKS</div>
          <div style={{ color: 'var(--phosphor-dim)', fontSize: '11px' }}>
            APPLIED AI · LLM ARCHITECTURES · HYBRID RAG · BENCHMARK REPORTS
          </div>
        </div>

      </div>

      {/* Hackathon Winner Banner */}
      <div style={{
        border: '1px solid var(--amber)',
        background: 'rgba(255,176,0,0.05)',
        padding: '12px',
        marginBottom: '16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}>
        <div className="font-vt323 text-3xl" style={{ color: 'var(--amber)' }}>🏆</div>
        <div>
          <div style={{ fontSize: '14px', color: 'var(--amber)', fontWeight: 'bold' }}>
            WINNER — CLUSTER BUILD-A-THON HACKATHON (1ST PLACE)
          </div>
          <div style={{ fontSize: '12px', color: 'var(--phosphor-mid)', marginTop: '2px' }}>
            Awarded 1st Place for building an autonomous, end-to-end enterprise AI agent architecture featuring multi-step tool execution and grounded reasoning.
          </div>
        </div>
      </div>

      {/* Papers list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {PAPERS.map(paper => (
          <div
            key={paper.id}
            style={{
              border: '1px solid var(--border-mid)',
              background: 'var(--window-bg)',
              padding: '14px',
              position: 'relative',
            }}
          >
            {/* Top accent */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '2px',
              background: paper.color,
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
              <div style={{ fontSize: '12px', color: 'var(--phosphor-dim)' }}>
                {paper.venue}
              </div>
              <span style={{
                fontSize: '11px',
                padding: '1px 6px',
                border: `1px solid ${paper.color}`,
                color: paper.color,
                letterSpacing: '0.5px',
              }}>
                {paper.status}
              </span>
            </div>

            <div style={{
              fontSize: '18px',
              fontFamily: 'var(--font-vt323)',
              color: paper.color,
              textShadow: `0 0 8px ${paper.color}`,
              marginBottom: '6px',
            }}>
              {paper.title}
            </div>

            <div style={{ fontSize: '12px', color: 'var(--phosphor-dark)', marginBottom: '8px' }}>
              AUTHOR: {paper.authors}
            </div>

            <div style={{ borderTop: '1px dashed var(--border-dim)', paddingTop: '8px', marginBottom: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--phosphor)', marginBottom: '4px', letterSpacing: '1px' }}>
                ABSTRACT & METHODOLOGY:
              </div>
              <div style={{ fontSize: '12px', color: 'var(--phosphor-mid)', lineHeight: '1.5' }}>
                {paper.abstract}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {paper.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '10px',
                  padding: '2px 5px',
                  border: '1px solid var(--border-dim)',
                  color: 'var(--phosphor-dim)',
                  background: 'rgba(0,10,2,0.8)',
                }}>
                  [{tag}]
                </span>
              ))}
            </div>

            {paper.pdf && (
              <div style={{ marginTop: '14px' }}>
                <button
                  onClick={() => setSelectedPdf(paper.pdf as string)}
                  className="retro-btn"
                  style={{
                    fontSize: '12px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                  }}
                >
                  VIEW PDF
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchApp;
