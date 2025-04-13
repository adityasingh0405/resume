// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import '../App.css';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

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

function Hero() {
  const socials = [
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      href: "https://www.linkedin.com/in/YOUR_USERNAME",
    },
    {
      id: "github",
      label: "GitHub",
      icon: <FaGithub size={20} />,
      href: "https://github.com/YOUR_USERNAME",
    },
    {
      id: "mail",
      label: "Mail",
      icon: <HiOutlineMail size={20} />,
      href: "mailto:YOUR_EMAIL@example.com",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-40 text-center">
     <p className="text-4xl sm:text-5xl md:text-7xl font-montserrat">
  <span className="inline-block opacity-0 animate-slide-in-left">
    Hi, I’m{" "}
  </span>

  <span className="text-4xl sm:text-5xl md:text-8xl pixelify-sans-800 font-mono animate-bulb-glow neon flicker mx-2">
    ADITY
    <span className="inline-block rotate-6">
      <span className="text-4xl sm:text-5xl md:text-8xl pixelify-sans-800 font-mono animate-bulb-glow neon flicker-1 mx-1">
        A
      </span>
    </span>
    
  </span>

  <br />

  <span className="inline-block opacity-0 animate-slide-in-right">
    Full-Stack Developer.
  </span>
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

      <OnlineStatus />
    </div>
  );
}

export default Hero;
