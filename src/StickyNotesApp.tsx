import React, { useState } from 'react';

const StickyNotesApp: React.FC = () => {
  const [noteText, setNoteText] = useState(() => {
    return (
      localStorage.getItem('retro_sticky_note') ||
      `DON'T FORGET...

• Check ABOUT.EXE
• Update PROJECTS/
• Take a break :)
• Fix DISPLAY.CFG

CONTACT
aditya@example.com
github.com/adityasingh`
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteText(val);
    localStorage.setItem('retro_sticky_note', val);
  };

  return (
    <div className="h-full w-full flex items-center justify-center overflow-y-auto bg-void p-3 sm:p-6">

      {/* Sticky Note */}
      <div
        className="
          relative
          w-full max-w-[430px]
          min-h-[290px] sm:min-h-[430px]
          p-4 sm:p-7
          bg-[#f5e58c]
          text-[#27251b]
          shadow-[8px_12px_25px_rgba(0,0,0,0.45)]
          rotate-[-1.5deg]
          transition-all duration-300
          hover:rotate-[0deg]
          hover:-translate-y-1
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.12),
              rgba(0,0,0,0.04)
            ),
            repeating-linear-gradient(
              0deg,
              rgba(80,70,20,0.025) 0px,
              rgba(80,70,20,0.025) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
        }}
      >

        {/* Tape / Pin */}
        <div
          className="
            absolute
            -top-3 sm:-top-4
            left-1/2
            -translate-x-1/2
            w-20 sm:w-24
            h-6 sm:h-8
            bg-[#d8c873]/80
            rotate-[1deg]
            shadow-sm
            border-x border-[#b8a955]/30
          "
        />

        {/* Folded corner */}
        <div
          className="
            absolute
            bottom-0
            right-0
            w-0
            h-0
            border-t-[32px] sm:border-t-[42px]
            border-t-[#d5c66e]
            border-l-[32px] sm:border-l-[42px]
            border-l-transparent
            drop-shadow-[-2px_-2px_2px_rgba(0,0,0,0.08)]
          "
        />

        {/* Small note label */}
        <div
          className="
            mb-3 sm:mb-5
            text-[10px] sm:text-[11px]
            uppercase
            tracking-[0.22em]
            font-bold
            opacity-50
            font-mono
          "
        >
          PERSONAL NOTE
        </div>

        {/* Actual editable note */}
        <textarea
          value={noteText}
          onChange={handleChange}
          spellCheck={false}
          className="
            w-full
            min-h-[210px] sm:min-h-[330px]
            bg-transparent
            border-none
            outline-none
            resize-none
            text-[13px] sm:text-[17px]
            leading-[1.5] sm:leading-[1.75]
            font-medium
            placeholder:text-[#4a462f]/40
            selection:bg-[#d8c95f]
          "
          style={{
            fontFamily:
              '"Comic Sans MS", "Segoe Print", "Bradley Hand", cursive',
          }}
        />

        {/* Bottom details */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-4 sm:left-7 right-4 sm:right-7 flex justify-between items-center">
          <span className="text-[8px] sm:text-[9px] font-mono opacity-35 uppercase tracking-wider">
            LOCAL • AUTO SAVED
          </span>

          <span className="text-[9px] sm:text-[10px] opacity-30 rotate-[-2deg]">
            ✓
          </span>
        </div>
      </div>
    </div>
  );
};

export default StickyNotesApp;