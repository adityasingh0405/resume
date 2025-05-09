import React, { useEffect, useState } from "react";
import '../App.css'; 
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import catIdle from '../assets/cat_idle.png';
import catMove from '../assets/cat_move.png';
import catHouse from '../assets/cat_house.png'; 

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const statusText = isOnline ? "ONLINE!/" : "OFFLINE!";
  const statusColor = isOnline ? "#4aff77" : "#ff4444";
  const glowStyle = isOnline
    ? `2px 6px 3px #000000,
       3px 6px 2px #2b5b3c,
       0 0 100px rgb(67, 123, 104),
       0 0 150px rgb(47, 94, 78)`
    : `2px 6px 3px #000000,
       3px 6px 2px #5a1c1c,
       0 0 100px rgb(179, 45, 45),
       0 0 150px rgb(134, 27, 27)`;

  return (
    <div
      className="fixed top-6 right-6 z-50 px-5 animate-bulb-glow-2 py-2 rounded-md bg-[#101010] flex items-center gap-3 border border-[#2a2a2a]"
      style={{ boxShadow: glowStyle }}
    >
      <span className="text-gray-300 text-base pixelify-sans-800 font-mono select-none">I'm</span>
      <span
        className="text-xl pixelify-sans-800 font-bold animate-pulse select-none tracking-wide"
        style={{ color: statusColor }}
      >
        {statusText}
      </span>
    </div>
  );
};

const MovingCat = () => {
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [velocityY, setVelocityY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const CAT_SPEED_PERCENT = 1.5;
  const JUMP_INITIAL_VELOCITY = 20;
  const GRAVITY = 1.1;
  const GROUND_Y = 0;
  const FAST_FALL_ACCELERATION = GRAVITY * 0.75;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        setPressedKeys(prevKeys => new Set(prevKeys).add(event.key));
        if (event.key === 'ArrowUp' && !isJumping) {
          setIsJumping(true);
          setVelocityY(JUMP_INITIAL_VELOCITY);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        setPressedKeys(prevKeys => {
          const nextKeys = new Set(prevKeys);
          nextKeys.delete(event.key);
          return nextKeys;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping]);

  useEffect(() => {
    let animationFrameId;
    const gameLoop = () => {
      setPosition(prevPos => {
        let newX = prevPos.x;
        let newY = prevPos.y;
        let currentVelocityY = velocityY;
        let currentIsJumping = isJumping;

        if (pressedKeys.has('ArrowLeft')) newX = Math.max(0, prevPos.x - CAT_SPEED_PERCENT);
        if (pressedKeys.has('ArrowRight')) newX = Math.min(100, prevPos.x + CAT_SPEED_PERCENT);

        if (currentIsJumping) {
          currentVelocityY -= GRAVITY;
          newY += currentVelocityY;
          if (pressedKeys.has('ArrowDown') && newY > GROUND_Y) {
            currentVelocityY -= FAST_FALL_ACCELERATION;
          }
          if (newY <= GROUND_Y) {
            newY = GROUND_Y;
            currentIsJumping = false;
            currentVelocityY = 0;
          }
        }
        
        if (isJumping !== currentIsJumping) setIsJumping(currentIsJumping);
        setVelocityY(currentVelocityY);
        return { x: newX, y: newY };
      });
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pressedKeys, isJumping, velocityY]);

  const isCatMoving = pressedKeys.has('ArrowLeft') || pressedKeys.has('ArrowRight') || isJumping;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: `${position.y}px`,
        left: `${position.x}%`,
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <div className="group relative flex flex-col items-center">
        {/* Hover Tooltip */}
        <div title="Please Hire Me" className="absolute font-extrabold -top-8 bg-white text-black text- px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          私を雇ってください。
        </div>
        
        {/* Cat Image */}
        <img
          src={isCatMoving ? catMove : catIdle}
          alt={isCatMoving ? "Moving Pixelated Cat" : "Idle Pixelated Cat"}
          width="125"
          height="125"
          className="transform"
          style={{
            transform: `scaleX(${pressedKeys.has("ArrowLeft") ? 1 : -1})`,
          }}
        />
      </div>
    </div>
  );
};

function Hero() {
  const socials = [
    { id: "linkedin", label: "LinkedIn", icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/aditya-singh-2b175828a/" },
    { id: "github", label: "GitHub", icon: <FaGithub size={20} />, href: "https://github.com/adityasingh0405" },
    { id: "mail", label: "Mail", icon: <HiOutlineMail size={20} />, href: "mailto:aditabhi9@gmail.com" },
  ];

  return (
    <div className="bg-black -mt-10 text-white flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      <p className="text-4xl sm:text-5xl md:text-7xl font-montserrat text-center">
        <span className="inline-block opacity-0 animate-slide-in-left">Hi, I’m{" "}</span>
      <span className="text-4xl leading-tight tracking-tight sm:text-5xl md:text-8xl pixelify-sans-800 font-mono animate-bulb-glow neon-text flicker mx-2">
  ADITY
  <span className="inline-block rotate-6">
    <span className="text-4xl sm:text-5xl md:text-8xl pixelify-sans-800 font-mono animate-bulb-glow neon-text flicker-1 mx-1">
      A
    </span>
  </span>
</span>

        <br />
        <span className="inline-block opacity-0 animate-slide-in-right">Full-Stack Developer.</span>
      </p>

      <div className="flex gap-4 mt-10">
        {socials.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="relative pixelify-sans-800 w-40 h-[52px] border border-green-900 rounded-md bg-[#212121] text-green-600 text-xl font-semibold flex items-center justify-center gap-2 shadow-[0_6px_2px_0.5px_#2b5b3c] transition-all duration-200 hover:translate-y-[6px] hover:shadow-none"
            style={{ animation: `fadeIn 0.5s ease ${index * 0.3}s forwards`, opacity: 0 }}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>

      <div className="absolute bottom-3 text-sm text-gray-500 opacity-80 select-none">
        Use arrow keys to move the cat 🐾
      </div>

      
      <img
        src={catHouse}
        alt="Cat House"
        className="fixed bottom-0 -mb-5 -mr-15 right-0 w-[200px] sm:w-[2200px] md:w-[240px] pointer-events-none select-none"
        draggable="false"
      />

      <OnlineStatus />
      <MovingCat />
    </div>
  );
}

export default Hero;
