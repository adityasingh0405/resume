import React, { useEffect, useState } from 'react';
import {
  GitBranch, Link, Mail, Phone, Globe, Terminal, Radio, Send,
  User,
  Activity,
  MapPin,
  ExternalLink,
  Cpu,
} from 'lucide-react';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const ContactApp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [uptime, setUptime] = useState(0);

  /* -------------------------------------------------------
     Small live uptime counter
  ------------------------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const appendLog = (
    lines: string[],
    delay: number,
    cb?: () => void
  ) => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setLog(prev => [...prev, line]);

        if (i === lines.length - 1 && cb) {
          cb();
        }
      }, delay + i * 220);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) return;

    setFormState('sending');
    setLog([]);

    appendLog(
      [
        '> BOOTING COMMUNICATION SUBSYSTEM...',
        '> LOCATING RECIPIENT NODE...',
        '> RECIPIENT: ADITABHI9@GMAIL.COM',
        `> SENDER: ${name.toUpperCase()} <${email}>`,
        '> ENCODING MESSAGE PAYLOAD...',
        '> ESTABLISHING PHOSPHOR CHANNEL...',
        '> HANDSHAKE: ACCEPTED',
        '> TRANSMITTING PACKET VIA FORMSUBMIT.CO...',
      ],
      0,
      async () => {
        try {
          const res = await fetch('https://formsubmit.co/ajax/aditabhi9@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              message,
              _subject: `New Portfolio Message from ${name}`,
              _template: 'table',
            }),
          });

          if (res.ok) {
            setLog(prev => [
              ...prev,
              '> TRANSMISSION COMPLETE.',
              '> ACK RECEIVED FROM ADITYA NODE.',
              '> STATUS: MESSAGE DELIVERED TO ADITABHI9@GMAIL.COM.',
            ]);
            setFormState('sent');
          } else {
            throw new Error('FormSubmit endpoint returned non-ok status');
          }
        } catch (err) {
          console.error(err);
          setLog(prev => [
            ...prev,
            '> TRANSMISSION FAILURE: COULD NOT CONNECT TO SERVER.',
            '> PLEASE DIRECTLY EMAIL: ADITABHI9@GMAIL.COM',
          ]);
          setFormState('error');
        }
      }
    );
  };

  const handleReset = () => {
    setFormState('idle');
    setLog([]);
    setName('');
    setEmail('');
    setMessage('');
  };

  const formatUptime = () => {
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = uptime % 60;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0'
    )}:${String(s).padStart(2, '0')}`;
  };

  const contactChannels = [
    {
      key: 'EMAIL',
      value: 'aditabhi9@gmail.com',
      href: 'mailto:aditabhi9@gmail.com',
      icon: Mail,
      description: 'Primary communication',
    },
    {
      key: 'PHONE',
      value: '+91 88604 10003',
      href: 'tel:+918860410003',
      icon: Phone,
      description: 'Direct voice channel',
    },
    {
      key: 'GITHUB',
      value: 'github.com/adityasingh0405',
      href: 'https://github.com/adityasingh0405',
      icon: GitBranch,
      description: 'Code & repositories',
    },
    {
      key: 'LINKEDIN',
      value: 'aditya-singh-2b175828a',
      href: 'https://linkedin.com/in/aditya-singh-2b175828a',
      icon: Link,
      description: 'Professional network',
    },
    {
      key: 'RESUME',
      value: 'Aditya_Resume.pdf',
      href: '/Aditya_Resume.pdf',
      icon: ExternalLink,
      description: 'Download Resume (PDF)',
    },
  ];

  return (
    <div
      className="h-full retro-scroll"
      style={{
        padding: '14px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* =====================================================
          SYSTEM HEADER
      ====================================================== */}
      <div
        style={{
          border: '1px solid var(--border-mid)',
          background:
            'linear-gradient(90deg, rgba(0,255,65,.06), transparent)',
          padding: '10px 14px',
          marginBottom: '14px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '45px',
            height: '2px',
            background: 'var(--phosphor)',
            boxShadow: '0 0 10px var(--phosphor)',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              className="font-vt323 text-2xl text-p text-glow"
              style={{
                letterSpacing: '2px',
              }}
            >
              CONTACT.BAT
            </div>

            <div
              style={{
                color: 'var(--phosphor-dim)',
                fontSize: '10px',
                letterSpacing: '1px',
              }}
            >
              SECURE COMMUNICATION TERMINAL // NODE 07
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '10px',
              color: 'var(--phosphor)',
            }}
          >
            <span
              className="blink"
              style={{
                width: '7px',
                height: '7px',
                display: 'inline-block',
                borderRadius: '50%',
                background: 'var(--phosphor)',
                boxShadow: '0 0 8px var(--phosphor)',
              }}
            />

            ADITYA // ONLINE
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN LAYOUT
      ====================================================== */}
      <div
        className="grid grid-cols-1 md:grid-cols-[minmax(220px,0.8fr)_minmax(320px,2fr)] gap-3.5 items-start"
      >
        {/* ===================================================
            LEFT CHARACTER PANEL (Hidden on mobile mode)
        ==================================================== */}
        <div
          className="hidden md:block"
          style={{
            border: '1px solid var(--border-mid)',
            background: 'rgba(0,255,65,0.025)',
            minHeight: '100%',
          }}
        >
          {/* Character header */}
          <div
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid var(--border-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: 'var(--phosphor-dim)',
                letterSpacing: '1px',
              }}
            >
              OPERATOR_PROFILE
            </span>

            <Activity
              size={13}
              color="var(--phosphor)"
              className="blink"
            />
          </div>

          {/* Character / Profile */}
          <div
            style={{
              padding: '14px 10px 12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '145px',
                height: '175px',
                margin: '0 auto 12px',
                border: '1px solid var(--phosphor)',
                padding: '4px',
                background: 'rgba(0,255,65,0.025)',
                boxShadow:
                  '0 0 15px rgba(0,255,65,.12), inset 0 0 20px rgba(0,255,65,.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src="https://ik.imagekit.io/hzvbqwpg8/imague.png"
                alt="Aditya Singh"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',

                }}
              />

              {/* CRT scanline effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
              />
            </div>

            <div
              className="font-vt323 text-2xl text-p text-glow"
              style={{
                letterSpacing: '2px',
              }}
            >
              ADITYA SINGH
            </div>

            <div
              style={{
                fontSize: '9px',
                color: 'var(--phosphor-dim)',
                marginTop: '3px',
              }}
            >
              AI & DATA SCIENCE // DEVELOPER
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              margin: '0 10px 12px',
              borderTop: '1px dashed var(--border-dim)',
              borderBottom: '1px dashed var(--border-dim)',
              padding: '9px 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '9px',
                marginBottom: '5px',
              }}
            >
              <span style={{ color: 'var(--phosphor-dark)' }}>
                STATUS
              </span>
              <span style={{ color: 'var(--phosphor)' }}>
                AVAILABLE
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '9px',
                marginBottom: '5px',
              }}
            >
              <span style={{ color: 'var(--phosphor-dark)' }}>
                CHANNEL
              </span>
              <span style={{ color: 'var(--phosphor)' }}>
                PHOSPHOR
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '9px',
              }}
            >
              <span style={{ color: 'var(--phosphor-dark)' }}>
                SESSION
              </span>
              <span style={{ color: 'var(--phosphor)' }}>
                {formatUptime()}
              </span>
            </div>
          </div>

          {/* Small bio */}
          <div
            style={{
              padding: '0 10px 12px',
              fontSize: '10px',
              lineHeight: '1.6',
              color: 'var(--phosphor-dim)',
            }}
          >
            <span style={{ color: 'var(--phosphor)' }}>
              &gt;
            </span>{' '}
            Building intelligent systems, web experiences and
            data-driven applications.
            <br />
            <br />
            <span style={{ color: 'var(--phosphor)' }}>
              &gt;
            </span>{' '}
            If you've got an interesting idea, opportunity or
            project — transmit it.
          </div>

          {/* Location */}
          <div
            style={{
              margin: '0 10px 10px',
              padding: '7px 8px',
              border: '1px solid var(--border-dim)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '9px',
              color: 'var(--phosphor-dim)',
            }}
          >
            <MapPin size={12} color="var(--phosphor)" />
            NEW DELHI, INDIA
          </div>
        </div>

        {/* ===================================================
            RIGHT COMMUNICATION TERMINAL
        ==================================================== */}
        <div>
          {/* Recipient banner */}
          <div
            style={{
              border: '1px solid var(--border-mid)',
              padding: '8px 10px',
              marginBottom: '12px',
              background: 'rgba(0,255,65,0.025)',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
            }}
          >
            <Radio
              size={15}
              color="var(--phosphor)"
              className="blink"
            />

            <div>
              <div
                style={{
                  fontSize: '9px',
                  color: 'var(--phosphor-dark)',
                  letterSpacing: '1px',
                }}
              >
                OPEN_CHANNEL
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--phosphor-hot)',
                }}
              >
                ADITABHI9@GMAIL.COM
              </div>
            </div>
          </div>

          {/* Form */}
          {formState === 'idle' || formState === 'sending' ? (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '10px',
                  marginBottom: '10px',
                }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '9px',
                      color: 'var(--phosphor)',
                      marginBottom: '4px',
                      letterSpacing: '1px',
                    }}
                  >
                    SENDER_NAME:
                  </label>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <User
                      size={12}
                      color="var(--phosphor-dark)"
                    />

                    <input
                      className="retro-form-input"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name..."
                      disabled={formState === 'sending'}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '9px',
                      color: 'var(--phosphor)',
                      marginBottom: '4px',
                      letterSpacing: '1px',
                    }}
                  >
                    SENDER_EMAIL:
                  </label>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Mail
                      size={12}
                      color="var(--phosphor-dark)"
                    />

                    <input
                      type="email"
                      className="retro-form-input"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={formState === 'sending'}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '10px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '9px',
                    color: 'var(--phosphor)',
                    marginBottom: '4px',
                    letterSpacing: '1px',
                  }}
                >
                  MESSAGE_PAYLOAD:
                </label>

                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                  }}
                >
                  <Terminal
                    size={13}
                    color="var(--phosphor-dark)"
                    style={{ marginTop: '7px', flexShrink: 0 }}
                  />

                  <textarea
                    className="retro-form-input"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={5}
                    disabled={formState === 'sending'}
                    required
                    style={{
                      resize: 'vertical',
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                </div>
              </div>

              {/* Transmission log */}
              {log.length > 0 && (
                <div
                  style={{
                    border: '1px solid var(--border-mid)',
                    background: 'var(--void)',
                    padding: '9px 10px',
                    marginBottom: '10px',
                    minHeight: '70px',
                    maxHeight: '160px',
                    overflowY: 'auto',
                  }}
                >
                  {log.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '9px',
                        color:
                          line.includes('COMPLETE') ||
                            line.includes('ACK')
                            ? 'var(--phosphor)'
                            : 'var(--phosphor-hot)',
                        marginBottom: '3px',
                      }}
                    >
                      {line}
                    </div>
                  ))}

                  {formState === 'sending' && (
                    <span
                      className="blink"
                      style={{
                        color: 'var(--phosphor)',
                        fontSize: '10px',
                      }}
                    >
                      █
                    </span>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="retro-btn"
                disabled={formState === 'sending'}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  opacity:
                    formState === 'sending' ? 0.7 : 1,
                  cursor:
                    formState === 'sending'
                      ? 'not-allowed'
                      : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {formState === 'sending' ? (
                  <>
                    <Cpu size={14} />
                    [ TRANSMITTING... ]
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    [ TRANSMIT_MESSAGE ]
                  </>
                )}
              </button>
            </form>
          ) : (
            /* =================================================
               SUCCESS SCREEN
            ================================================== */
            <div
              style={{
                border: '1px solid var(--border-mid)',
                padding: '25px 18px',
                textAlign: 'center',
                background:
                  'radial-gradient(circle, rgba(0,255,65,.06), transparent 70%)',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '5px',
                }}
              >
                ✓
              </div>

              <div
                className="font-vt323 text-3xl text-p text-glow"
                style={{
                  marginBottom: '7px',
                  letterSpacing: '2px',
                }}
              >
                TRANSMISSION DELIVERED
              </div>

              <div
                style={{
                  fontSize: '9px',
                  color: 'var(--phosphor-dim)',
                  marginBottom: '15px',
                }}
              >
                MESSAGE ACCEPTED BY ADITYA NODE
              </div>

              <div
                style={{
                  border: '1px solid var(--border-dim)',
                  padding: '10px',
                  background: 'var(--void)',
                  marginBottom: '15px',
                  textAlign: 'left',
                }}
              >
                {log.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '9px',
                      color: 'var(--phosphor-hot)',
                      marginBottom: '3px',
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <button
                className="retro-btn"
                onClick={handleReset}
                style={{
                  letterSpacing: '1px',
                  padding: '8px 12px',
                }}
              >
                [ NEW TRANSMISSION ]
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          CONTACT CHANNELS
      ====================================================== */}
      <div
        style={{
          marginTop: '14px',
          border: '1px solid var(--border-mid)',
          background: 'rgba(0,255,65,0.015)',
        }}
      >
        <div
          style={{
            padding: '8px 10px',
            borderBottom: '1px solid var(--border-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
        >
          <Radio size={12} color="var(--phosphor)" />

          <span
            style={{
              fontSize: '9px',
              color: 'var(--phosphor-dark)',
              letterSpacing: '1px',
            }}
          >
            AVAILABLE_COMMUNICATION_CHANNELS
          </span>
        </div>

        <div
          style={{
            padding: '10px',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '7px',
          }}
        >
          {contactChannels.map(channel => {
            const Icon = channel.icon;

            return (
              <a
                key={channel.key}
                href={channel.href}
                target={
                  channel.key === 'EMAIL' ||
                    channel.key === 'PHONE'
                    ? undefined
                    : '_blank'
                }
                rel={
                  channel.key === 'EMAIL' ||
                    channel.key === 'PHONE'
                    ? undefined
                    : 'noopener noreferrer'
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '8px',
                  border: '1px solid var(--border-dim)',
                  background: 'rgba(0,10,2,.8)',
                  textDecoration: 'none',
                  transition:
                    'border-color .15s ease, background .15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor =
                    'var(--phosphor)';
                  e.currentTarget.style.background =
                    'rgba(0,255,65,.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor =
                    'var(--border-dim)';
                  e.currentTarget.style.background =
                    'rgba(0,10,2,.8)';
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    border: '1px solid var(--border-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    size={14}
                    color="var(--phosphor)"
                  />
                </div>

                <div
                  style={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: '8px',
                      color: 'var(--phosphor)',
                      letterSpacing: '1px',
                    }}
                  >
                    {channel.key}
                  </div>

                  <div
                    style={{
                      fontSize: '9px',
                      color: 'var(--phosphor-hot)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {channel.value}
                  </div>

                  <div
                    style={{
                      fontSize: '7px',
                      color: 'var(--phosphor-dark)',
                      marginTop: '2px',
                    }}
                  >
                    {channel.description}
                  </div>
                </div>

                <ExternalLink
                  size={10}
                  color="var(--phosphor-dark)"
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          flexWrap: 'wrap',
          fontSize: '8px',
          color: 'var(--phosphor-dark)',
        }}
      >
        <span>
          COMM_LINK: STABLE // LATENCY: 12ms
        </span>


      </div>
    </div>
  );
};

export default ContactApp;