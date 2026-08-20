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
github.com/adityasingh
listen khushi yap`
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteText(val);
    localStorage.setItem('retro_sticky_note', val);
  };

  return (
    <div
      className="
        w-full
        h-full
        min-h-0
        flex
        items-center
        justify-center
        overflow-hidden
        bg-void
        px-3
        py-4
        sm:px-6
        sm:py-6
        box-border
      "
    >
      {/* ================================
          STICKY NOTE
      ================================= */}
      <div
        className="
          relative

          w-[min(88vw,360px)]
          h-[min(78vh,480px)]
          max-h-full

          px-4
          py-4

          sm:w-full
          sm:max-w-[430px]
          sm:h-[min(82vh,520px)]
          sm:px-7
          sm:py-7

          bg-[#f4e48b]
          text-[#29271d]

          rotate-[-1deg]
          sm:rotate-[-1.5deg]

          shadow-[5px_7px_14px_rgba(0,0,0,0.32)]
          sm:shadow-[8px_12px_24px_rgba(0,0,0,0.38)]

          transition-all
          duration-300

          hover:rotate-0
          hover:-translate-y-0.5

          box-border

          flex
          flex-col

          overflow-hidden
        "
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(255,255,255,0.22) 0%,
              rgba(255,255,255,0.06) 35%,
              rgba(0,0,0,0.04) 100%
            ),

            repeating-linear-gradient(
              0deg,
              rgba(70,60,15,0.025) 0px,
              rgba(70,60,15,0.025) 1px,
              transparent 1px,
              transparent 4px
            ),

            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 0px,
              rgba(255,255,255,0.025) 1px,
              transparent 1px,
              transparent 5px
            )
          `,
          boxShadow: `
            5px 7px 14px rgba(0,0,0,0.32),
            inset 0 0 25px rgba(100,85,25,0.08)
          `,
        }}
      >
        {/* ================================
            TOP EDGE
        ================================= */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[2px]
            bg-[#c9b85b]/30
          "
        />

        {/* ================================
            TAPE
        ================================= */}
        <div
          className="
            absolute

            -top-[3px]

            left-1/2
            -translate-x-1/2

            w-[68px]
            h-[22px]

            sm:w-[92px]
            sm:h-[29px]

            bg-[#d5c36b]/75

            rotate-[1deg]

            shadow-[0_1px_3px_rgba(0,0,0,0.15)]

            border-x
            border-[#ad9e4e]/20
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.08) 0px,
                rgba(255,255,255,0.08) 2px,
                transparent 2px,
                transparent 5px
              )
            `,
          }}
        />

        {/* ================================
            FOLDED CORNER
        ================================= */}
        <div
          className="
            absolute

            bottom-0
            right-0

            w-0
            h-0

            border-t-[28px]
            border-t-[#d2c367]

            border-l-[28px]
            border-l-transparent

            sm:border-t-[42px]
            sm:border-l-[42px]

            drop-shadow-[-2px_-2px_2px_rgba(0,0,0,0.08)]
          "
        />

        {/* ================================
            CONTENT
        ================================= */}
        <div
          className="
            relative
            z-10

            flex
            flex-col

            h-full
            min-h-0
          "
        >
          {/* ================================
              LABEL
          ================================= */}
          <div
            className="
              flex-shrink-0

              mb-2
              sm:mb-4

              text-[8px]
              sm:text-[11px]

              uppercase

              tracking-[0.2em]

              font-bold

              opacity-45

              font-mono
            "
          >
            PERSONAL NOTE
          </div>

          {/* ================================
              EDITABLE NOTE
          ================================= */}
          <textarea
            value={noteText}
            onChange={handleChange}
            spellCheck={false}
            aria-label="Personal sticky note"
            className="
              w-full
              flex-1
              min-h-0

              bg-transparent

              border-none
              outline-none
              resize-none

              overflow-y-auto
              overflow-x-hidden

              text-[13px]
              sm:text-[16px]

              leading-[1.5]
              sm:leading-[1.7]

              font-medium

              placeholder:text-[#4a462f]/40

              selection:bg-[#d8c95f]

              pr-1
              pb-8

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-[#9f9145]/30
            "
            style={{
              fontFamily:
                '"Comic Sans MS", "Segoe Print", "Bradley Hand", cursive',

              scrollbarWidth: 'thin',
            }}
          />

          {/* ================================
              FOOTER
          ================================= */}
          <div
            className="
              absolute

              bottom-0
              left-0
              right-0

              flex
              justify-between
              items-center

              pointer-events-none
            "
          >
            <span
              className="
                text-[7px]
                sm:text-[9px]

                font-mono

                opacity-30

                uppercase

                tracking-wider
              "
            >
              LOCAL • AUTO SAVED
            </span>

            <span
              className="
                text-[10px]
                sm:text-[11px]

                opacity-25

                rotate-[-8deg]
              "
            >
              ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNotesApp;
